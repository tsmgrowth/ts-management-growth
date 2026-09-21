import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = { title: "Accessibility Statement", description: "Our commitment to an accessible website and how to report a barrier." };

export default function Page() {
  return (
    <LegalPage title="Accessibility Statement" crumb="Accessibility" lead="We want everyone to be able to use this website.">
      <h2>Our goal</h2>
      <p>
        We aim to make this site usable by people with a wide range of abilities and assistive technologies, working toward the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA as our target. It is a goal we are working toward and testing against, not a claim of certified conformance.
      </p>

      <h2>What we have built in</h2>
      <ul>
        <li>A &ldquo;skip to main content&rdquo; link and consistent page structure with headings and landmarks.</li>
        <li>Keyboard-operable navigation, menus and forms with visible focus.</li>
        <li>Form fields with text labels, and error messages announced to screen readers.</li>
        <li>Text sized in relative units so it scales with your browser settings, and layouts that adapt to small screens.</li>
        <li>Logos and decorative graphics marked so that assistive technology can skip them.</li>
      </ul>

      <h2>Known limitations</h2>
      <p>We test the site with automated tools and manual checks, but automated tools cannot find every barrier. If you find one, please tell us.</p>

      <h2>Tell us about a barrier</h2>
      <p>
        If you have trouble using any part of this site, or need information in another format, use the <Link href="/contact?service=accessibility">contact form</Link> and choose &ldquo;Accessibility help&rdquo;. Describe the page and the problem, and we will work to provide the information or service another way and fix the issue.
      </p>
      <p>You can also request our services by whatever method works best for you; we will accommodate reasonable requests.</p>
    </LegalPage>
  );
}
