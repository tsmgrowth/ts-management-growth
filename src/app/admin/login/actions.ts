"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { sendMail } from "@/lib/mail";
import { loginCodeEmail } from "@/lib/invoice-email";
import { adminEmail, hashCode, newCode, sameHash, startSession } from "@/lib/session";

export type LoginState = { step: "email" | "code"; email: string; message: string };

const GENERIC = "If that address is authorized, a sign-in code was sent. It expires in 10 minutes.";

export async function login(_prev: LoginState, fd: FormData): Promise<LoginState> {
  const email = String(fd.get("email") ?? "").trim().toLowerCase().slice(0, 200);
  const step = String(fd.get("step") ?? "email");
  const admin = adminEmail();
  const d = db();

  if (step === "email") {
    if (!email) return { step: "email", email, message: "Enter your email address." };
    if (admin && email === admin) {
      const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
      const { count } = await d.from("admin_codes").select("id", { count: "exact", head: true }).eq("email", email).gte("created_at", since);
      if ((count ?? 0) < 3) {
        const code = newCode();
        await d.from("admin_codes").insert({ email, code_hash: hashCode(email, code), expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString() });
        const r = await sendMail({ to: admin, ...loginCodeEmail(code) });
        if (!r.ok) console.error("admin login email failed:", r.error);
      }
    }
    return { step: "code", email, message: GENERIC };
  }

  // step === "code"
  const code = String(fd.get("code") ?? "").replace(/\D/g, "").slice(0, 6);
  const fail = (m: string): LoginState => ({ step: "code", email, message: m });
  if (code.length !== 6) return fail("Enter the 6-digit code.");
  const { data: row } = await d
    .from("admin_codes")
    .select("*")
    .eq("email", email)
    .eq("used", false)
    .gte("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!row || row.attempts >= 5) return fail("That code is not valid. Request a new one.");
  await d.from("admin_codes").update({ attempts: row.attempts + 1 }).eq("id", row.id);
  if (!admin || email !== admin || !sameHash(row.code_hash, hashCode(email, code))) return fail("That code is not correct.");
  await d.from("admin_codes").update({ used: true }).eq("id", row.id);
  await startSession(email);
  redirect("/admin");
}
