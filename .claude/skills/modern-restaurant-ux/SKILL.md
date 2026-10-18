---
name: modern-restaurant-ux
description: Use when designing, writing copy for, building or reviewing any TINMO restaurant-website UI that involves booking, the menu, navigation, story, signature dishes, visit details, guest notes, or loading/error/placeholder states. It is the UX contract for converting visitors into reservations while the site stays quiet, honest and uncommercial.
---

# Modern restaurant UX for TINMO

The shared brief (tokens, type, motion, architecture, placeholder policy) wins any conflict. This skill adds the
behaviour layer: where the Reserve path lives, what a visitor can do in three taps, how every unconfirmed fact is
shown, and what happens when something fails. Copy is British English; code identifiers are US spelling.

**Core stance:** a guest decides in three questions: *what is this place, can I see the food, can I get a table.*
Answer them in that order, at every viewport, without pressure. Conversion comes from clarity and reachability,
never from urgency.

## 1. Identity and cuisine positioning

- Say "Asian fusion" in plain words, on the first screen. At 375x667 the hero shows: TINMO wordmark, the label
  `01 — Modern Asian fusion`, tagline "An unexpected meeting of Asian flavours.", Reserve, Explore the Menu.
- Use the same phrase everywhere it appears: hero label, `<title>` ("TINMO — Modern Asian fusion restaurant"), meta
  description, JSON-LD `servesCuisine: "Asian fusion"`, footer. Lowercase "fusion". Do not name a city, street or
  neighbourhood until `site.ts` holds a confirmed address.
- The single `<h1>` reads "TINMO" plus visually hidden context: `<h1>TINMO<span class="sr-only"> — modern Asian
  fusion restaurant</span></h1>`. Animated letters are `aria-hidden`; the full word is exposed once.
- Express "fusion" through ingredient, fire, season and table (brief §1 voice), never through decoration.
- Banned words in any copy: best, authentic, world-class, award-winning, hidden gem, foodie, culinary journey,
  exotic, oriental, "Welcome to". No exclamation marks. No emoji.

| Do | Don't |
|---|---|
| "Charcoal, citrus and one long table." | "Welcome to TINMO, the best authentic Asian fusion experience!" |
| "Asian fusion, cooked over fire." | "A culinary journey through the Orient." |

## 2. Reservation-path map

Every placement is the same `ReserveButton`, passes `placement`, and renders `data-reserve-cta="<placement>"` so it
can be counted and tested. Weights: `primary` (filled), `secondary` (1px outline), `link` (underline-draw).

| Placement | Where | Weight | Visible label | Notes |
|---|---|---|---|---|
| `nav` | Navbar, every viewport; on mobile a compact button in the top bar, left of the menu button | `secondary` | "Reserve" below `md`, "Reserve a Table" from `md` | Always rendered, even over the transparent hero |
| `hero` | `#top`, beside Explore the Menu | `primary` | Reserve a Table | Fully visible at 375x667 and 360x640 without scrolling |
| `plates` | `#menu`, after the last plate | `primary` | Reserve a Table | One lead-in line ("Taste it at the table.") plus View Full Menu as `link` |
| `visit` | `#visit`, after address, hours and contact | `primary` | Reserve a Table | Sits beside Get Directions (`secondary`) |
| `final` | `#reserve` (dark surface, `cta-evening`) | `primary` | Reserve a Table | Dark-surface tone, `--color-bone` focus ring |
| `mobile-menu` | Bottom of the full-screen overlay | `primary` | Reserve a Table | Full width, min-height 56px, `padding-bottom: env(safe-area-inset-bottom)` |
| `menu-page` | End of `/menu` | `primary` | Reserve a Table | Not counted on `/` |

On `/` there are exactly six `[data-reserve-cta]` nodes (nav, hero, plates, visit, final, mobile-menu). Adding a seventh
needs owner sign-off. The footer carries contact details, never a Reserve button.

### Rules

1. **One tap:** at every scroll position and width from 320 to 1920, a Reserve control is in the viewport or one tap
   away (the `nav` button). `Navbar` renders from `src/app/layout.tsx`, so `/menu` and `not-found.tsx` inherit it.
2. **One primary per viewport:** never two `primary` buttons in the same frame. The `nav` button is deliberately
   `secondary`. Verify by scrolling in 100px steps at 375x812 and 1440x900.
3. **Same label, same destination.** The button label is always "Reserve a Table" (compact "Reserve" in the top bar,
   with `Reserve<span class="sr-only md:not-sr-only"> a Table</span>` so the accessible name stays complete).
