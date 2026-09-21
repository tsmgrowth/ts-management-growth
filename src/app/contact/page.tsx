import type { Metadata } from "next";
import { PageHero, Section } from "@/components/page-shell";

export const metadata: Metadata = { title: "Contact and Consultation" };

export default function ContactPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Contact" }]} title="Request a consultation" lead="Tell us what you need. We will follow up to confirm scope before any work begins." />
      <Section>
        <div className="card max-w-2xl">
          <p className="text-lg text-ink">The secure consultation form is being connected. It will be live here shortly.</p>
          <p className="mt-4 rounded-2xl bg-mist p-4 text-sm leading-relaxed text-muted">
            Please do not submit Social Security numbers, taxpayer IDs, passwords, payment-card data, identity documents, or confidential legal or tax information.
          </p>
        </div>
      </Section>
    </>
  );
}
