import { notFound } from "next/navigation";
import { PageHero, Section } from "@/components/page-shell";
import { AdminNav } from "@/components/admin-nav";
import { ActionButton, CopyLink } from "@/components/admin-forms";
import { markPaid, sendInvoice, voidInvoice } from "@/app/admin/actions";
import { loadById, invoiceLabel } from "@/lib/invoices";
import { payUrl } from "@/lib/invoice-email";
import { lineTotal, totals, usd } from "@/lib/money";
import { requireAdmin } from "@/lib/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "Invoice" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const f = await loadById(id);
  if (!f) notFound();
  const { invoice: inv, customer, items } = f;
  const yes = new Set(inv.selections ?? []);
  const chosen = inv.selections !== null;
  const t = totals(items, chosen ? yes : new Set(items.map((i) => i.id)));
  const editable = inv.status === "draft" || inv.status === "sent";

  return (
    <>
      <AdminNav />
      <PageHero crumbs={[{ label: "Admin", href: "/admin" }, { label: customer.name, href: `/admin/customers/${customer.id}` }, { label: invoiceLabel(inv.number) }]} title={`${invoiceLabel(inv.number)} · ${inv.status}`} lead={`${customer.name} · ${customer.email}`} />
      <Section className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="card">
          <h2 className="text-xl font-semibold">Breakdown</h2>
          <table className="mt-4 w-full text-left">
            <caption className="sr-only">Invoice line items</caption>
            <thead className="text-sm text-muted"><tr><th scope="col" className="py-2">Item</th><th scope="col" className="py-2">Customer choice</th><th scope="col" className="py-2 text-right">Amount</th></tr></thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id} className="border-t border-line">
                  <th scope="row" className="py-3 pr-3 font-medium">{i.description}{i.qty > 1 ? ` x ${i.qty}` : ""}{i.recurring ? <span className="ml-2 text-xs font-semibold text-brand-700">MONTHLY</span> : null}</th>
                  <td className="py-3 text-sm text-muted">{!i.optional ? "Required" : !chosen ? "Optional (not answered)" : yes.has(i.id) ? "Yes" : "No"}</td>
                  <td className="py-3 text-right">{usd(lineTotal(i))}{i.recurring ? "/mo" : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <dl className="mt-4 space-y-1 border-t border-line pt-4 text-right">
            <div><dt className="inline text-muted">One-time: </dt><dd className="inline font-semibold">{usd(t.oneTime)}</dd></div>
            <div><dt className="inline text-muted">Monthly: </dt><dd className="inline font-semibold">{usd(t.monthly)}</dd></div>
            <div><dt className="inline text-muted">Due today before tax: </dt><dd className="inline text-xl font-semibold">{usd(t.dueToday)}</dd></div>
          </dl>
          <p className="mt-2 text-sm text-muted">Tax is calculated by Stripe at checkout for card payments.</p>
          {inv.memo && <p className="mt-4 whitespace-pre-wrap rounded-xl bg-mist p-3 text-sm">{inv.memo}</p>}
        </div>

        <div className="space-y-5">
          <div className="card space-y-3">
            <h2 className="text-xl font-semibold">Status</h2>
            <p className="capitalize">{inv.status}{inv.paid_via ? ` via ${inv.paid_via}` : ""}{inv.chosen_method && inv.status !== "paid" ? ` · customer chose ${inv.chosen_method}` : ""}</p>
            {inv.sent_at && <p className="text-sm text-muted">Sent {new Date(inv.sent_at).toLocaleString("en-US", { timeZone: "America/New_York" })} ET</p>}
            {inv.paid_at && <p className="text-sm text-muted">Paid {new Date(inv.paid_at).toLocaleString("en-US", { timeZone: "America/New_York" })} ET</p>}
          </div>

          {editable && (
            <div className="card space-y-4">
              <h2 className="text-xl font-semibold">Send</h2>
              <ActionButton action={sendInvoice.bind(null, id)} label={inv.status === "draft" ? "Email invoice to customer" : "Resend email"} className="btn btn-primary" />
              {inv.status === "sent" && <div><p className="mb-2 text-sm text-muted">Pay link (you can also send it yourself):</p><CopyLink url={payUrl(inv.token)} /></div>}
            </div>
          )}

          {editable && (
            <div className="card space-y-4">
              <h2 className="text-xl font-semibold">Record a payment</h2>
              <ActionButton action={markPaid.bind(null, id)} label="Mark as paid">
                <label htmlFor="how" className="block text-sm font-semibold">How was it paid?</label>
                <select id="how" name="how" className="w-full rounded-xl border border-line bg-white px-4 py-3">
                  <option value="cash">Cash</option><option value="check">Check</option><option value="zelle">Zelle or bank transfer</option><option value="other">Other</option>
                </select>
              </ActionButton>
              <ActionButton action={voidInvoice.bind(null, id)} label="Void invoice" className="text-sm text-red-700 underline" />
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