4. **Say what happens next.** If the link opens elsewhere: `target="_blank"`, `rel="noopener noreferrer"`, and an
   `sr-only` " (opens in a new tab)". Under the `final` CTA, a factual line from data ("Booking opens in a new tab.").
5. **Earn the ask.** Reserve appears after a sensory beat (plates, visit facts), not between paragraphs of story.
6. **Resting fill is never `--color-accent`.** No shadows, no pill radius, no pulsing, no second accent colour.

### Anti-commercial rules (hard no)

- No countdowns, timers, "only 3 tables left", "booked 12 times today", "N people viewing".
- No popups, modals, banners, slide-ins, exit-intent, newsletter capture, chat widgets or cookie-style interruptions.
  The dialog opens only from a user activating a `ReserveButton`; never on load, scroll, timer or hover.
- No sticky bottom bars or floating action buttons. The top bar is the only persistent booking surface.
- No discount or deal language: "offer", "deal", "% off", "free", "limited", "exclusive", "don't miss out".
- No third-party booking widget iframe in the initial page load. Link out, or load only on explicit intent.
- If analytics is ever added it must be cookieless and consent-free; a consent banner is not acceptable. Ask the owner.

### ReserveButton and ReservationDialog behaviour

- `site.reservation.url` is a valid `https://` URL (checked in `src/lib/reservation.ts`): render `<a href>`.
  Anything else (null, empty, `http:`, `javascript:`, malformed) counts as not connected.
- Not connected: render `<button type="button" aria-haspopup="dialog">` that calls `showModal()` on one shared native
  `<dialog aria-labelledby>`. Esc, focus trap and focus restoration to the trigger come from the platform; do not
  re-implement them. Backdrop click closes (`event.target === dialog`). Initial focus goes to the Close button.
- Dialog content, in order: `<h2>` "Reserve a Table"; "Online booking is not connected yet."; phone and email rows in
  their placeholder states (section 9); a label-type note "Placeholder — set reservation.url in src/content/site.ts";
  a Close button (44x44 minimum). Transition is opacity/transform in `--dur-base`; instant under reduced motion.
- Never render a link and a dialog for the same button. Never a spinner: opening is synchronous.

## 3. Easy-to-find menu

- Nav order is `Menu · Story · Atmosphere · Visit` plus Reserve. "Menu" is first. Hrefs use `/#menu` so they work from `/menu`.
- The menu is reachable from five places: nav, hero `Explore the Menu` (`/#menu`), the `#menu` header row, the row after
  the plates, and the footer. All "View Full Menu" links resolve through one helper: `menu.fullMenuUrl ?? "/menu"`.
- In `#menu`, put View Full Menu in the section header row so it is visible the moment the anchor lands (scroll offset
  is `scroll-padding-top: 5rem`); repeat it as a `link` beside the `plates` Reserve button.
- If `fullMenuUrl` is a PDF: show a label-type "PDF" next to the link, open in a new tab, and keep `/menu` linked from
  the footer as the accessible HTML version. A PDF is never the only menu.
- `/menu` has its own single `<h1>` "Menu", `<h2>` per course, items as name, description, price in a two-column grid
  (price right-aligned, `tabular-nums`). Dietary notes are words ("Vegetarian"), not colour or icon only. One line near the
  top: "Placeholder — illustrative menu" while flagged. Allergy line (owner to confirm wording): "Please tell us about
  allergies when you reserve." End with the `menu-page` Reserve button.

## 4. Mobile-first navigation and booking accessibility

- Design at 375px first, then widen. Top bar height 4rem (never above 4.5rem so `scroll-padding-top: 5rem` clears it
  and WCAG 2.4.11 Focus Not Obscured holds). Contents: wordmark left; Reserve and menu button right; no overlap at 320px.
- Menu button: min 44x44, `aria-expanded`, `aria-controls="mobile-menu"`, accessible name toggles "Open menu" and
  "Close menu". Reserve and menu buttons are at least 8px apart.
- Overlay `#mobile-menu`: `role="dialog" aria-modal="true" aria-label="Menu"`, height `100dvh` (never `100vh`), rest of
  the page `inert`, focus trapped, Esc closes, focus returns to the menu button, page scroll locked, closes when any
  link is tapped. Link rows are serif, at least 56px tall. Reserve sits at the bottom, inside the thumb zone.
