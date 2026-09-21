import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, Section } from "@/components/page-shell";
import { Arrow, Check } from "@/components/icons";
import { getService, groups, priceLabel, services } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  return s ? { title: s.title, description: s.summary } : {};
}

const standardNot = [
  "Legal advice, legal representation, or legal document drafting",
  "Tax or accounting advice",
  "Guarantees of approval, processing time, compliance, or any government outcome",
];

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const group = groups.find((g) => g.id === s.group)!;

  return (
    <>
      <PageHero crumbs={[{ label: "Services", href: "/services" }, { label: s.title }]} title={s.title} lead={s.summary} />
      <Section className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-12">
          {s.comingSoon && (
            <p className="rounded-2xl border border-brand-600/30 bg-mist p-4 text-ink">
              Registered agent services are opening soon. Request a consultation to check availability. Eligibility, terms and pricing are confirmed before any appointment.
            </p>
          )}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Who this is for</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">{s.audience}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">What the assistance may include</h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {s.includes.map((i) => (
                <li key={i} className="flex items-start gap-2.5"><Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />{i}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">What is not included</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
              {[...(s.notIncluded ?? []), ...standardNot].map((i) => <li key={i}>{i}</li>)}
            </ul>
            <p className="mt-3 text-sm text-muted">When you need legal, tax or accounting advice, please consult a qualified professional.</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Your responsibilities</h2>
            <p className="mt-3 leading-relaxed text-muted">You make the business decisions and provide accurate information. We assist with the administrative process and keep you updated as we go.</p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="card">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">{group.title}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{priceLabel(s)}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">Final pricing depends on your scope. {s.govFee ?? "Government and third-party fees, if any, are separate."}</p>
            <p className="mt-2 text-sm text-muted">Availability: Florida.</p>
            <Link href={`/contact?service=${s.slug}`} className="btn btn-primary mt-6 w-full">{s.cta} <Arrow className="h-5 w-5" /></Link>
          </div>
        </aside>
      </Section>
    </>
  );
}
