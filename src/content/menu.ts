import { getText } from "@/content/text";
import type { Locale } from "@/i18n/config";
import type { MenuContent } from "@/types/content";

/**
 * Full menu (rendered at /menu). PLACEHOLDER: every dish, description and price is illustrative and is
 * labelled as such. Replace the categories in text/en.ts + de.ts with the real menu — or set
 * `site.menu.fullMenuUrl` to link a PDF instead and this page is bypassed. Prices are shown exactly as
 * written ("00" is a placeholder; write "€ 14", …).
 */
export function getMenu(locale: Locale): MenuContent {
  const t = getText(locale).menu;
  return {
    isPlaceholder: true,
    placeholderNote: t.placeholderNote,
    eyebrow: t.eyebrow,
    heading: t.heading,
    intro: t.intro,
    categories: t.categories.map((c) => ({ ...c, note: c.note || undefined })),
    footnote: t.footnote,
  };
}
