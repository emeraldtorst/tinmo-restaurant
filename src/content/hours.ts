import { getText } from "@/content/text";
import type { Locale } from "@/i18n/config";
import type { HoursConfig, HoursRow } from "@/types/content";

/**
 * Opening hours.
 *
 * PLACEHOLDER: the rows below are illustrative and are labelled as such on the page. When the real
 * hours are known: edit `rows`, set `confirmed: true` and (optionally) set `timezone`. Structured
 * data (JSON-LD) only includes opening hours once `confirmed` is true. The heading, note and day
 * names are translated in src/content/text/en.ts and de.ts.
 *
 * Use 24-hour "HH:MM". Set both `opens` and `closes` to `null` for a closed day.
 */
export const hoursBase: { confirmed: boolean; timezone: string | null; rows: HoursRow[] } = {
  confirmed: false,
  timezone: null,
  rows: [
    { day: "Monday", opens: null, closes: null },
    { day: "Tuesday", opens: "17:30", closes: "22:00" },
    { day: "Wednesday", opens: "17:30", closes: "22:00" },
    { day: "Thursday", opens: "17:30", closes: "22:30" },
    { day: "Friday", opens: "17:30", closes: "23:00" },
    { day: "Saturday", opens: "12:00", closes: "23:00" },
    { day: "Sunday", opens: "12:00", closes: "21:00" },
  ],
};

export function getHours(locale: Locale): HoursConfig {
  const t = getText(locale).visit;
  return { ...hoursBase, label: t.hoursLabel, note: t.hoursNote };
}
