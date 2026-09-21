"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { getService } from "@/lib/site";
import { customerEmail, ownerEmail } from "@/lib/email";

export type FormState = {
  status: "idle" | "ok" | "error";
  message: string;
  values: { name: string; email: string; phone: string; service: string; message: string };
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Blocks SSN-like and card-like numbers in free text (we never want these through the site).
const SENSITIVE = /\b\d{3}[- ]?\d{2}[- ]?\d{4}\b|\b\d{2}-\d{7}\b|\b(?:\d[ -]?){13,16}\b/;

const clean = (v: FormDataEntryValue | null, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function submitConsultation(_prev: FormState, fd: FormData): Promise<FormState> {
  const values = {
    name: clean(fd.get("name"), 120),
    email: clean(fd.get("email"), 200).toLowerCase(),
    phone: clean(fd.get("phone"), 40),
    service: clean(fd.get("service"), 80),
    message: clean(fd.get("message"), 2000),
  };
  const fail = (message: string): FormState => ({ status: "error", message, values });

  // Spam trap: real people never see or fill this field. Pretend success so bots move on.
  if (clean(fd.get("company_website"), 200)) return { status: "ok", message: "", values };

  const elapsed = Date.now() - Number(clean(fd.get("t"), 20));
  if (!Number.isFinite(elapsed) || elapsed < 3000) return fail("Please take a moment to review your details and submit again.");

  if (values.name.length < 2) return fail("Please enter your name.");
  if (!EMAIL.test(values.email)) return fail("Please enter a valid email address.");
  if (values.message.length < 10) return fail("Please tell us a little about what you need (at least a sentence).");
  if (fd.get("consent") !== "on") return fail("Please confirm the acknowledgement so we can proceed.");
  if (SENSITIVE.test(values.message)) {
    return fail("Your message looks like it may contain a Social Security, taxpayer ID or card number. Please remove it. We never need those here.");
  }
  if (values.service && values.service !== "not-sure" && !getService(values.service)) values.service = "";

  const { SUPABASE_URL, SUPABASE_SECRET_KEY, RESEND_API_KEY, NOTIFY_EMAIL, FROM_EMAIL } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    console.error("consultation: Supabase env vars missing");
    return fail("We could not send your request right now. Please try again shortly.");
  }

  const db = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, { auth: { persistSession: false } });

  // Simple rate limit: at most 3 requests per email address per 10 minutes.
  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { count } = await db
    .from("consultation_requests")
    .select("id", { count: "exact", head: true })
    .eq("email", values.email)
    .gte("created_at", since);
  if ((count ?? 0) >= 3) return fail("We already received your requests. We will be in touch soon.");

  const { error } = await db.from("consultation_requests").insert({
    name: values.name,
    email: values.email,
    phone: values.phone || null,
    service_slug: values.service || null,
    message: values.message,
    consent: true,
  });
  if (error) {
    console.error("consultation: insert failed", error.message);
    return fail("We could not send your request right now. Please try again shortly.");
  }

  // The request is safely stored. Email is a notification only, so a failure here must not fail the visitor.
  if (RESEND_API_KEY && NOTIFY_EMAIL && FROM_EMAIL) {
    const resend = new Resend(RESEND_API_KEY);
    const lead = {
      name: values.name.replace(/[\r\n]+/g, " "),
      email: values.email,
      phone: values.phone,
      serviceTitle: values.service && values.service !== "not-sure" ? (getService(values.service)?.title ?? "Not specified") : "Not sure yet",
      message: values.message,
      receivedAt: new Date(),
    };
    const from = `TS Management Growth <${FROM_EMAIL}>`;
    try {
      const o = ownerEmail(lead);
      const { error: mailError } = await resend.emails.send({ from, to: [NOTIFY_EMAIL], replyTo: values.email, subject: o.subject, html: o.html, text: o.text });
      if (mailError) console.error("consultation: owner email failed", mailError.message);

      // Customer confirmation: turn on with SEND_CONFIRMATION=true once a domain is verified in Resend.
      if (process.env.SEND_CONFIRMATION === "true") {
        const c = customerEmail(lead);
        const { error: confError } = await resend.emails.send({ from, to: [values.email], subject: c.subject, html: c.html, text: c.text });
        if (confError) console.error("consultation: confirmation email failed", confError.message);
      }
    } catch (e) {
      console.error("consultation: email threw", e);
    }
  }

  return { status: "ok", message: "", values: { name: "", email: "", phone: "", service: "", message: "" } };
}
