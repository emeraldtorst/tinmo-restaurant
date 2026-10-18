/**
 * Content contracts for TINMO.
 *
 * Presentation components receive these shapes as props; all editable copy and
 * data lives in `src/content/*`. Keep this file free of runtime code.
 */

/* -------------------------------------------------------------------------- */
/*  Media                                                                     */
/* -------------------------------------------------------------------------- */

export interface MediaCredit {
  creator: string;
  /** Page of the asset on the provider's site. */
  sourceUrl: string;
  license: string;
  licenseUrl: string;
}

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
  credit: MediaCredit;
}

export interface VideoVariant {
  src: string;
  type: "video/mp4" | "video/webm";
}

export interface HeroMedia {
  /** Landscape LCP poster (also the reduced-motion / failed-video fallback). */
  poster: ImageAsset;
  /** Portrait poster for narrow, tall screens. */
  posterPortrait: ImageAsset;
  /** One-sentence description of what the (decorative) video shows. */
  videoLabel: string;
  durationSeconds: number;
  /** Ordered by preference; the browser picks the first type it can play. */
  variants: {
    landscape: VideoVariant[];
    landscapeLite: VideoVariant[];
    portrait: VideoVariant[];
  };
  credit: MediaCredit;
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
/*  Story                                                                     */
/* -------------------------------------------------------------------------- */

export interface Figure {
  image: ImageAsset;
  caption: string;
}

export interface StoryContent {
  isPlaceholder: boolean;
  placeholderNote: string;
  eyebrow: string;
  heading: RichText;
  lead: string;
  principles: { label: string; text: string }[];
  figures: {
    interior: Figure;
    chef: Figure;
    ingredients: Figure;
    table: Figure;
  };
}

/* -------------------------------------------------------------------------- */
/*  Signature dishes + menu                                                   */
/* -------------------------------------------------------------------------- */

export interface Dish {
  id: string;
  name: string;
  description: string;
  /** Price text exactly as it should appear, or `null` to hide it. */
  price: string | null;
  image: ImageAsset;
  /** Short label such as "To share" or "Vegetarian". */
  tag?: string;
}

export interface DishesContent {
  isPlaceholder: boolean;
  placeholderNote: string;
  eyebrow: string;
  heading: RichText;
  intro: string;
  dishes: Dish[];
}

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
/*  Atmosphere gallery                                                        */
/* -------------------------------------------------------------------------- */

export interface GalleryItem {
  id: string;
  image: ImageAsset;
  caption: string;
}

export interface GalleryContent {
  eyebrow: string;
  heading: RichText;
  intro: string;
  /** The layout is composed for exactly this many items, in this order. */
  items: GalleryItem[];
}

/* -------------------------------------------------------------------------- */
/*  Reviews                                                                   */
/* -------------------------------------------------------------------------- */

export type ReviewSourceKind = "illustrative" | "google" | "manual";

export interface ReviewSource {
  kind: ReviewSourceKind;
  /** Human label, e.g. "Illustrative guest notes". */
  label: string;
  /** Google Maps / Business Profile URL. `null` until the real listing exists. */
  listingUrl: string | null;
  /** True while the notes are samples, not real reviews. */
  isPlaceholder: boolean;
  /** Disclosure shown to visitors while `isPlaceholder`. */
  disclosure: string | null;
}

export interface Review {
  id: string;
  quote: string;
  /** Only ever set for genuine, sourced reviews. */
  author: string | null;
  /** 1–5. Only ever set for genuine, sourced reviews. */
  rating: number | null;
  /** ISO date of a genuine review. */
  date: string | null;
  illustrative: boolean;
}

export interface ReviewsContent {
  eyebrow: string;
  heading: RichText;
  source: ReviewSource;
  reviews: Review[];
}

/* -------------------------------------------------------------------------- */
/*  Section copy + navigation                                                 */
/* -------------------------------------------------------------------------- */

export interface NavLink {
  label: string;
  href: string;
}

export interface SectionCopy {
  hero: {
    eyebrow: string;
    tagline: string;
    menuLabel: string;
  };
  visit: {
    eyebrow: string;
    heading: RichText;
    intro: string;
  };
  reserve: {
    eyebrow: string;
    heading: RichText;
    text: string;
  };
  footer: {
    blurb: string;
    designNote: string;
  };
}
