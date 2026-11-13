import { getText } from "@/content/text";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/lib/i18n";
import type { NavLink } from "@/types/content";

/** Primary navigation — kept deliberately short. */
export function getPrimaryNav(locale: Locale): NavLink[] {
  const t = getText(locale).nav;
  return [
    { label: t.room, href: localePath(locale, "/#room") },
    { label: t.menu, href: localePath(locale, "/#menu") },
    { label: t.visit, href: localePath(locale, "/#visit") },
  ];
}

/** Footer navigation — same links as the header. */
export function getFooterNav(locale: Locale): NavLink[] {
  return getPrimaryNav(locale);
}
