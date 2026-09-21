"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { loadByToken } from "@/lib/invoices";
import { totals } from "@/lib/money";
import { stripe } from "@/lib/stripe";
import { sendMail } from "@/lib/mail";
import { cashOwnerEmail } from "@/lib/invoice-email";
import { company } from "@/lib/site";

export type PayState = { error: string };

export async function submitPayment(_prev: PayState, fd: FormData): Promise<PayState> {
  const token = String(fd.get("token") ?? "");
  const f = await loadByToken(token);
  if (!f || f.invoice.status !== "sent") return { error: "This invoice is not available for payment." };
  const { invoice, customer, items } = f;

  const method = fd.get("method") === "cash" ? "cash" : "card";
  const valid = new Set(items.filter((i) => i.optional).map((i) => i.id));
  const yes = new Set(fd.getAll("yes").map(String).filter((id) => valid.has(id)));
  const t = totals(items, yes);
  if (t.dueToday <= 0) return { error: "Nothing is selected to pay for." };
  if (t.monthly > 0 && fd.get("ack_monthly") !== "on") return { error: "Please confirm the monthly billing acknowledgement." };
  if (fd.get("ack") !== "on") return { error: "Please confirm that you approve the items above." };

  // Save the customer's choices first. Totals are always recomputed here from the database, never from the browser.
  await db().from("invoices").update({ selections: [...yes], chosen_method: method }).eq("id", invoice.id);

  if (method === "cash") {
    await sendMail({ to: process.env.NOTIFY_EMAIL || "", ...cashOwnerEmail(f) });
    redirect(`/pay/${token}?cash=1`);
  }

  let url: string | null = null;
  try {
    const subscription = t.monthly > 0;
    const session = await stripe().checkout.sessions.create({
      mode: subscription ? "subscription" : "payment",
      line_items: t.on
        .filter((i) => i.unit_cents > 0)
        .map((i) => ({
          quantity: i.qty,
          price_data: {
            currency: "usd",
            unit_amount: i.unit_cents,
            tax_behavior: "exclusive" as const,
            product_data: { name: i.description.slice(0, 250), tax_code: "txcd_20030000" },
            ...(i.recurring ? { recurring: { interval: "month" as const } } : {}),
          },
        })),
      customer_email: customer.email,
      automatic_tax: { enabled: true },
      metadata: { invoice_id: invoice.id },
      ...(subscription
        ? { subscription_data: { metadata: { invoice_id: invoice.id } } }
        : { payment_intent_data: { metadata: { invoice_id: invoice.id }, description: `${company.short} invoice INV-${invoice.number}` } }),
      success_url: `${company.siteUrl}/pay/${token}?paid=1`,
      cancel_url: `${company.siteUrl}/pay/${token}`,
    });
    url = session.url;
    await db().from("invoices").update({ stripe_session_id: session.id }).eq("id", invoice.id);
  } catch (e) {
    console.error("stripe checkout failed:", e instanceof Error ? e.message : e);
    return { error: "We could not start the secure payment page. Please try again, or contact us." };
  }
  if (!url) return { error: "We could not start the secure payment page. Please try again, or contact us." };
  redirect(url);
}
