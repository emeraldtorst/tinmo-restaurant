# TINMO — restaurant website

Modern Asian fusion restaurant, Marc-Aurel-Straße 2A, 1010 Wien. Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4. No animation library: motion is CSS + one small IntersectionObserver. Bilingual: German (`/de`, default) and English (`/en`).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000  (redirects to /de or /en by browser language)
npm run lint
npx tsc --noEmit
npm run build && npm start
```

Visual QA (screenshots + overflow / console checks at several widths, uses the installed Edge):

```bash
node scripts/shoot.mjs http://localhost:3000/de --widths 375,430,768,1024,1440,1920 --out qa-shots
```

## Where to edit things

| What | Where |
|---|---|
| **All wording** (both languages) | `src/content/text/de.ts` and `en.ts` — same structure, TypeScript keeps them in sync |
| Phone, email, address, Instagram, booking link, map, menu PDF, legal-notice details | `src/content/site.ts` |
| Opening hours (times, `confirmed` flag) | `src/content/hours.ts` |
| Dish prices and which photo each dish uses | `src/content/dishes.ts` |
| Photos and hero video, alt-text keys | `src/content/media.ts` (alt text itself is in `text/*.ts`) |
| Colours, type scale, spacing, motion timings | top of `src/app/globals.css` |
| Show / hide all photography and the hero video | `src/content/flags.ts` (`SHOW_MEDIA`) |

Anything unconfirmed is flagged and shows a visible "placeholder" note. The note disappears when the real value is filled in (for hours: set `confirmed: true`).

### Connect real reservations
Set `reservation.url` in `src/content/site.ts` to the booking page (OpenTable, Resy, SevenRooms, Tock, TheFork or your own). Every "Reserve a Table" button then opens it. Until then the button opens a dialog with the phone number and email.

### Replace photos or the hero video
1. Put the original photo anywhere outside the project, then run
   `node scripts/optimize-image.mjs <input> public/media/<folder>/<name> --width 2000 --ratio 4:5 --quality 78`
   It writes a WebP and prints `src`, `width`, `height`, `blurDataURL` and `color`.
2. Paste those values into the matching entry in `src/content/media.ts` and update the alt text in `text/de.ts` and `text/en.ts`.
3. Hero video: replace the files in `public/media/hero/` (MP4, H.264, no audio, ≤ 3.5 MB; a 540p/720p version for phones; a poster frame as `poster.webp`). Keep the paths, or edit `hero` in `media.ts`.
4. Update `public/media/CREDITS.md`.

The photos and video currently in the project are temporary stock media (Pexels / Unsplash / Mixkit — free licences, see `public/media/CREDITS.md`). They show other places and dishes; replace them with the restaurant's own photography before launch.

### Guest reviews
The notes shown are illustrative and say so. To go live with real reviews, set the Google listing URL and replace the notes — or fetch them from an authorised source in `src/lib/reviews.ts`. Never invent ratings or reviewer names.

## Privacy and legal (Austria)
- No cookies, no analytics, fonts and media served from the site itself.
- The Google map loads only after the visitor clicks "Karte laden" / "Load map"; nothing is sent to Google before that.
- `/impressum` and `/datenschutz` exist as **drafts**: add the operator's details in `site.legal` and have both texts reviewed by a lawyer or the Wirtschaftskammer before launch. If you add analytics, a booking widget or a newsletter, update the privacy policy and add a consent step.

## Before launch — details the owner must supply
- [ ] Real opening hours (then `confirmed: true` in `hours.ts`)
- [ ] Real menu: dishes, descriptions, prices in €, allergen information (Austrian allergen codes)
- [ ] Booking system link (`reservation.url`)
- [ ] Operator details for the legal notice: name / company, legal form, UID, Firmenbuch number, chamber, trade authority
- [ ] Instagram link
- [ ] The restaurant's own photos and video; replace the stock media
- [ ] Real guest reviews (or keep the section off)
- [ ] Hosting provider named in the privacy policy
- [ ] Confirm the Google listing name matches the brand (the supplied listing is named "Miso•U Restaurant")
- [ ] A social-sharing image (1200×630) — not created yet
- [ ] German and English wording reviewed by a native speaker

## Domain and indexing
`.env.production` sets `NEXT_PUBLIC_SITE_URL=https://tinmo.at`. In a production build this turns on canonical and language-alternate links, the sitemap, and lets search engines index the site. With the variable unset (development) the site is marked `noindex` and `robots.txt` blocks crawlers. **Do not deploy to tinmo.at while placeholder content is still visible.**

## Project standards
Design, motion, UX, engineering and performance standards for this project are in `.claude/skills/*/SKILL.md`.
