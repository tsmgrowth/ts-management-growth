import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/page-shell";
import { Arrow } from "@/components/icons";
import { groups, priceLabel, services } from "@/lib/site";

export const metadata: Metadata = { title: "Services", description: "Administrative support services for Florida businesses." };

export default function ServicesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Services" }]} title="Choose a service" lead="Administrative support, grouped so you can find the right fit quickly." />
      <Section className="space-y-14">
        {groups.map((g) => (
          <div key={g.id}>
            <h2 className="text-2xl font-semibold tracking-tight">{g.title}</h2>
            <p className="mt-1 text-muted">{g.blurb}</p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.filter((s) => s.group === g.id).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="card group flex h-full flex-col transition hover:-translate-y-1 hover:border-brand-600">
                    <span className="text-lg font-semibold">{s.title}</span>
                    <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.summary}</span>
                    <span className="mt-4 flex items-center justify-between text-sm font-semibold text-brand-700">
                      {priceLabel(s)} <Arrow className="h-5 w-5 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>
    </>
  );
}
