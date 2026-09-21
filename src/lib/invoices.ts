import { db } from "./db";
import type { Item } from "./money";

export type Customer = { id: string; name: string; email: string; phone: string | null; company: string | null; country: string | null; notes: string | null; created_at: string };
export type Invoice = {
  id: string; number: number; customer_id: string; token: string;
  status: "draft" | "sent" | "paid" | "void";
  memo: string | null; due_date: string | null;
  chosen_method: "card" | "cash" | null; selections: string[] | null;
  paid_at: string | null; paid_via: string | null;
  stripe_session_id: string | null; stripe_subscription_id: string | null;
  sent_at: string | null; created_at: string;
};
export type Full = { invoice: Invoice; customer: Customer; items: Item[] };

export const invoiceLabel = (n: number) => `INV-${n}`;

async function hydrate(inv: Invoice | null): Promise<Full | null> {
  if (!inv) return null;
  const d = db();
  const [{ data: customer }, { data: items }] = await Promise.all([
    d.from("customers").select("*").eq("id", inv.customer_id).single(),
    d.from("invoice_items").select("*").eq("invoice_id", inv.id).order("position", { ascending: true }),
  ]);
  if (!customer) return null;
  return { invoice: inv, customer: customer as Customer, items: (items ?? []) as Item[] };
}

export async function loadByToken(token: string) {
  if (!/^[A-Za-z0-9_-]{20,80}$/.test(token)) return null;
  const { data } = await db().from("invoices").select("*").eq("token", token).maybeSingle();
  return hydrate(data as Invoice | null);
}

export async function loadById(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const { data } = await db().from("invoices").select("*").eq("id", id).maybeSingle();
  return hydrate(data as Invoice | null);
}
