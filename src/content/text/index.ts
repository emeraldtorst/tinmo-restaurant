import { de } from "@/content/text/de";
import { en, type TextBundle } from "@/content/text/en";
import type { Locale } from "@/i18n/config";

export type { TextBundle };

/** All wording for a locale. Edit the text in en.ts / de.ts. */
export function getText(locale: Locale): TextBundle {
  return locale === "de" ? de : en;
}
