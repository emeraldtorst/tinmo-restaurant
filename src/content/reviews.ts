import { getText } from "@/content/text";
import type { Locale } from "@/i18n/config";
import type { ReviewsContent } from "@/types/content";

/**
 * Guest notes (05). PLACEHOLDER — these are NOT real reviews: short illustrative notes that show how the
 * section will look, and the page says so. No names, ratings or review counts on purpose. Wording is in
 * text/en.ts + de.ts.
 *
 * Going live with real feedback:
 *  1. Set `source.kind` to "google" (or "manual"), `isPlaceholder` to false and `listingUrl` to the
 *     restaurant's Google Maps / Business Profile URL.
 *  2. Replace `reviews` with genuine, permitted excerpts (author / rating / date only when they come from
 *     the real review) — or fetch them from an authorised source in src/lib/reviews.ts (Google Places API /
 *     Business Profile API). The UI components never need to change.
 */
export function getReviewsContent(locale: Locale): ReviewsContent {
  const t = getText(locale).reviews;
  return {
    eyebrow: t.eyebrow,
    heading: t.heading,
    source: {
      kind: "illustrative",
      label: t.label,
      listingUrl: null,
      isPlaceholder: true,
      disclosure: t.disclosure,
    },
    reviews: t.notes.map((quote, i) => ({
      id: `note-${i + 1}`,
      quote,
      author: null,
      rating: null,
      date: null,
      illustrative: true,
    })),
  };
}
