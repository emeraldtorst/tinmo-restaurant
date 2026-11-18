import type { SiteConfig } from "@/types/content";

/**
 * Core restaurant details.
 *
 * Everything marked `null` is a PLACEHOLDER: the UI shows a clearly labelled
 * "to be confirmed" state and never renders a dead link. Fill a value in and the
 * matching placeholder disappears automatically (see src/lib/contact.ts).
 *
 * See README.md → "Before launch" for the full checklist.
 */
const origin = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || null;

export const site: SiteConfig = {
  name: "TINMO",
  url: origin,

  contact: {
    address: {
      // e.g. ["12 Example Street", "Sample Town", "AB1 2CD"]
      lines: ["Marc-Aurel-Straße 2a/1", "1010 Wien"],
      // Fill this too so directions and structured data can use it.
      postal: {
        streetAddress: "Marc-Aurel-Straße 2a/1",
        addressLocality: "Wien",
        postalCode: "1010",
        addressCountry: "AT",
      },
    },
    phone: {
      display: "+43 660 9999389",
      tel: "+436609999389",
    },
    email: {
      address: "info@tinmo.at",
    },
  },

  social: {
    instagram: { handle: null, url: null }, // e.g. "@tinmo" / "https://instagram.com/tinmo"
  },

  reservation: {
    // TheFork booking widget, shown in the reservation pop-up. `url` stays null: "Reserve" opens the pop-up, not a new page.
    // (Set `url` instead to make the buttons plain links to a booking page.)
    provider: "thefork",
    url: null,
    embedUrl: "https://widget.thefork.com/090f8c69-e6df-419f-8daa-cc73226ae1c2",
    opensInNewTab: true,
  },

  location: {
    // The TINMO listing on Google Maps.
    mapsUrl:
      "https://www.google.com/maps/place/Tinmo/@48.211525,16.3699775,17z/data=!3m1!4b1!4m6!3m5!1s0x476d07ce5c6b26f7:0x90e510de16a27386!8m2!3d48.2115215!4d16.3725524!16s%2Fg%2F11z_d8dyln",
    embedUrl: "https://www.google.com/maps?q=48.2115215,16.3725524&z=17&output=embed",
    directionsUrl: null, // generated from lat/lng below
    lat: 48.2115215,
    lng: 16.3725524,
  },

  menu: {
    // Set to a PDF or external URL to replace the built-in /menu page.
    fullMenuUrl: null,
  },

  // Legal notice (Impressum) details, from the Firmenbuch extract (18.08.2026) and the GISA extract (13.11.2026).
  // A `null` row is simply left out of /impressum.
  legal: {
    operatorName: "KUMO Cuisine GmbH",
    legalForm: "Gesellschaft mit beschränkter Haftung (GmbH)",
    seat: "Wien",
    managingDirector: "Zhenwei Chen",
    // UID as provided by the owner (not shown on the Firmenbuch or GISA extracts).
    vatId: "ATU83765105",
    companyRegister: "FN 685901 d, Handelsgericht Wien",
    tradeWording: "Gastgewerbe in der Betriebsart Restaurant (GISA-Zahl 40109084)",
    chamber: "Wirtschaftskammer Wien",
    tradeAuthority: "Magistrat der Stadt Wien",
  },
};