- Hero CTAs sit in the lower half of the first viewport on mobile. `min-height: 100svh`, so the browser toolbar never hides them.
- No hover-only information anywhere. Hover effects only inside `@media (hover:hover)`.
- No scroll-spy or active-section highlighting: it needs scroll listeners and adds flicker without value.
- `ReserveButton` is a real `<a>` or `<button>`, never a `<div>`. Visible focus: 2px `--color-accent` outline, 3px offset
  (`--color-bone` on dark).

## 5. Storytelling: atmosphere, ingredients, dining experience

`#story` (02) carries exactly three beats, in this order, each with one image from the registry:

| Beat | Answers | Slot | Lead with |
|---|---|---|---|
| Atmosphere | What does the room feel like | `story-interior` | light, material, sound |
| Ingredients | What is on the board | `story-ingredients` | one named ingredient, one technique |
| Dining experience | How does an evening run | `story-table` | sharing, pacing, the first pour |

- Hands or backs only for people (`story-chef`; no named chef, no posed smile). Prose is at most 120 words in total,
  at most 45 per beat, measure 34rem, `--text-body`. No CTA inside `#story`; the section is allowed to breathe.
- `#atmosphere` (04): at least 5 of the 7 slots, each with a label-type caption ("The first pour") plus specific alt text
  describing the scene. The caption is never a copy of the alt. No autoplay carousel, no lightbox, no auto-advancing anything.
- Every sentence names a sensory fact (fire, steam, citrus, linen, stone). Delete any sentence that could describe another restaurant.

## 6. Signature dish presentation

- Four plates in `#menu` (03): `dish-black-cod` (4:5), `dish-duck` (3:2), `dish-dumplings` (1:1), `dish-cheesecake` (4:5).
  Alternate image side and size from plate to plate. No cards, no boxes, no shadows; images radius 0.
- Per plate, in order: index "01", `<h3>` name (`--text-display-sm`), description of at most 20 words that opens with the main
  ingredient and technique, price only when `dishes.ts` has one (never a zero price, never "TBC", never an invented currency).
- Description is always visible. Never hide it behind hover or a tap. Never truncate it with an ellipsis.
- "Placeholder — illustrative dishes" appears once in the section header, from `isPlaceholder`. Not per card, not on every price.
- Dishes are not a shop: no "Add to order", no quantity, no badges like "Bestseller", "Chef's pick" or "Popular".

| Do | Don't |
|---|---|
| "Black cod, miso glaze, charred lime." | "Our world-famous, must-try black cod!" |

## 7. Location, opening hours, directions and contact

`#visit` (06) order on mobile: heading, hours, address, contact, Get Directions + Reserve, map. Visitors scan this section
for facts, so use plain text, `--color-muted-strong` or `--color-ink`, never `--color-muted`.

- **Hours:** heading "Temporary opening hours" while `hours.confirmed` is false. Always seven rows, full day names; a
  closed day reads "Closed". Use an en dash and one time format everywhere (for example `17:30–22:30`). Use `<dl>` or `<table>`
  with a caption, so assistive tech reads day then time.
- **No "Open now" badge** until hours are confirmed and a timezone is configured. Then compute it in the restaurant's
  timezone with `Intl.DateTimeFormat`, after mount, to avoid a hydration mismatch.
- **Address, phone, email:** states in section 9. Phone link text is the number itself; email link text is the address.
  Never icon-only. Each tappable row is at least 44px tall.
- **Directions:** "Get Directions" uses `site.location.mapsUrl` via `src/lib/directions.ts`, opens in a new tab and is
  announced as such. Never build a maps URL from the placeholder address text.
- **Map:** `MapPlaceholder` is `role="img"` with `aria-label="Abstract map graphic. Location to be confirmed."` and a
  visible caption. With `embedUrl` set: `<iframe title="Map showing TINMO" loading="lazy">` in a fixed `aspect-ratio` box,
  at most `70svh` tall, placed below the buttons so a thumb can scroll past it and Get Directions stays above it.
- The same data objects feed the footer, the dialog and JSON-LD. Flip a `confirmed` flag once and all four update.

## 8. Reviews and social proof

`#reviews` (05) is titled "Guest notes". It renders what `src/lib/reviews.ts` `getReviews()` returns, nothing else.

| `ReviewSource.kind` | Allowed | Required label |
|---|---|---|
| `illustrative` | Short unnamed quotes (at most 40 words) | "Illustrative guest notes — not real reviews", always visible |
| `manual` | Quote plus a name only as supplied and permitted | Source line, e.g. "Shared with TINMO" |
| `google` | Rating text and quotes from the authorised API | Link to `listingUrl`; Google branding only after a real listing exists |

