import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileCta } from "@/components/mobile-cta";
import { company } from "@/lib/site";

const title = `${company.short} | Business Administration Support`;
const ogImage = { url: "/og.jpg", width: 1200, height: 630, alt: "TS Management Growth LLC: business administration that moves with your growth" };
const description =
  "Administrative support for business formation, filings, EIN assistance, records organization and more. Not legal, tax or accounting advice.";

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  applicationName: company.name,
  title: { default: title, template: `%s | ${company.short}` },
  description,
  openGraph: { type: "website", siteName: company.name, title, description, locale: "en_US", url: "/", images: [ogImage] },
  twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  // Keep the site out of search results until launch approval. Flip to index: true at launch.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#0a1f4d" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} h-full`}>
      <body className="flex min-h-full flex-col pb-20 sm:pb-0">
        <a href="#main" className="sr-only rounded-full bg-white px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50">
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <MobileCta />
      </body>
    </html>
  );
}
