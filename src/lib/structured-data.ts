import { hoursBase } from "@/content/hours";
import { site } from "@/content/site";
import { getText } from "@/content/text";
import type { Locale } from "@/i18n/config";

/**
 * Restaurant JSON-LD containing ONLY verified information.
 *
 * Always emitted: name, description, cuisine (from the owner brief).
 * Added automatically once the matching real value exists in src/content/*:
 *   url         <- NEXT_PUBLIC_SITE_URL
 *   address     <- site.contact.address.postal
 *   telephone   <- site.contact.phone.tel
 *   geo         <- site.location.lat / lng
 *   openingHoursSpecification <- hours.confirmed === true
 *   sameAs      <- site.social.instagram.url
 *   hasMenu     <- site.menu.fullMenuUrl (the built-in /menu page is a placeholder, so it is not listed)
 *   acceptsReservations <- site.reservation.url
 */
export function buildRestaurantJsonLd(locale: Locale): Record<string, unknown> {
  const t = getText(locale).meta;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    description: t.description,
    servesCuisine: t.cuisine,
    inLanguage: locale,
  };

  if (site.url) data.url = `${site.url}/${locale}`;

  const postal = site.contact.address.postal;
  if (postal) data.address = { "@type": "PostalAddress", ...postal };

  if (site.contact.phone.tel) data.telephone = site.contact.phone.tel;
  if (site.contact.email.address) data.email = site.contact.email.address;

  if (site.location.lat !== null && site.location.lng !== null) {
    data.geo = {
      "@type": "GeoCoordinates",
      latitude: site.location.lat,
      longitude: site.location.lng,
    };
  }
  if (site.location.mapsUrl) data.hasMap = site.location.mapsUrl;

  if (hoursBase.confirmed) {
    data.openingHoursSpecification = hoursBase.rows
      .filter((row) => row.opens && row.closes)
      .map((row) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${row.day}`,
        opens: row.opens,
        closes: row.closes,
      }));
  }

  if (site.social.instagram.url) data.sameAs = [site.social.instagram.url];
  if (site.menu.fullMenuUrl) data.hasMenu = site.menu.fullMenuUrl;
  if (site.reservation.url) data.acceptsReservations = site.reservation.url;

  return data;
}

/** Serialise for a <script type="application/ld+json"> tag (escapes "<" to prevent XSS). */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
