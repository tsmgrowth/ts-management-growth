import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, Section } from "@/components/page-shell";
import { AdminNav } from "@/components/admin-nav";
import { CustomerForm } from "@/components/admin-forms";
import { updateCustomer } from "@/app/admin/actions";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { invoiceLabel, type Customer, type Invoice } from "@/lib/invoices";
import { totals, usd, type Item } from "@/lib/money";

export const dynamic = "force-dynamic";
export const metadata = { title: "Customer" };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const d = db();
  const { data: c } = await d.from("customers").select("*").eq("id", id).maybeSingle();
  if (!c) notFound();
  const customer = c as Customer;
  const { data: invs } = await d.from("invoices").select("*").eq("customer_id", id).order("created_at", { ascending: false });
  const invoices = (invs ?? []) as Invoice[];
  const { data: rows } = invoices.length ? await d.from("invoice_items").select("*").in("invoice_id", invoices.map((i) => i.id)) : { data: [] as (Item & { invoice_id: string })[] };
  const items = (rows ?? []) as (Item & { invoice_id: string })[];
  const val = (i: Invoice) => totals(items.filter((x) => x.invoice_id === i.id), new Set(i.selections ?? [])).dueToday;
  const monthlyActive = invoices.filter((i) => i.status === "paid" && i.stripe_subscription_id).length;

  return (
    <>
      <AdminNav />
      <PageHero crumbs={[{ label: "Admin", href: "/admin" }, { label: customer.name }]} title={customer.name} lead={`${customer.email}${customer.country ? ` · ${customer.country}` : ""}`} />
      <Section className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">Profile</h2>
          <CustomerForm action={updateCustomer.bind(null, id)} values={customer} submit="Save changes" />
        </div>
        <div>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tight">Invoices</h2>
            <Link href={`/admin/invoices/new?customer=${id}`} className="btn btn-primary">New invoice</Link>
          </div>
          {monthlyActive > 0 && <p className="mt-3 rounded-xl bg-mist p-3 text-sm text-muted">{monthlyActive} paid invoice(s) include a monthly plan. Manage or cancel monthly billing in your Stripe dashboard.</p>}
          <ul className="mt-4 space-y-3">
            {invoices.map((i) => (
              <li key={i.id} className="card !p-4">
                <Link href={`/admin/invoices/${i.id}`} className="font-semibold text-brand-700 underline">{invoiceLabel(i.number)}</Link>
                <span className="ml-3 text-sm capitalize text-muted">{i.status}</span>
                <p className="mt-1 text-lg font-semibold">{usd(val(i))}</p>
              </li>
            ))}
            {invoices.length === 0 && <li className="text-muted">No invoices yet.</li>}
          </ul>
        </div>
      </Section>
    </>
  );
}
