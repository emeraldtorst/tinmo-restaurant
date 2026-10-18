import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Crawlers are blocked until a real domain is configured (NEXT_PUBLIC_SITE_URL). */
export default function robots(): MetadataRoute.Robots {
  if (!site.url) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
