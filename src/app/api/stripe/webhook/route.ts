import type Stripe from "stripe";
import { db } from "@/lib/db";
import { loadById } from "@/lib/invoices";
import { paidOwnerEmail } from "@/lib/invoice-email";
import { sendMail } from "@/lib/mail";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

async function markPaid(session: Stripe.Checkout.Session) {
  const id = session.metadata?.invoice_id;
  if (!id) return;
  const sub = typeof session.subscription === "string" ? session.subscription : session.subscription?.id ?? null;
  const { data } = await db()
    .from("invoices")
    .update({ status: "paid", paid_at: new Date().toISOString(), paid_via: "stripe", stripe_session_id: session.id, stripe_subscription_id: sub })
    .eq("id", id)
    .neq("status", "paid")
    .neq("status", "void")
    .select("id");
  if (data && data.length) {
    const f = await loadById(id);
    if (f && process.env.NOTIFY_EMAIL) await sendMail({ to: process.env.NOTIFY_EMAIL, ...paidOwnerEmail(f, "Stripe (card or online)") });
  }
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers.get("stripe-signature");
  if (!secret || !sig) return new Response("Not configured", { status: 400 });
  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(await req.text(), sig, secret);
  } catch {
    return new Response("Bad signature", { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const s = event.data.object as Stripe.Checkout.Session;
    if (s.payment_status === "paid" || s.payment_status === "no_payment_required") await markPaid(s);
  } else if (event.type === "checkout.session.async_payment_succeeded") {
    await markPaid(event.data.object as Stripe.Checkout.Session);
  }
  return new Response("ok");
}
