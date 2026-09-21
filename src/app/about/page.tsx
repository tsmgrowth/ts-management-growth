import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/page-shell";
import { company } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <>
      <PageHero crumbs={[{ label: "About" }]} title="About TS Management Growth" lead={company.tagline} />
      <Section className="max-w-3xl space-y-6 text-lg leading-relaxed text-muted">
        <p>{company.name} provides professional business administration and support services to individuals, entrepreneurs and business owners at every stage.</p>
        <p>Our focus is keeping the administrative side of your business organized, current and moving forward, from formation and filings to documentation and ongoing administration.</p>
        <p>{company.scope}</p>
        <p>{company.serviceArea}</p>
        <Link href="/contact" className="btn btn-primary">Contact the team</Link>
      </Section>
    </>
  );
}
