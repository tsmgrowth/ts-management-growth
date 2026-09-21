import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/page-shell";
import { DraftBanner } from "@/components/legal";
import { fees, rulesVerified, src, timeline } from "@/lib/rules";

export const metadata: Metadata = {
  title: "Rules and Deadlines, 2021 to 2027",
  description: "A dated, sourced timeline of federal and Florida rules, fees and deadlines that affect starting and keeping a Florida business.",
};

const topicStyle: Record<string, string> = {
  Federal: "bg-brand-600/10 text-brand-700",
  Florida: "bg-sky/10 text-navy-900",
  "Privacy and web": "bg-mist text-muted",
};

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Rules and deadlines" }]}
        title="Rules and deadlines, 2021 to 2027"
        lead="The federal and Florida changes that matter most to starting and keeping a Florida business, each with a date and a source."
      />
      <Section>
        <div className="mx-auto max-w-4xl">
          <DraftBanner />
          <p className="rounded-2xl bg-mist p-4 text-sm leading-relaxed text-muted">
            Last checked against the linked sources: {rulesVerified}. This is general information, not legal or tax advice. Agencies change rules and fees, so always confirm on the agency site or with a licensed professional before you act.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight">Timeline</h2>
          <ol className="mt-6 space-y-4">
            {timeline.map((t) => (
              <li key={t.date + t.title} className="card">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-ink">{t.date}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${topicStyle[t.topic]}`}>{t.topic}</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold">{t.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{t.body}</p>
                <p className="mt-2 text-sm">
                  Source: <a href={t.source.href} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 underline">{t.source.label}<span className="sr-only"> (opens in a new tab)</span></a>
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-muted">We have not listed a 2020 item because the first rule in this area that we track, the Corporate Transparency Act, was enacted January 1, 2021.</p>

          <h2 className="mt-14 text-2xl font-semibold tracking-tight">Florida state fees</h2>
          <p className="mt-2 text-muted">Paid to the State of Florida, separate from our service fees.</p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-left text-[0.98rem]">
              <caption className="sr-only">Florida Division of Corporations LLC fees</caption>
              <thead className="bg-mist text-sm text-ink">
                <tr><th scope="col" className="px-4 py-3 font-semibold">Item</th><th scope="col" className="px-4 py-3 font-semibold">Fee</th><th scope="col" className="px-4 py-3 font-semibold">Note</th></tr>
              </thead>
              <tbody>
                {fees.map((f) => (
                  <tr key={f.item} className="border-t border-line">
                    <th scope="row" className="px-4 py-3 font-medium text-ink">{f.item}</th>
                    <td className="px-4 py-3 text-ink">{f.amount}</td>
                    <td className="px-4 py-3 text-muted">{f.note ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm">
            Sources: <a href={src.fees.href} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 underline">{src.fees.label}<span className="sr-only"> (opens in a new tab)</span></a> and <a href={src.annual.href} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 underline">{src.annual.label}<span className="sr-only"> (opens in a new tab)</span></a>.
          </p>

          <div className="card mt-14">
            <h2 className="text-xl font-semibold">Coming from outside the United States?</h2>
            <p className="mt-2 text-muted">Read our guide for non-U.S. owners and for people partnering with a U.S. citizen.</p>
            <Link href="/international" className="btn btn-primary mt-4">International guide</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
