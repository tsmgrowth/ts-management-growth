import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/page-shell";
import { DraftBanner } from "@/components/legal";
import { rulesVerified, src } from "@/lib/rules";

export const metadata: Metadata = {
  title: "International Clients",
  description: "A plain-language guide for non-U.S. owners forming a Florida LLC, or partnering with a U.S. citizen, and where administrative support ends and professional advice begins.",
};

const ext = "font-medium text-brand-700 underline";
const L = ({ s }: { s: { label: string; href: string } }) => (
  <a href={s.href} target="_blank" rel="noopener noreferrer" className={ext}>{s.label}<span className="sr-only"> (opens in a new tab)</span></a>
);

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "International clients" }]}
        title="Forming a Florida business from outside the U.S."
        lead="What non-U.S. owners, and people partnering with a U.S. citizen, should know, and where we help versus where you need a licensed professional."
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-5 leading-relaxed [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          <DraftBanner />
          <p className="rounded-2xl bg-mist p-4 text-sm text-muted">
            General information checked against the linked sources on {rulesVerified}. It is not legal, tax or immigration advice. {" "}
            Rules change, and your home country&rsquo;s laws also apply to you.
          </p>

          <h2>Owning a Florida LLC as a non-U.S. person</h2>
          <p>
            Florida&rsquo;s LLC filing does not ask for U.S. citizenship or residency, so people living abroad can own an LLC. The company does need a registered agent with a Florida address. The state charges $125 to form an LLC ($100 filing plus a $25 registered agent designation). See the <Link href="/rules" className={ext}>rules and fees page</Link> and the <L s={src.fees} />.
          </p>

          <h2>Getting an EIN without a Social Security number</h2>
          <ul>
            <li>The IRS online EIN application is for entities with a U.S. principal place of business and a responsible party with a Social Security or taxpayer ID number. If you have neither, apply by phone, fax or mail. <L s={src.ein} /></li>
            <li>On Form SS-4, a responsible party who has no SSN or ITIN and is not eligible for one enters &ldquo;foreign&rdquo; (or N/A) on line 7b. International applicants can call the IRS at 267-941-1099 (not toll-free), Monday to Friday, 6 a.m. to 11 p.m. Eastern. Mailing and fax options are described in the instructions. <L s={src.ss4} /></li>
            <li>We can help you organize the information for the form and track the application. The IRS issues the EIN, and you sign and remain responsible for the answers.</li>
          </ul>

          <h2>Federal filings that can apply to foreign-owned LLCs</h2>
          <ul>
            <li><strong>Form 5472.</strong> A U.S. corporation that is 25% or more foreign-owned, including a foreign-owned single-member LLC treated as a disregarded entity, generally must file Form 5472 with a pro forma Form 1120 by the return due date. The IRS lists a $25,000 penalty for failure to file or to keep required records, with additional penalties in some cases. Ask a CPA or tax attorney whether and how this applies. <L s={src.f5472} /></li>
            <li><strong>Beneficial ownership (BOI) reporting.</strong> Under FinCEN&rsquo;s final rule effective August 14, 2026, U.S. companies, including a Florida LLC owned by non-U.S. people, and U.S. persons are exempt. Only foreign reporting companies (entities formed abroad and registered to do business in the U.S.) still report, and only for non-U.S. beneficial owners and company applicants. <L s={src.boi} /></li>
            <li><strong>Income tax and withholding.</strong> How a foreign owner is taxed depends on facts we cannot assess. Please consult a CPA or tax attorney who works with international owners.</li>
          </ul>

          <h2>Partnering with a U.S. citizen</h2>
          <p>
            Two people, one in the U.S. and one abroad, can own a Florida LLC together. How ownership, profits, control and exit are divided belongs in a written operating agreement drafted by an attorney. We do not draft or advise on that agreement, but we can help keep the signed copy, the filings and your records organized, and keep the annual report on time.
          </p>

          <h2>Real estate and other restrictions</h2>
          <ul>
            <li><strong>Florida SB 264</strong> restricts certain land purchases (near military or critical infrastructure, and agricultural land) by people domiciled in designated countries of concern: China, Russia, Iran, North Korea, Cuba, Venezuela&rsquo;s Maduro regime and Syria. On November 4, 2025 the Eleventh Circuit, 2 to 1, declined at the preliminary stage to block it, and the litigation may continue. Talk to a Florida real estate attorney before buying. <L s={src.sb264} /> <L s={src.shen} /></li>
            <li><strong>Sanctions.</strong> U.S. sanctions laws can prohibit dealings with certain people and places. We may decline work where sanctions could apply.</li>
            <li><strong>Banks</strong> set their own identity and documentation rules, which can be stricter for non-residents. A Florida LLC does not guarantee a U.S. bank account.</li>
          </ul>

          <h2>What forming a company does not do</h2>
          <p>
            Owning a Florida business does not by itself give you a visa, residency or work authorization. We do not give immigration advice or prepare immigration forms; please speak with a licensed immigration attorney.
          </p>

          <h2>How we can help</h2>
          <ul>
            <li>Prepare and file the Florida LLC formation from information you provide, and organize the record.</li>
            <li>Help you gather what you need for the EIN application and track it.</li>
            <li>Keep annual reports, registered-agent updates and records on schedule (registered agent service is coming soon).</li>
            <li>Work by email and video, in English, across time zones.</li>
          </ul>
          <p>Ready to talk? <Link href="/contact?service=international" className={ext}>Request an international consultation</Link>.</p>
        </div>
      </Section>
    </>
  );
}
