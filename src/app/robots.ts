import type { MetadataRoute } from "next";
import { company, launch } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!launch.indexable) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/pay", "/api"] }, sitemap: `${company.siteUrl}/sitemap.xml` };
}
