import type { ReactNode } from "react";
import { legal } from "@/lib/site";
import { PageHero, Section } from "./page-shell";

export function DraftBanner() {
  if (legal.reviewed) return null;
  return (
    <p role="note" className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
      <strong>Draft pending attorney review.</strong> This page is a working draft prepared for review by a Florida-licensed attorney and may change before launch.
    </p>
  );
}

export function LegalPage({ title, lead, crumb, children }: { title: string; lead: string; crumb?: string; children: ReactNode }) {
  return (
    <>
      <PageHero crumbs={[{ label: crumb ?? title }]} title={title} lead={lead} />
      <Section>
        <article className="mx-auto max-w-3xl">
          <DraftBanner />
          <p className="text-sm text-muted">Last updated: {legal.lastUpdated}</p>
          <div className="mt-6 space-y-5 leading-relaxed text-ink [&_a]:font-medium [&_a]:text-brand-700 [&_a]:underline [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_p]:text-[1.02rem] [&_li]:text-[1.02rem]">
            {children}
          </div>
        </article>
      </Section>
    </>
  );
}
