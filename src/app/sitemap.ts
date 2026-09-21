import type { MetadataRoute } from "next";
import { company, services } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/how-it-works", "/international", "/rules", "/about", "/faq", "/contact", "/privacy", "/terms", "/cookies", "/accessibility"];
  const now = new Date();
  return [
    ...pages.map((p) => ({ url: `${company.siteUrl}${p}`, lastModified: now })),
    ...services.map((s) => ({ url: `${company.siteUrl}/services/${s.slug}`, lastModified: now })),
  ];
}
