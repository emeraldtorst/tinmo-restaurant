import { site } from "@/content/site";

export type ReservationAction =
  | { kind: "link"; href: string; external: boolean }
  | { kind: "dialog" };

/**
 * What "Reserve a Table" does right now.
 *  - A booking URL is configured  -> a real link (new tab by default).
 *  - Otherwise                    -> the placeholder dialog (never a dead link,
 *                                    never a pretend booking).
 * To connect a booking provider, set `site.reservation.url` — nothing else changes.
 * The button label is translated (text/en.ts + de.ts → ui.reserve).
 */
export function getReservationAction(): ReservationAction {
  const { url, opensInNewTab } = site.reservation;
  if (url) {
    return { kind: "link", href: url, external: opensInNewTab };
  }
  return { kind: "dialog" };
}
