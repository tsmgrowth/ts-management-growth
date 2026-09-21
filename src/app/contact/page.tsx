import type { Metadata } from "next";
import { PageHero, Section } from "@/components/page-shell";
import { ContactForm } from "@/components/contact-form";
import { getService, requestTypeTitle } from "@/lib/site";

export const metadata: Metadata = { title: "Contact and Consultation" };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const defaultService = service && (getService(service) || requestTypeTitle(service)) ? service : "";

  return (
    <>
      <PageHero crumbs={[{ label: "Contact" }]} title="Request a consultation" lead="Tell us what you need. We will follow up to confirm scope before any work begins." />
      <Section className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <ContactForm defaultService={defaultService} />
        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="card">
            <h2 className="text-lg font-semibold">What happens next</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted">
              <li>We review your request.</li>
              <li>We reply to confirm what we will and will not do.</li>
              <li>Work begins only after you approve.</li>
            </ol>
          </div>
          <p className="rounded-2xl bg-mist p-4 text-sm leading-relaxed text-muted">
            We provide administrative support only, not legal, tax or accounting advice. Please do not send Social Security numbers, taxpayer IDs, passwords, payment-card data or identity documents.
          </p>
        </aside>
      </Section>
    </>
  );
}
