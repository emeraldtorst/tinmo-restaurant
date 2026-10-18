---
name: web-performance-accessibility
description: Performance, SEO, privacy and accessibility rules for the TINMO restaurant site (Next.js 16, Tailwind v4). Use when adding media, fonts, metadata or structured data, changing navigation, the dialog or the map, or before shipping any change.
---

# TINMO — performance, SEO, privacy and accessibility

## 1. Budgets (mobile first)
| Item | Budget |
|---|---|
| Hero poster (LCP image) | ≤ 150 KB, `priority`, explicit size, blur placeholder |
| Hero video | MP4 H.264, no audio, ≤ 3.5 MB desktop / ≤ 1.8 MB phone, `preload="metadata"`, `muted loop playsInline` |
| Photo masters | WebP, ≤ 2200 px wide, ≤ 260 KB; made with `scripts/optimize-image.mjs` |
| First-load JS | < 130 KB gzip; no animation, UI or date libraries |
| Layout shift | ≈ 0: every image sits in an aspect-ratio box; fonts via `next/font` |
| Lighthouse (mobile) | Performance ≥ 90 · Accessibility ≥ 95 · Best practices ≥ 95 · SEO ≥ 95 |

## 2. Fonts and images
- Two families only (Fraunces, Hanken Grotesk), loaded with `next/font/google` (self-hosted at build, `display: "swap"`, latin subset). No runtime request to Google Fonts.
- All photography goes through `MediaImage` → `next/image` with `fill`, a truthful `sizes`, `placeholder="blur"` and `quality` from `images.qualities` (60/75/85). Only the hero poster is `priority`; everything else lazy-loads.
- `sizes` cheat-sheet: full-bleed `100vw`; 8-column bleed `(min-width:768px) 66vw, 100vw`; 4–5 column `(min-width:768px) 33–40vw, 90vw`; arch/portrait `(min-width:768px) 30vw, 70vw`.
- Failed image → stone panel with the image's average colour and "Image unavailable" (never a broken icon).

## 3. Hero video
- Poster is always rendered underneath; the video fades in on `playing`.
- Not played when `prefers-reduced-motion: reduce`, when `Save-Data` is on, or when it errors; paused while off-screen; a visible pause/play button is always present (WCAG 2.2.2).
- Portrait/phone variant on viewports ≤ 820 px.

## 4. Metadata, SEO, structured data
- `generateMetadata` per locale: title template `%s — TINMO`, description, Open Graph (`de_AT` / `en_GB`), Twitter card, `alternates.languages` (de, en, x-default) and canonical — **only when `NEXT_PUBLIC_SITE_URL` is set**.
- Without the domain: `robots: noindex` and `robots.txt` disallows all. `sitemap.xml` is empty until the domain exists.
- `<html lang>` follows the locale; `proxy.ts` redirects `/` to `/de` or `/en` from `Accept-Language` (no cookies).
- JSON-LD `Restaurant` contains only verified facts: name, description, cuisine, plus url / address / telephone / email / geo / hasMap / sameAs / openingHoursSpecification / hasMenu / acceptsReservations **only when the matching value is real** (`hours.confirmed`, `site.menu.fullMenuUrl`, …). Never add ratings, review counts or prices that are not confirmed.
- Still to create: a 1200×630 social-sharing image (`opengraph-image`).

## 5. Privacy (GDPR / Austria)
- No cookies, no analytics, no third-party requests on page load. Verify with the network tab: nothing leaves the origin before the visitor clicks "Load map".
- The Google map is a click-to-load iframe (`MapEmbed`); a plain "Open in Google Maps" link needs no consent.
- Any new third-party embed (booking widget, newsletter, analytics, video) needs the same click-to-load or a consent step **and** an update to `/datenschutz`.
- `/impressum` and `/datenschutz` are drafts until the operator's details are in `site.legal` and the text is legally reviewed.

## 6. Accessibility
- One `<h1>` per page; sections are `<section aria-labelledby>`; landmarks `header`, `nav` (labelled), `main#main`, `footer`; skip link is the first focusable element.
- Visible focus on everything: 2 px accent outline, 3 px offset (bone on dark surfaces). Touch targets ≥ 44 × 44 px.
- Mobile menu and reservation dialog: focus moves in, Tab is trapped, Esc closes, focus returns to the trigger (menu: manual trap; dialog: native `<dialog>`).
- Disabled controls are `aria-disabled` with a visible explanation — never a dead link.
- Alt text describes only what is visible (≤ 125 chars), is translated (`text/*.ts → alt`), and is `""` only for purely decorative images. The decorative hero video has an `aria-label`.
- Reduced motion: reveals resolve instantly (`motion-ok` is never set), video does not play, smooth scrolling is off.
- Contrast (WCAG formula, on paper `#F8F7F3`): ink 15:1 · muted-strong `#5E5D57` ≈ 6.2:1 · red `#A3281F` ≈ 6.8:1 · paper on red ≈ 6.8:1. `--color-muted #77766F` is ≈ 4.3:1 — decorative or ≥ 24 px only. Text on photos sits on a scrim.

## 7. Testing protocol
1. `npm run lint && npx tsc --noEmit && npm run build` — all clean.
2. `node scripts/shoot.mjs http://localhost:3000/de --widths 375,430,768,1024,1440,1920` — no horizontal overflow, no console errors, no broken images; look at the screenshots. Repeat for `/en`, `/de/menu`, `/de/impressum`, `/de/datenschutz`.
3. Add `--reduced` (reduced motion) and `--nojs` (JavaScript off): everything must still be visible and readable.
4. Keyboard only: Tab through the page, open and close the mobile menu and the reservation dialog, use the language switch.
5. Lighthouse against `npm start`: `npx lighthouse http://localhost:3000/de --only-categories=performance,accessibility,best-practices,seo --form-factor=mobile`.

## Before you ship a change
- [ ] New image: optimised, ≤ 260 KB, `sizes` set, translated alt text, credit in `CREDITS.md`.
- [ ] New third-party request: click-to-load or consent, privacy policy updated.
- [ ] New text: added to both `de.ts` and `en.ts`.
- [ ] Structured data still contains only verified facts.
- [ ] Section 7 passes.
