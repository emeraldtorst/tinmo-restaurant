import { hero, media } from "@/content/media";
import { getText } from "@/content/text";
import type { Locale } from "@/i18n/config";
import type { HeroMedia } from "@/types/content";

/** Image registry with alt text in the requested language (alt text lives in text/en.ts + de.ts). */
export function getMedia(locale: Locale): typeof media {
  const alt = getText(locale).alt;
  const entries = Object.entries(media).map(([key, asset]) => [key, { ...asset, alt: alt[key] ?? asset.alt }]);
  return Object.fromEntries(entries) as typeof media;
}

export function getHero(locale: Locale): HeroMedia {
  const alt = getText(locale).alt;
  return {
    ...hero,
    poster: { ...hero.poster, alt: alt.heroPoster },
    posterPortrait: { ...hero.posterPortrait, alt: alt.heroPoster },
    videoLabel: alt.heroVideo,
  };
}
