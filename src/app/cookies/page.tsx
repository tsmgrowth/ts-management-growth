import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = { title: "Cookie Notice", description: "What cookies and similar technologies this website uses." };

export default function Page() {
  return (
    <LegalPage title="Cookie Notice" lead="What this website stores on your device, and what it does not.">
      <h2>The short version</h2>
      <p>
        This website does not set advertising, analytics, social-media or preference cookies, and it does not use tracking pixels or fingerprinting. Because of that, we do not show a cookie consent banner.
      </p>

      <h2>What are cookies?</h2>
      <p>Cookies are small text files a website can store in your browser. Similar technologies, such as local storage and pixels, work in comparable ways. Some are strictly necessary for a site to function. Others measure use or show advertising.</p>

      <h2>What we use today</h2>
      <ul>
        <li><strong>Strictly necessary:</strong> none are required by the pages you browse. Our hosting provider may process technical data such as your IP address in server logs to deliver the site securely; those logs are not cookies. See the <Link href="/privacy">Privacy Notice</Link>.</li>
        <li><strong>Analytics, advertising and social media:</strong> none.</li>
        <li><strong>Contact form:</strong> uses no cookies. It includes a hidden field that helps block automated spam.</li>
      </ul>

      <h2>If this changes</h2>
      <p>
        If we later add analytics or other non-essential technologies, we will first update this notice and, where the law requires it (for example for visitors in the European Union or United Kingdom, where consent is needed before non-essential cookies are set), ask for your consent before they run and let you change your mind at any time. We will honor Global Privacy Control signals.
      </p>

      <h2>Your browser controls</h2>
      <p>You can block or delete cookies in your browser settings at any time. Doing so will not affect this site as it works today.</p>

      <h2>Questions</h2>
      <p>Send questions through our <Link href="/contact">contact form</Link>.</p>
    </LegalPage>
  );
}
