import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { locales } from "@/i18n/config";

const paths = ["", "/menu", "/impressum", "/datenschutz"];

/** One entry per page and language, with hreflang alternates. Empty until a real domain is configured. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  return locales.flatMap((lang) =>
    paths.map((path) => ({
      url: `${site.url}/${lang}${path}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])),
      },
    })),
  );
}
