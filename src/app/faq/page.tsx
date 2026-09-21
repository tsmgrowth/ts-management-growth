import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/page-shell";
import { faqs } from "@/lib/site";

export const metadata: Metadata = { title: "FAQ" };

export default function Faq() {
  return (
    <>
      <PageHero crumbs={[{ label: "FAQ" }]} title="Frequently asked questions" />
      <Section className="max-w-3xl">
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="card !p-5">
              <summary className="cursor-pointer list-none text-lg font-semibold marker:hidden">{f.q}</summary>
              <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
        <Link href="/contact" className="btn btn-primary mt-8">Still need help</Link>
      </Section>
    </>
  );
}
