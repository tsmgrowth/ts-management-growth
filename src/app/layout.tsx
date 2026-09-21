import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileCta } from "@/components/mobile-cta";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: { default: `${company.short} | Business Administration Support`, template: `%s | ${company.short}` },
  description:
    "Administrative support for business formation, filings, EIN assistance, records organization and more. Not legal, tax or accounting advice.",
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
