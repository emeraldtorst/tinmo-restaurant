import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Crawlers are blocked until a real domain is configured (NEXT_PUBLIC_SITE_URL). Once it is, everything is open,
 * including the crawlers behind Google, Bing, ChatGPT search and Perplexity, which are named so nobody has to guess.
 */
export default function robots(): MetadataRoute.Robots {
  if (!site.url) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      { userAgent: ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot"], allow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
