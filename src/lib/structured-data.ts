import { hoursBase } from "@/content/hours";
import { site } from "@/content/site";
import { getText } from "@/content/text";
import type { Locale } from "@/i18n/config";

/** Cuisines named on the menus, in the visitor's language. */
const cuisines: Record<Locale, string[]> = {
  de: ["Sushi", "Asiatische Küche", "Dim Sum", "Udon", "Thai Curry"],
  en: ["Sushi", "Asian cuisine", "Dim sum", "Udon", "Thai curry"],
};

/** Photographs offered to search engines (absolute URLs, only when the domain is configured). */
const photos = ["room-corner-full", "room-window-full", "dish-0606", "dish-0579", "dish-0542"];

/**
 * Restaurant JSON-LD (schema.org) containing ONLY verified information, read by Google and by AI search engines.
 *
 * Always emitted: name, description, cuisine.
 * Added automatically once the matching real value exists in src/content/*:
 *   url, @id, logo, image  <- NEXT_PUBLIC_SITE_URL
 *   address                <- site.contact.address.postal
 *   telephone, email       <- site.contact
 *   geo, hasMap            <- site.location
 *   openingHoursSpecification <- hours.confirmed === true
 *   legalName, vatID       <- site.legal
 *   sameAs                 <- site.social.instagram.url
 *   hasMenu                <- the Speisekarte PDF (or site.menu.fullMenuUrl)
 *   acceptsReservations    <- true (by phone or email) or site.reservation.url
 */
export function buildRestaurantJsonLd(locale: Locale): Record<string, unknown> {
  const t = getText(locale).meta;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    description: t.description,
    servesCuisine: cuisines[locale],
    priceRange: "€€",
    inLanguage: locale,
  };

  if (site.legal.operatorName) data.legalName = site.legal.operatorName;
  if (site.legal.vatId) data.vatID = site.legal.vatId;

  if (site.url) {
    data.url = `${site.url}/${locale}`;
    data["@id"] = `${site.url}/#restaurant`;
    data.logo = `${site.url}/brand/tinmo-logo-olive.png`;
    data.image = photos.map((name) => `${site.url}/media/photos/${name}.webp`);
  }

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

  const menuUrl = site.menu.fullMenuUrl ?? (site.url ? `${site.url}/menu/speisekarte.pdf` : null);
  if (menuUrl) data.hasMenu = { "@type": "Menu", name: getText(locale).menus.food.name, url: menuUrl, inLanguage: ["de", "en"] };

  if (site.reservation.url) data.acceptsReservations = site.reservation.url;
  else if (site.contact.phone.tel || site.contact.email.address) data.acceptsReservations = true;

  return data;
}

/** Serialise for a <script type="application/ld+json"> tag (escapes "<" to prevent XSS). */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
