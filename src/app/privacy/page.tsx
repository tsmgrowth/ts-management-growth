import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal";
import { company } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Notice", description: "How TS Management Growth LLC collects, uses and protects information submitted through this website." };

export default function Page() {
  return (
    <LegalPage title="Privacy Notice" lead={`How ${company.name} handles the information you share with us through this website.`}>
      <p>
        This notice explains what information we collect through this website, why we collect it, who helps us handle it, and the choices you have. {company.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a Florida business that provides administrative support services. We do not provide legal, tax or accounting advice.
      </p>

      <h2>Information we collect</h2>
      <p>We collect only what you choose to send us and a small amount of technical data needed to run the site.</p>
      <ul>
        <li><strong>Consultation request details:</strong> your name, email address, optional phone number, the service you are interested in, the message you write, your acknowledgement checkbox, and the date and time of your request.</li>
        <li><strong>Technical data:</strong> like almost every website, our hosting provider receives your IP address, browser type and the pages requested in routine server logs used for security and reliability.</li>
      </ul>
      <p>
        <strong>Please do not send sensitive data through the site.</strong> This includes Social Security numbers, taxpayer identification numbers, passwords, payment-card numbers and identity documents. The form is designed to reject some of these. If we need documents later, we will explain a secure method before you send anything.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>To respond to your request and confirm the scope of any work before it begins.</li>
        <li>To provide services you approve, and to keep ordinary business records.</li>
        <li>To protect the site against spam, abuse and fraud.</li>
        <li>To meet legal obligations.</li>
      </ul>
      <p>We do not sell your personal information. We do not share it for cross-context behavioral advertising. We do not send marketing text messages without your separate written consent.</p>

      <h2>Who handles information for us</h2>
      <p>We use service providers who process information only to help us run the site and respond to you:</p>
      <ul>
        <li><strong>Vercel</strong> hosts the website.</li>
        <li><strong>Supabase</strong> stores consultation requests in a database with restricted access.</li>
        <li><strong>Resend</strong> delivers the email notifications we send and, once enabled, confirmation emails to you.</li>
      </ul>
      <p>We may also disclose information when required by law, to protect rights and safety, or in connection with a sale or reorganization of the business.</p>

      <h2>Cookies and similar technologies</h2>
      <p>See our <Link href="/cookies">Cookie Notice</Link>. In short, the site currently uses no advertising or analytics cookies.</p>

      <h2>How long we keep information</h2>
      <p>We keep consultation requests only as long as needed to respond, to provide approved services and to keep business records, and then delete or de-identify them. Service agreements may state specific retention terms.</p>

      <h2>Security</h2>
      <p>We use reasonable safeguards, including encrypted connections, restricted database access and spam controls. No method of transmission or storage is perfectly secure. If a breach affecting your information occurs, we will notify you and regulators as Florida law (Fla. Stat. 501.171) and other applicable law require.</p>

      <h2>Your choices and rights</h2>
      <p>
        You may ask us to tell you what personal information we hold about you, to correct it, or to delete it. Depending on where you live, additional rights may apply, such as the right to access, delete, correct or obtain a copy of your data, and to opt out of sale, targeted advertising and profiling. Because we do not sell data or use it for targeted advertising, there is currently nothing to opt out of. We honor browser-based opt-out signals such as Global Privacy Control, and the site does not track visitors across other sites. We will not treat you differently for exercising a privacy right.
      </p>
      <p>
        To make a request, use the <Link href="/contact?service=privacy-request">contact form</Link> and choose &ldquo;Privacy request&rdquo;. We may need to confirm your identity, and we will respond within the time required by applicable law. If we decline a request you may be able to appeal, and you may contact your state attorney general.
      </p>

      <h2>Visitors outside the United States</h2>
      <p>
        We operate from the United States, and information you send us is processed and stored in the United States, where data protection laws may differ from those in your country. By submitting the form you understand your information will be transferred to and handled in the United States. If the EU or UK GDPR applies to you, our legal bases are your consent (which you give when you submit the form) and our legitimate interest in responding to inquiries and running the business; you may withdraw consent at any time, and you may lodge a complaint with your local data protection authority.
      </p>

      <h2>Children</h2>
      <p>This site is intended for adults running or starting a business. We do not knowingly collect information from children under 13. If you believe a child has sent us information, contact us and we will delete it.</p>

      <h2>Changes to this notice</h2>
      <p>We will post updates here and change the &ldquo;Last updated&rdquo; date above.</p>

      <h2>Contact</h2>
      <p>Questions about this notice can be sent through our <Link href="/contact">contact form</Link>.</p>
    </LegalPage>
  );
}
