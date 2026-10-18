import { getReviewsContent } from "@/content/reviews";
import type { Locale } from "@/i18n/config";
import type { ReviewsContent } from "@/types/content";

/**
 * Single seam for guest feedback.
 *
 * Today this returns the clearly-labelled illustrative notes from src/content/reviews.ts. To integrate an
 * authorised review source later (Google Places API / Business Profile API, or a hand-curated list of
 * genuine reviews), fetch and map the data here and return a `ReviewsContent` — e.g.
 *
 *   const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
 *     headers: { "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY!, "X-Goog-FieldMask": "reviews" },
 *     next: { revalidate: 86400 },
 *   });
 *
 * Respect the provider's terms (attribution, caching limits) and never invent or edit ratings, counts or
 * reviewer names. `GuestReviews` renders whatever it is given and shows stars only for reviews that carry a
 * real `rating`.
 */
export async function getReviews(locale: Locale): Promise<ReviewsContent> {
  return getReviewsContent(locale);
}
