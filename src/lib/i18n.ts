import { locales, type Locale } from "@/i18n/config";

/**
 * Locale-prefixed internal path.
 *   localePath("de", "/")        -> "/de"
 *   localePath("de", "/#story")  -> "/de#story"
 *   localePath("en", "/menu")    -> "/en/menu"
 */
export function localePath(locale: Locale, path: string): string {
  if (path === "/" || path === "") return `/${locale}`;
  if (path.startsWith("/#")) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Same page in another language: "/de/menu" -> "/en/menu". */
export function swapLocale(pathname: string, to: Locale): string {
  const [, first, ...rest] = pathname.split("/");
  const tail = (locales as readonly string[]).includes(first) ? rest : [first, ...rest].filter(Boolean);
  return `/${[to, ...tail.filter(Boolean)].join("/")}`;
}
