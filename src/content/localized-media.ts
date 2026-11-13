import { media } from "@/content/media";
import { getText } from "@/content/text";
import type { Locale } from "@/i18n/config";

/** Image registry with alt text in the requested language (alt text lives in text/en.ts + de.ts). */
export function getMedia(locale: Locale): typeof media {
  const alt = getText(locale).alt;
  const entries = Object.entries(media).map(([key, asset]) => [key, { ...asset, alt: alt[key] ?? asset.alt }]);
  return Object.fromEntries(entries) as typeof media;
}