- Stars or numeric ratings only when a verified `rating` exists, written as text ("4.8 out of 5"). A count only with a verified count.
- No logo walls, "as seen in", award badges, press quotes, visitor counters, or fake social posts until confirmed.
- Social proof available now is honest by design: the Instagram placeholder (section 9) and the guest notes. Nothing else.
- Empty `Review[]` hides the whole section and its footer link. No empty frame, no apology text.

## 9. Placeholder and honesty UX

Unconfirmed facts are labelled in label type (0.75rem, uppercase, `--color-muted-strong`) and the label disappears when the
flag flips. Nothing is ever invented: address, phone, email, hours as real, reviews, ratings, counts, names, handle, awards, chef, year.

| Item | Unconfigured state | Configured state |
|---|---|---|
| Address | "Address to be confirmed" (text) | Real address text; JSON-LD address added |
| Phone | "Phone number to be added" | `<a href="tel:…">`, link text is the number |
| Email | "Email address to be added" | `<a href="mailto:…">`, link text is the address |
| Directions | `aria-disabled="true"` control "Get Directions" plus visible note "Directions will be available once the address is confirmed." | Real link to `mapsUrl` |
| Instagram | Text "Instagram — link to be added" (not an anchor) | Anchor to `instagram.url` |
| Dishes | "Placeholder — illustrative dishes" | No label |
| Guest notes | "Illustrative guest notes — not real reviews" | Source line |

- Disabled-but-explained means `aria-disabled="true"` plus `aria-describedby` pointing at the visible note, with no click
  handler. Do not use the `disabled` attribute: it removes the control from tab order and hides the reason. Style: 1px
  `--color-line` border, `--color-muted-strong` text, `cursor: not-allowed`.
- No `href="#"`, no `tel:` or `mailto:` with an empty value, no dead link, no `console.log`.
- `robots` stays `noindex` until `NEXT_PUBLIC_SITE_URL` exists. The placeholder site must not be indexed.

## 10. Loading, empty and error states

| Condition | The visitor sees | Implementation hook | How to verify |
|---|---|---|---|
| Hero video errors or 404s | Poster still, no control, hero text and CTAs unmoved | `HeroVideo` `onError` unmounts `<video>` and the control | Playwright `route("**/*.mp4", r => r.abort())` |
| Autoplay blocked | Poster and a control in Play state | Catch the `play()` rejection | Emulate low-power or reject the promise |
| Reduced motion or `Save-Data` | Poster only; control reads "Play background video" (opt-in) | `matchMedia`, `navigator.connection?.saveData` | `reducedMotion: "reduce"` |
| Image fails | `--color-stone` panel in the asset's average colour, small label, same aspect ratio | `MediaImage` `onError` fallback; alt moves to `role="img" aria-label` | Abort `**/media/**`; CLS stays about 0 |
| Image slow | Blur placeholder, then sharp | `placeholder="blur"` from `media.ts` | Throttle to Slow 4G |
| Fonts slow | Fallback with adjusted metrics, then swap | `next/font` `display: "swap"` | Throttle; no visible reflow jump |
| Map not configured | `MapPlaceholder`, caption "Map to follow — address to be confirmed", disabled Get Directions | `site.location.mapsUrl === null` | Default content state |
| Booking not connected | Native dialog (section 2) | `reservation.url` missing or not `https:` | Default content state |
| Phone, email or Instagram unset | Plain-text placeholders (section 9) | Conditional render | Default content state |
| Reviews empty | `#reviews` absent | `reviews.length === 0` | Pass `[]` |
| JS disabled | Everything visible, anchors scroll, Reserve works as `<a href="/#reserve">`, links visible without the overlay (`<noscript>` row under the top bar) | `motion-ok` is set only by the inline head script | Playwright `javaScriptEnabled: false` |
| 404 | `not-found.tsx` inside the normal layout: "This page could not be found.", Back to TINMO, nav Reserve | Layout owns Navbar | Open `/nope` |

- No spinners, skeleton shimmer or looping loaders. The site is static; a looping loader is decorative motion.
- Reveal never hides focusable content. Use `opacity` and `transform` only, never `visibility:hidden`, and force the end state
  with `[data-reveal]:focus-within`.

## 11. Accessibility and usability baseline

