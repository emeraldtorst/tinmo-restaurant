export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
/** Vienna restaurant: German is the default; English lives under /en. */
export const defaultLocale: Locale = "de";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
