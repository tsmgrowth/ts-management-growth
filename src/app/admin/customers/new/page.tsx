import { PageHero, Section } from "@/components/page-shell";
import { AdminNav } from "@/components/admin-nav";
import { CustomerForm } from "@/components/admin-forms";
import { createCustomer } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "New customer" };

export default async function Page() {
  await requireAdmin();
  return (
    <>
      <AdminNav />
      <PageHero crumbs={[{ label: "Admin", href: "/admin" }, { label: "New customer" }]} title="New customer" />
      <Section><div className="mx-auto max-w-3xl"><CustomerForm action={createCustomer} submit="Save customer" /></div></Section>
    </>
  );
}
