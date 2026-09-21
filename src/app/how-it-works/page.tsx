import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/page-shell";
import { processSteps } from "@/lib/site";

export const metadata: Metadata = { title: "How It Works" };

export default function HowItWorks() {
  return (
    <>
      <PageHero crumbs={[{ label: "How it works" }]} title="How it works" lead="From first conversation to organized records, here is what to expect." />
      <Section>
        <ol className="max-w-3xl space-y-5">
          {processSteps.map((s, i) => (
            <li key={s.title} className="card flex gap-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy-900 font-semibold text-white">{i + 1}</span>
              <div>
                <h2 className="text-xl font-semibold">{s.title}</h2>
                <p className="mt-1.5 leading-relaxed text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl text-sm text-muted">Government agencies control their own approvals and processing times. We do not guarantee outcomes.</p>
        <Link href="/contact" className="btn btn-primary mt-8">Start a consultation</Link>
      </Section>
    </>
  );
}