- `<html lang="en-GB">`; skip link is the first focusable element and targets `<main id="main" tabindex="-1">`.
- Targets at least 44x44px. Text 200% zoom and 320px reflow have no horizontal scroll; never set `user-scalable=no`.
- Small text uses `--color-muted-strong` (about 6.2:1); `--color-muted` only for decoration or 24px and up. Text on photos has a scrim for 4.5:1.
- State is never colour alone: open or closed is a word; links are underlined on hover and focus; disabled has an explanation.
- Link text is unique and descriptive. Never "click here" or "learn more". Decorative arrows are `aria-hidden`.
- Button borders carry the shape, so the interface survives `forced-colors: active`; wipe fills are decoration only.
- Hero video is `aria-hidden`, muted, has no audio track, and has a labelled pause/play control (WCAG 2.2.2).
- Do not build a booking form until a reservation backend is chosen. A form that submits nowhere is a fake interaction.
- Targets: mobile Lighthouse Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+; CLS about 0.

## 12. Acceptance criteria

### First-time mobile visitor (375x812, start at `/`, count taps)

| Goal | Taps | Path |
|---|---|---|
| Reserve | 1 | Top-bar Reserve, then link or dialog |
| Know what TINMO is | 0 | Hero label, tagline and h1 context |
| See the signature plates | 1 | Explore the Menu, or menu button then Menu (2) |
| Open the full menu | 2 | Explore the Menu, then View Full Menu (in view on arrival) |
| Find the hours | 2 | Menu button, then Visit; hours already on screen |
| Get directions or call | 3 | Menu button, Visit, then Get Directions or the number (or the explained disabled state) |
| Return from `/menu` to a home section | 2 | Menu button, then the `/#visit` style link |

### Per section

- `#top` 01: first viewport has wordmark, cuisine label, tagline, Reserve and Explore the Menu, no scroll, at 375x667 and 360x640. Video failure moves nothing.
- `#story` 02: three beats, 120 words or fewer, no CTA, each beat has an image with specific alt.
- `#menu` 03: four plates with visible descriptions, one placeholder label, View Full Menu in the header row, `plates` Reserve at the end.
- `#atmosphere` 04: 5 or more captioned images, no autoplay, no horizontal overflow at 375.
- `#reviews` 05: label always visible while illustrative, no stars, names or counts; absent when empty.
- `#visit` 06: seven hour rows, address, phone, email, Get Directions, map or placeholder, `visit` Reserve, all within one scroll of the heading.
- `#reserve` 07: one headline, one `primary` button, one factual line, no phone or email clutter.
- Footer 08: wordmark, links, address, phone, email, hours summary, Instagram state; no Reserve button.
- Count test: `document.querySelectorAll("[data-reserve-cta]").length === 6` on `/`.

## 13. Microcopy

| Label | Use | Goes to |
|---|---|---|
| Reserve a Table | Every Reserve control (top bar shows "Reserve") | `site.reservation` link or dialog |
| Explore the Menu | Hero secondary | `/#menu` |
| View Full Menu | `#menu` header and after the plates | `menu.fullMenuUrl ?? "/menu"` |
| Get Directions | `#visit` | `site.location.mapsUrl`, else disabled with note |
| Close | Dialog, mobile menu | Closes |

- Verbs: Reserve, Explore, View, Get. Title Case for button labels; sentence case for headings. Uppercase comes from CSS, not typed text.
- Never: Book Now, Order Now, Grab a Table, Secure Your Spot, Learn More, Click Here, Submit, Sign Up.
- Sentences of 14 words or fewer, sensory and understated, lead with ingredient, fire, season or table. No exclamation marks.
- Honest status copy states facts: "Online booking is not connected yet." Not "Coming soon!" and not "Almost there".
- Reassurance is a fact from data ("Booking opens in a new tab."), never a promise the owner has not confirmed.

## Before you ship a change

- [ ] Six `[data-reserve-cta]` on `/`; Reserve visible or one tap away at 375, 430, 768, 1024, 1440, 1920.
- [ ] Never two `primary` buttons in one frame (scroll in 100px steps at 375x812 and 1440x900).
- [ ] No countdown, scarcity, popup, sticky bar, discount word, or banned word (grep your diff for the lists above).
- [ ] Every unconfirmed fact is flagged in data, labelled in the UI, and not an anchor; `placeholder` flags still drive the labels.
- [ ] Tab through the page: skip link first, visible focus everywhere, mobile menu traps focus and restores it, Esc closes the dialog.
- [ ] Throttled and degraded runs pass: video aborted, images aborted, `javaScriptEnabled: false`, `reducedMotion: "reduce"`.
- [ ] Menu reachable in at most 2 taps; hours, address and contact reachable in at most 2 taps from the menu button.
- [ ] Copy is British English, has no exclamation marks, and every label matches section 13.
- [ ] `npm run lint` and `npm run build` pass; no `any`, no `href="#"`, no `console.log`.
