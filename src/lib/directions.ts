import { site } from "@/content/site";

export interface DirectionsAction {
  /** `null` until a real destination is configured. */
  href: string | null;
}

/**
 * "Get Directions" link, in order of preference:
 *  1. `location.directionsUrl` (hand-written override)
 *  2. a Google Maps directions link for the structured address
 *  3. a Google Maps directions link for lat/lng
 *  4. `location.mapsUrl`
 * Returns `href: null` while nothing is configured (the UI shows a disabled, explained state).
 */
export function getDirections(): DirectionsAction {
  const { location, contact } = site;

  if (location.directionsUrl) return { href: location.directionsUrl };

  const postal = contact.address.postal;
  if (postal) {
    const destination = [
      postal.streetAddress,
      postal.addressLocality,
      postal.addressRegion,
      postal.postalCode,
      postal.addressCountry,
    ]
      .filter(Boolean)
      .join(", ");
    return { href: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}` };
  }

  if (location.lat !== null && location.lng !== null) {
    return { href: `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}` };
  }

  return { href: location.mapsUrl };
}
