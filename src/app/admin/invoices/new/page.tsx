import { notFound } from "next/navigation";
import { PageHero, Section } from "@/components/page-shell";
import { AdminNav } from "@/components/admin-nav";
import { InvoiceBuilder, type CatalogItem } from "@/components/invoice-builder";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { services } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = { title: "New invoice" };

export default async function Page({ searchParams }: { searchParams: Promise<{ customer?: string }> }) {
  await requireAdmin();
  const { customer } = await searchParams;
  if (!customer || !/^[0-9a-f-]{36}$/i.test(customer)) notFound();
  const { data: c } = await db().from("customers").select("id,name").eq("id", customer).maybeSingle();
  if (!c) notFound();
  const catalog: CatalogItem[] = services.filter((s) => s.from !== null).map((s) => ({ slug: s.slug, title: s.title, price: s.from as number, recurring: s.unit === "per month" }));
  return (
    <>
      <AdminNav />
      <PageHero crumbs={[{ label: "Admin", href: "/admin" }, { label: c.name, href: `/admin/customers/${c.id}` }, { label: "New invoice" }]} title={`New invoice for ${c.name}`} lead="Prices come from your service list and you can change any of them. Government fees are not included unless you add them as a line." />
      <Section><div className="mx-auto max-w-3xl"><InvoiceBuilder customerId={c.id} catalog={catalog} /></div></Section>
    </>
  );
}
