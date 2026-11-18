/**
 * Content contracts for TINMO.
 *
 * Presentation components receive these shapes as props; all editable copy and
 * data lives in `src/content/*`. Keep this file free of runtime code.
 */

/* -------------------------------------------------------------------------- */
/*  Media                                                                     */
/* -------------------------------------------------------------------------- */

export interface ImageAsset {
  /** Public URL, e.g. `/media/story/interior.webp`. */
  src: string;
  width: number;
  height: number;
  /** Descriptive alt text. Use an empty string ONLY for purely decorative images. */
  alt: string;
  /** Tiny base64 WebP used as the `blur` placeholder. */
  blurDataURL?: string;
  /** Average colour (hex) — used behind the image and in the failure fallback. */
  color?: string;
  /** CSS `object-position` focal point, e.g. `"50% 35%"`. */
  objectPosition?: string;
}

export interface VideoVariant {
  src: string;
  type: "video/mp4" | "video/webm";
}

export interface HeroVideoMedia {
  /** One-sentence description of what the (decorative) video shows. */
  videoLabel: string;
  /** Ordered by preference; the browser picks the first type it can play. */
  variants: {
    landscape: VideoVariant[];
    portrait: VideoVariant[];
  };
}

/* -------------------------------------------------------------------------- */
/*  Text                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Headline text with optional italic emphasis, e.g.
 * `["A ", { em: "different" }, " kind of evening."]`.
 */
export type RichText = ReadonlyArray<string | { em: string }>;

/* -------------------------------------------------------------------------- */
/*  Site configuration                                                        */
/* -------------------------------------------------------------------------- */

export interface PostalAddress {
  streetAddress: string;
  addressLocality: string;
  addressRegion?: string;
  postalCode: string;
  /** ISO 3166-1 alpha-2, e.g. "GB". */
  addressCountry: string;
}

export interface AddressConfig {
  /** Display lines. `null` = not confirmed yet (a placeholder is shown). */
  lines: string[] | null;
  /** Structured address for directions + JSON-LD. `null` until confirmed. */
  postal: PostalAddress | null;
}

export interface PhoneConfig {
  /** Human-readable number, e.g. "020 7946 0000". `null` = not confirmed. */
  display: string | null;
  /** E.164 number for `tel:` links, e.g. "+442079460000". */
  tel: string | null;
}

export interface EmailConfig {
  address: string | null;
}

export type ReservationProvider =
  | "none"
  | "opentable"
  | "resy"
  | "sevenrooms"
  | "tock"
  | "thefork"
  | "custom";

export interface ReservationConfig {
  provider: ReservationProvider;
  /** Booking URL. `null` = booking not connected (the placeholder dialog opens). */
  url: string | null;
  /** Booking widget shown inside the site's reservation dialog (TheFork). Loaded only after the visitor clicks "Reserve". */
  embedUrl: string | null;
  opensInNewTab: boolean;
}

export interface LocationConfig {
  /** A Google Maps place link (https://maps.app.goo.gl/… or https://www.google.com/maps/place/…). */
  mapsUrl: string | null;
  /** Full `https://www.google.com/maps/embed?…` URL from "Share → Embed a map". */
  embedUrl: string | null;
  /** Optional hand-written directions link; overrides the generated one. */
  directionsUrl: string | null;
  lat: number | null;
  lng: number | null;
}

export interface SocialLink {
  handle: string | null;
  url: string | null;
}

export interface LegalConfig {
  /** Name / company name of the operator and media owner. `null` = still to be added. */
  operatorName: string | null;
  legalForm: string | null;
  /** Registered office (Sitz), e.g. "Wien". */
  seat: string | null;
  /** Managing director(s). Name only — never a birth date or private address. */
  managingDirector: string | null;
  /** Trade wording from GISA, e.g. "Gastgewerbe in der Betriebsart Restaurant". */
  tradeWording: string | null;
  /** Austrian VAT ID, e.g. "ATU12345678". */
  vatId: string | null;
  /** Firmenbuchnummer + court, e.g. "FN 123456 a, Handelsgericht Wien". */
  companyRegister: string | null;
  /** e.g. "Wirtschaftskammer Wien". */
  chamber: string | null;
  /** Trade authority, e.g. "Magistratisches Bezirksamt für den 1. und 8. Bezirk". */
  tradeAuthority: string | null;
}

export interface SiteConfig {
  name: string;
  /** Canonical origin from NEXT_PUBLIC_SITE_URL, without trailing slash. `null` until a real domain exists. */
  url: string | null;
  contact: {
    address: AddressConfig;
    phone: PhoneConfig;
    email: EmailConfig;
  };
  social: {
    instagram: SocialLink;
  };
  reservation: ReservationConfig;
  location: LocationConfig;
  menu: {
    /** PDF or external menu. `null` = use the internal /menu page. */
    fullMenuUrl: string | null;
  };
  legal: LegalConfig;
}

/* -------------------------------------------------------------------------- */
/*  Opening hours                                                             */
/* -------------------------------------------------------------------------- */

export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface HoursRow {
  day: Weekday;
  /** 24h "HH:MM". Both `null` = closed. */
  opens: string | null;
  closes: string | null;
}

export interface HoursConfig {
  /** `false` while the rows are illustrative. Flip to `true` once confirmed. */
  confirmed: boolean;
  /** Heading shown above the table, e.g. "Temporary opening hours". */
  label: string;
  /** Small note displayed under the table while unconfirmed. */
  note: string;
  /** IANA time zone, e.g. "Europe/London". */
  timezone: string | null;
  rows: HoursRow[];
}

/* -------------------------------------------------------------------------- */
/*  Menu                                                                      */
/* -------------------------------------------------------------------------- */

export interface MenuItem {
  name: string;
  description: string;
  price: string | null;
  /** e.g. ["V", "VG", "GF"]. */
  dietary?: string[];
}

export interface MenuCategory {
  id: string;
  title: string;
  note?: string;
  items: MenuItem[];
}

export interface MenuContent {
  isPlaceholder: boolean;
  placeholderNote: string;
  eyebrow: string;
  heading: RichText;
  intro: string;
  categories: MenuCategory[];
  footnote: string;
}

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

export interface NavLink {
  label: string;
  href: string;
}
