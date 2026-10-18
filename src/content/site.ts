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
      lines: ["Marc-Aurel-Straße 2A", "1010 Wien"],
      // Fill this too so directions and structured data can use it.
      postal: {
        streetAddress: "Marc-Aurel-Straße 2A",
        addressLocality: "Wien",
        postalCode: "1010",
        addressCountry: "AT",
      },
    },
    phone: {
      display: "+43 660 1315115",
      tel: "+436601315115",
    },
    email: {
      address: "info@tinmo.at",
    },
  },

  social: {
    instagram: { handle: null, url: null }, // e.g. "@tinmo" / "https://instagram.com/tinmo"
  },

  reservation: {
    // Connect a booking provider by setting `url` (and `provider` for your own reference).
    // While `url` is null, "Reserve a Table" opens an honest placeholder dialog.
    provider: "none",
    url: null, // e.g. "https://www.opentable.com/r/tinmo"
    opensInNewTab: true,
  },

  location: {
    // Confirmed Google Maps listing (provided by the owner).
    mapsUrl:
      "https://www.google.com/maps/place/Miso%E2%80%A2U+Restaurant/@48.211518,16.3699785,17z/data=!3m1!4b1!4m6!3m5!1s0x476d072f7ddc7e19:0x994f1ded4a0433eb!8m2!3d48.2115145!4d16.3725534!16s%2Fg%2F11mc9fkfh3",
    embedUrl: "https://www.google.com/maps?q=48.2115145,16.3725534&z=17&output=embed",
    directionsUrl: null, // generated from lat/lng below
    lat: 48.2115145,
    lng: 16.3725534,
  },

  menu: {
    // Set to a PDF or external URL to replace the built-in /menu page.
    fullMenuUrl: null,
  },

  // Legal notice (Impressum) details. Null = shown as "to be added" on /impressum.
  legal: {
    operatorName: null,
    legalForm: null,
    vatId: null,
    companyRegister: null,
    chamber: null,
    tradeAuthority: null,
  },
};
