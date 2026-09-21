"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { endSession, newToken, requireAdmin } from "@/lib/session";
import { loadById } from "@/lib/invoices";
import { sendMail } from "@/lib/mail";
import { invoiceEmail, paidOwnerEmail } from "@/lib/invoice-email";
import { toCents } from "@/lib/money";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const t = (v: FormDataEntryValue | null, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export type ActionState = { error: string };

export async function signOut() {
  await endSession();
  redirect("/admin/login");
}

function customerFields(fd: FormData) {
  return {
    name: t(fd.get("name"), 120),
    email: t(fd.get("email"), 200).toLowerCase(),
    phone: t(fd.get("phone"), 40) || null,
    company: t(fd.get("company"), 160) || null,
    country: t(fd.get("country"), 80) || null,
    notes: t(fd.get("notes"), 4000) || null,
  };
}

export async function createCustomer(_p: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  const c = customerFields(fd);
  if (c.name.length < 2) return { error: "Enter the customer's name." };
  if (!EMAIL.test(c.email)) return { error: "Enter a valid email address." };
  const { data, error } = await db().from("customers").insert(c).select("id").single();
  if (error || !data) return { error: "Could not save the customer." };
  redirect(`/admin/customers/${data.id}`);
}

export async function updateCustomer(id: string, _p: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  const c = customerFields(fd);
  if (c.name.length < 2) return { error: "Enter the customer's name." };
  if (!EMAIL.test(c.email)) return { error: "Enter a valid email address." };
  const { error } = await db().from("customers").update(c).eq("id", id);
  if (error) return { error: "Could not save changes." };
  revalidatePath(`/admin/customers/${id}`);
  return { error: "" };
}

type Row = { description: string; price: string; qty: number; optional: boolean; recurring: boolean; service_slug?: string };

export async function createInvoice(_p: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  const customerId = t(fd.get("customer_id"), 60);
  const send = fd.get("send") === "1";
  let rows: Row[];
  try {
    rows = JSON.parse(String(fd.get("payload") ?? "[]"));
  } catch {
    return { error: "Could not read the line items." };
  }
  if (!Array.isArray(rows) || rows.length === 0 || rows.length > 40) return { error: "Add at least one line item." };

  const items = [];
  for (const [i, r] of rows.entries()) {
    const cents = toCents(String(r.price ?? ""));
    const qty = Math.floor(Number(r.qty));
    const description = String(r.description ?? "").trim().slice(0, 200);
    if (!description) return { error: `Line ${i + 1}: add a description.` };
    if (cents === null) return { error: `Line ${i + 1}: enter a valid price like 149 or 149.50.` };
    if (!(qty >= 1 && qty <= 999)) return { error: `Line ${i + 1}: quantity must be 1 or more.` };
    items.push({ position: i, description, unit_cents: cents, qty, optional: !!r.optional, recurring: !!r.recurring, service_slug: r.service_slug ? String(r.service_slug).slice(0, 80) : null });
  }
  if (items.every((x) => x.optional)) return { error: "At least one item must be required (not optional)." };
  if (items.every((x) => x.unit_cents * x.qty === 0)) return { error: "The invoice total cannot be zero." };

  const d = db();
  const { data: cust } = await d.from("customers").select("id").eq("id", customerId).maybeSingle();
  if (!cust) return { error: "Customer not found." };

  const due = t(fd.get("due_date"), 10);
  const { data: inv, error } = await d
    .from("invoices")
    .insert({ customer_id: customerId, token: newToken(), memo: t(fd.get("memo"), 2000) || null, due_date: /^\d{4}-\d{2}-\d{2}$/.test(due) ? due : null })
    .select("id")
    .single();
  if (error || !inv) return { error: "Could not create the invoice." };
  const { error: e2 } = await d.from("invoice_items").insert(items.map((x) => ({ ...x, invoice_id: inv.id })));
  if (e2) {
    await d.from("invoices").delete().eq("id", inv.id);
    return { error: "Could not save the line items." };
  }
  const mailMsg = send ? await deliver(inv.id) : "";
  redirect(`/admin/invoices/${inv.id}${mailMsg ? `?mailerr=${encodeURIComponent(mailMsg)}` : ""}`);
}

async function deliver(id: string): Promise<string> {
  const f = await loadById(id);
  if (!f || f.invoice.status === "paid" || f.invoice.status === "void") return "This invoice cannot be sent.";
  const r = await sendMail({ to: f.customer.email, replyTo: undefined, ...invoiceEmail(f) });
  // Mark as sent even if email failed, so the pay link is live and can be copied. Report the failure.
  await db().from("invoices").update({ status: "sent", sent_at: new Date().toISOString() }).eq("id", id);
  return r.ok ? "" : `The pay link is live, but the email did not send (${r.error}). Copy the link and send it yourself.`;
}

export async function sendInvoice(id: string): Promise<ActionState> {
  await requireAdmin();
  const msg = await deliver(id);
  revalidatePath(`/admin/invoices/${id}`);
  return { error: msg };
}

export async function markPaid(id: string, _p: ActionState, fd: FormData): Promise<ActionState> {
  await requireAdmin();
  const how = ["cash", "check", "zelle", "other"].includes(t(fd.get("how"), 20)) ? t(fd.get("how"), 20) : "other";
  const { error } = await db().from("invoices").update({ status: "paid", paid_at: new Date().toISOString(), paid_via: how }).eq("id", id).neq("status", "void");
  if (error) return { error: "Could not update the invoice." };
  const f = await loadById(id);
  let mailIssue = "";
  if (f && process.env.NOTIFY_EMAIL) {
    const r = await sendMail({ to: process.env.NOTIFY_EMAIL, ...paidOwnerEmail(f, how) });
    if (!r.ok) mailIssue = ` (confirmation email did not send: ${r.error})`;
  } else if (!process.env.NOTIFY_EMAIL) {
    mailIssue = " (NOTIFY_EMAIL is not set, so no confirmation email was sent)";
  }
  revalidatePath(`/admin/invoices/${id}`);
  return { error: mailIssue ? `Marked as paid${mailIssue}.` : "" };
}

export async function voidInvoice(id: string): Promise<ActionState> {
  await requireAdmin();
  const { error } = await db().from("invoices").update({ status: "void" }).eq("id", id).neq("status", "paid");
  if (error) return { error: "Could not void the invoice." };
  revalidatePath(`/admin/invoices/${id}`);
  return { error: "" };
}
