import { site } from "@/content/site";

/** Placeholder strings per language (text/en.ts + de.ts → `placeholders`). */
export interface Placeholders {
  address: string;
  phone: string;
  email: string;
  instagram: string;
}

/**
 * Resolves contact details from `site` into display-ready values.
 *
 * Components never decide what a placeholder looks like: they render `text`, and only render an anchor
 * when `href` is non-null. A value is a placeholder exactly when the matching field in
 * src/content/site.ts is still `null`.
 */
export interface ContactValue {
  text: string;
  /** `null` while the real value is not configured — render as plain text, never a dead link. */
  href: string | null;
  isPlaceholder: boolean;
}

export interface AddressValue {
  lines: string[];
  isPlaceholder: boolean;
}

export function getAddress(p: Placeholders): AddressValue {
  const { lines } = site.contact.address;
  return lines && lines.length > 0
    ? { lines, isPlaceholder: false }
    : { lines: [p.address], isPlaceholder: true };
}

export function getPhone(p: Placeholders): ContactValue {
  const { display, tel } = site.contact.phone;
  if (display && tel) {
    return { text: display, href: `tel:${tel}`, isPlaceholder: false };
  }
  return { text: p.phone, href: null, isPlaceholder: true };
}

export function getEmail(p: Placeholders): ContactValue {
  const { address } = site.contact.email;
  if (address) {
    return { text: address, href: `mailto:${address}`, isPlaceholder: false };
  }
  return { text: p.email, href: null, isPlaceholder: true };
}

export function getInstagram(p: Placeholders): ContactValue {
  const { handle, url } = site.social.instagram;
  if (url) {
    return { text: handle ?? "Instagram", href: url, isPlaceholder: false };
  }
  return { text: p.instagram, href: null, isPlaceholder: true };
}
