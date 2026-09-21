import { notFound } from "next/navigation";
import { PageHero, Section } from "@/components/page-shell";
import { PayForm } from "@/components/pay-form";
import { loadByToken, invoiceLabel } from "@/lib/invoices";
import { lineTotal, totals, usd } from "@/lib/money";

export const dynamic = "force-dynamic";
export const metadata = { title: "Your invoice", robots: { index: false, follow: false } };

export default async function Page({ params, searchParams }: { params: Promise<{ token: string }>; searchParams: Promise<{ paid?: string; cash?: string }> }) {
  const { token } = await params;
  const sp = await searchParams;
  const f = await loadByToken(token);
  if (!f || f.invoice.status === "draft") notFound();
  const { invoice, customer, items } = f;
  const label = invoiceLabel(invoice.number);
  const hi = customer.name.trim().split(/\s+/)[0] || "there";

  if (invoice.status === "void") {
    return (<><PageHero crumbs={[{ label }]} title={`${label} is no longer active`} lead="Please contact us if you have questions." /></>);
  }

  if (invoice.status === "paid") {
    const t = totals(items, new Set(invoice.selections ?? []));
    return (
      <>
        <PageHero crumbs={[{ label }]} title="Paid. Thank you." lead={`${label} for ${customer.name} has been paid.`} />
        <Section>
          <div className="card mx-auto max-w-2xl">
            <ul className="space-y-2">{t.on.map((i) => <li key={i.id} className="flex justify-between"><span>{i.description}{i.recurring ? " (monthly)" : ""}</span><span>{usd(lineTotal(i))}</span></li>)}</ul>
            <p className="mt-4 border-t border-line pt-3 text-sm text-muted">A receipt is sent by our payment provider for card payments. Questions? Contact us any time.</p>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHero crumbs={[{ label: label }]} title={`Hi ${hi}, here is your breakdown`} lead={`Invoice ${label}. Choose yes or no on optional items and your total updates instantly.`} />
      <Section>
        <div className="mx-auto max-w-2xl">
          {sp.paid && <p role="status" className="mb-6 rounded-2xl border border-line bg-mist p-4 font-medium">Thank you. We are confirming your payment. This page will show Paid within a minute or two.</p>}
          {sp.cash && <p role="status" className="mb-6 rounded-2xl border border-line bg-mist p-4 font-medium">Thank you. You chose cash. We will contact you to arrange it.</p>}
          {invoice.memo && <p className="mb-6 whitespace-pre-wrap rounded-2xl bg-mist p-4 text-sm">{invoice.memo}</p>}
          <PayForm token={token} items={items} />
        </div>
      </Section>
    </>
  );
}
