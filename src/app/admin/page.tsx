import Link from "next/link";
import { PageHero, Section } from "@/components/page-shell";
import { AdminNav } from "@/components/admin-nav";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { invoiceLabel, type Customer, type Invoice } from "@/lib/invoices";
import { totals, usd, type Item } from "@/lib/money";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard" };

export default async function Page() {
  await requireAdmin();
  const d = db();
  const [{ data: customers }, { data: invoices }] = await Promise.all([
    d.from("customers").select("*").order("created_at", { ascending: false }).limit(200),
    d.from("invoices").select("*").order("created_at", { ascending: false }).limit(100),
  ]);
  const inv = (invoices ?? []) as Invoice[];
  const { data: itemRows } = inv.length ? await d.from("invoice_items").select("*").in("invoice_id", inv.map((i) => i.id)) : { data: [] as (Item & { invoice_id: string })[] };
  const byInv = new Map<string, Item[]>();
  for (const it of (itemRows ?? []) as (Item & { invoice_id: string })[]) byInv.set(it.invoice_id, [...(byInv.get(it.invoice_id) ?? []), it]);
  const cust = new Map(((customers ?? []) as Customer[]).map((c) => [c.id, c]));
  // Value of an invoice: required items, plus optional items the customer said yes to (if they chose).
  const value = (i: Invoice) => {
    const items = byInv.get(i.id) ?? [];
    return totals(items, new Set(i.selections ?? [])).dueToday;
  };
  const open = inv.filter((i) => i.status === "sent");
  const paid = inv.filter((i) => i.status === "paid");

  return (
    <>
      <AdminNav />
      <PageHero crumbs={[{ label: "Admin" }]} title="Customers and invoices" />
      <Section>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["Customers", String((customers ?? []).length)],
            ["Awaiting payment", `${open.length} (${usd(open.reduce((n, i) => n + value(i), 0))})`],
            ["Paid", `${paid.length} (${usd(paid.reduce((n, i) => n + value(i), 0))})`],
          ].map(([k, v]) => (
            <div key={k} className="card"><p className="text-sm text-muted">{k}</p><p className="mt-1 text-2xl font-semibold">{v}</p></div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Customers</h2>
          <Link href="/admin/customers/new" className="btn btn-primary">New customer</Link>
        </div>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-[0.98rem]">
            <caption className="sr-only">Customers</caption>
            <thead className="bg-mist text-sm"><tr><th scope="col" className="px-4 py-3">Name</th><th scope="col" className="px-4 py-3">Email</th><th scope="col" className="px-4 py-3">Country</th></tr></thead>
            <tbody>
              {((customers ?? []) as Customer[]).map((c) => (
                <tr key={c.id} className="border-t border-line"><th scope="row" className="px-4 py-3 font-medium"><Link className="text-brand-700 underline" href={`/admin/customers/${c.id}`}>{c.name}</Link>{c.company ? <span className="font-normal text-muted"> ({c.company})</span> : null}</th><td className="px-4 py-3">{c.email}</td><td className="px-4 py-3 text-muted">{c.country ?? ""}</td></tr>
              ))}
              {(customers ?? []).length === 0 && <tr><td colSpan={3} className="px-4 py-6 text-muted">No customers yet.</td></tr>}
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 text-2xl font-semibold tracking-tight">Recent invoices</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-[0.98rem]">
            <caption className="sr-only">Recent invoices</caption>
            <thead className="bg-mist text-sm"><tr><th scope="col" className="px-4 py-3">Invoice</th><th scope="col" className="px-4 py-3">Customer</th><th scope="col" className="px-4 py-3">Status</th><th scope="col" className="px-4 py-3">Amount</th></tr></thead>
            <tbody>
              {inv.map((i) => (
                <tr key={i.id} className="border-t border-line"><th scope="row" className="px-4 py-3 font-medium"><Link className="text-brand-700 underline" href={`/admin/invoices/${i.id}`}>{invoiceLabel(i.number)}</Link></th><td className="px-4 py-3">{cust.get(i.customer_id)?.name ?? ""}</td><td className="px-4 py-3 capitalize">{i.status}</td><td className="px-4 py-3">{usd(value(i))}</td></tr>
              ))}
              {inv.length === 0 && <tr><td colSpan={4} className="px-4 py-6 text-muted">No invoices yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
