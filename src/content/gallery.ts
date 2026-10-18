import { getMedia } from "@/content/localized-media";
import { getText } from "@/content/text";
import type { Locale } from "@/i18n/config";
import type { GalleryContent } from "@/types/content";

/**
 * Atmosphere gallery (04). The layout is composed for exactly seven items, in this order. Swap a
 * picture in media.ts; captions are in text/en.ts + de.ts (same order).
 */
const order = ["atmoPour", "atmoTable", "atmoKitchen", "atmoDetail", "atmoBar", "atmoPlating", "atmoSteam"] as const;
const ids = ["pour", "table", "kitchen", "detail", "bar", "plating", "steam"];

export function getGallery(locale: Locale): GalleryContent {
  const t = getText(locale).gallery;
  const m = getMedia(locale);
  return {
    eyebrow: t.eyebrow,
    heading: t.heading,
    intro: t.intro,
    items: order.map((key, i) => ({ id: ids[i], image: m[key], caption: t.captions[i] })),
  };
}
