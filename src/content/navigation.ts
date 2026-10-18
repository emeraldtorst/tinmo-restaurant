import { getText } from "@/content/text";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/i18n";
import type { NavLink } from "@/types/content";

/** Primary navigation — kept deliberately short. */
export function getPrimaryNav(locale: Locale): NavLink[] {
  const t = getText(locale).nav;
  return [
    { label: t.story, href: localePath(locale, "/#story") },
    { label: t.menu, href: localePath(locale, "/#menu") },
    { label: t.visit, href: localePath(locale, "/#visit") },
  ];
}

/** Footer navigation — a superset of the primary links. */
export function getFooterNav(locale: Locale): NavLink[] {
  const t = getText(locale).nav;
  return [
    { label: t.story, href: localePath(locale, "/#story") },
    { label: t.menu, href: localePath(locale, "/#menu") },
    { label: t.atmosphere, href: localePath(locale, "/#atmosphere") },
    { label: t.reviews, href: localePath(locale, "/#reviews") },
    { label: t.visit, href: localePath(locale, "/#visit") },
  ];
}
