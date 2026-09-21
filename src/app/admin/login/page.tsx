import { redirect } from "next/navigation";
import { PageHero, Section } from "@/components/page-shell";
import { getAdmin } from "@/lib/session";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  if (await getAdmin()) redirect("/admin");
  return (
    <>
      <PageHero crumbs={[{ label: "Admin sign-in" }]} title="Admin sign-in" lead="Authorized staff only. We email a one-time code." />
      <Section><div className="mx-auto max-w-md"><LoginForm /></div></Section>
    </>
  );
}
