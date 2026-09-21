import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal";
import { business, company } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Use", description: "Terms for using the TS Management Growth LLC website." };

export default function Page() {
  return (
    <LegalPage title="Terms of Use" lead="The ground rules for using this website and requesting our services.">
      <p>By using this website you agree to these terms. If you do not agree, please do not use the site.</p>

      <h2>Who we are and what we do</h2>
      <p>{company.scope} We are not a law firm, a CPA firm or a tax preparer, and no attorney-client, accountant-client or similar professional relationship is created by using this site, submitting a request, or communicating with us.</p>

      <h2>Not legal, tax or immigration advice</h2>
      <p>
        Information on this site is general and educational. It is not advice for your situation, and laws, fees and deadlines change. For questions about legal rights, tax treatment, entity choice, immigration or visas, real estate restrictions, sanctions, or ownership structures, consult a licensed attorney, CPA or other qualified professional. We do not select forms or entity types for you, interpret laws for you, or represent you before any court or agency.
      </p>

      <h2>Consultation requests and services</h2>
      <p>
        Submitting the contact form is a request for a conversation, not a contract. Work begins only after we confirm the scope and price with you in writing and you approve it. Prices shown on the site are our service fees. Government, state and third-party fees are separate, are set by those agencies, and can change. Any refund, cancellation or payment terms will be stated in the written scope you approve.{business.refundTerms ? ` ${business.refundTerms}` : ""}
      </p>

      <h2>Your responsibilities</h2>
      <ul>
        <li>Give us accurate, complete and lawful information. You remain responsible for your business decisions and for the accuracy of anything filed in your name.</li>
        <li>Do not send Social Security numbers, taxpayer IDs, passwords, payment-card numbers or identity documents through the website form.</li>
        <li>Do not use the site to send unlawful, misleading or harmful content, to attempt to disrupt or gain unauthorized access to it, or to submit automated or spam requests.</li>
        <li>You are responsible for complying with the laws that apply to you, including those of your home country if you are outside the United States.</li>
      </ul>

      <h2>Third-party services and links</h2>
      <p>Filings are made with government agencies such as the Florida Division of Corporations and the IRS, which we do not control. We are not responsible for agency processing times, decisions or fee changes. Links to other sites are provided for convenience and we are not responsible for their content.</p>

      <h2>Intellectual property</h2>
      <p>The site, its text, design and logo belong to {company.name} or its licensors. You may view and share links to the site for personal or internal business purposes, but may not copy or reuse our content or branding without permission.</p>

      <h2>Disclaimers</h2>
      <p>The site and its content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, to the fullest extent the law allows. We do not guarantee that information is complete or current, or that the site will be uninterrupted or error-free.</p>

      <h2>Limitation of liability</h2>
      <p>To the fullest extent permitted by law, {company.name} is not liable for indirect, incidental, special or consequential damages arising from your use of the site or reliance on its content. Nothing in these terms limits liability that cannot be limited by law. Liability for paid services will be governed by the written scope you approve.</p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of Florida, without regard to conflict-of-law rules. This does not affect any mandatory consumer rights you have under the law of the place where you live.{business.venue ? ` Disputes will be brought in ${business.venue}.` : ""}</p>

      <h2>Changes</h2>
      <p>We may update these terms by posting a new version here with a new &ldquo;Last updated&rdquo; date. Continued use of the site means you accept the updated terms.</p>

      <h2>Related notices and contact</h2>
      <p>See our <Link href="/privacy">Privacy Notice</Link> and <Link href="/cookies">Cookie Notice</Link>. Questions can be sent through the <Link href="/contact">contact form</Link>.</p>
    </LegalPage>
  );
}
