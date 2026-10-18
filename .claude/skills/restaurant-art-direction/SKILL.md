---
name: restaurant-art-direction
description: Art-direction rulebook for the TINMO Asian fusion restaurant site — palette, type, shape language, photography, section-by-section composition and an AI-slop blacklist. Use whenever you design, style, write copy for, source imagery for, or review any TINMO page, section or component.
---

# TINMO art direction

Tokens, motion and engineering live in the shared brief; this skill turns them into taste decisions. Copy is British English ("flavours"), identifiers are US (`color`). If code and this file disagree, fix the code.

## 1. Brand frame and editorial principles
TINMO reads as a monograph for an independent restaurant, not a template. Borrow *moves* from high-end independent restaurants, boutique-hotel brochures and contemporary hospitality identities — never their layouts, wording or photographs.

| Borrowed move | TINMO implementation |
|---|---|
| Menu-card typography: name left, price right, hairline between | Plates rows `border-t border-line`, tabular price; `/menu` is pure type, no images |
| Hotel-brochure full-bleed frame with a margin caption | `atmo-steam` strip edge to edge, `04.n` caption below in column 1 |
| One wordmark, one reservation action | Hero = wordmark + Reserve; every Reserve button is the same `ReserveButton` |
| Editorial folio / index | `NN — Label` eyebrow on every section; `03.n` dish index |
| Monograph pacing: a dense spread, then a quiet one | Atmosphere (dense collage) → Guest notes (0.8x padding, text only) |
| Gallery hang: unequal frames, deliberate gaps | Atmosphere collage with unequal spans and drops, never a uniform grid |

Principles (imperatives):
1. **One idea per viewport.** In any 100svh window at 1440 show at most one headline, one paragraph (measure 34rem) and two images.
2. **Scale contrast >= 6x** between the largest and smallest type in view (`text-display-lg` over `text-label`).
3. **Typography is the ornament.** Indices, captions, hairlines and tabular prices replace icons, badges and cards.
4. **Images are the content.** Unboxed, radius 0, no shadow, no border, no overlay chrome. No photograph narrower than 3 grid columns on desktop.
5. **Restraint is the luxury cue.** If an element can go without losing meaning, remove it. Max 2 families, 4 type roles and 1 static accent use per viewport.
6. **Hospitality warmth.** Lead with ingredient, fire, season, table. People appear as hands, backs, silhouettes.
7. **Allocated whitespace.** Empty space is placed on purpose (section 6), never left over.

## 2. Palette and ratios
Use tokens only (`bg-paper`, `bg-stone`, `bg-ink`, `bg-ink-soft`, `text-muted-strong`, `border-line`, `text-accent`, `text-bone`). Warm neutrals only — no `#000`, `#fff`, `gray-*`, `slate-*`.

| Token | Hex | Share | Use | Never |
|---|---|---|---|---|
| `--color-paper` | `#F8F7F3` | ~45% | page ground: Story, Atmosphere, Visit | pure-white cards on it |
| `--color-stone` | `#F0EEE8` | ~25% | alternate ground: Plates, Guest notes; image placeholders | a card sitting on paper |
| `--color-ink` | `#20211E` | ~20% | Hero, Reservation CTA, Footer; primary text | any other section (exactly three ink sections) |
| imagery | — | ~10% | full-bleed hero video, CTA photo, atmosphere strip; the colour on the page | boxed, framed, CSS-tinted |
| `--color-ink-soft` | `#2B2C28` | inside ink | raised dark surface: mobile-menu overlay, panels sitting on an ink section | page-level section ground |
| `--color-bone` | `#EFEBE0` | text | all text on ink and photos; secondary on ink = bone at 72% (>= 7:1) | text on paper |
| `--color-muted-strong` | `#5E5D57` | text | every small secondary text: captions, labels, descriptions (~6.2:1 on paper) | — |
| `--color-muted` | `#77766F` | text | decorative or >= 24px only (4.3:1 fails AA small) | labels, captions, body |
| `--color-line` | `#DFDDD5` | hairlines | 1px dividers/borders (on ink: `rgba(239,235,224,0.16)`) | 2px rules, coloured rules |
| `--color-accent` | `#8B4935` | <= 2% | the budget below | on ink (fails contrast), washes, fills, backgrounds |
| `--color-accent-deep` | `#6E3727` | interaction | hover/pressed of accent | static use |

Paper + stone ~70%, ink ~20% (hero ~900 + CTA ~810 + footer ~900 of ~12,600px at 1440), imagery the rest, accent a rounding error.
- **Surface order is fixed:** 01 ink · 02 paper · 03 stone · 04 paper · 05 stone · 06 paper · 07 ink · 08 ink. Joins are hard cuts plus a 1px hairline; no waves, diagonals or fades between sections.
- **Accent budget (static):** exactly one italic word (the Story `h2` `<em>`) and one 3rem x 1px rule (above the lead Guest note). Everything else is interaction only: link hover, focus ring (2px, 3px offset; `--color-bone` on ink), pressed states.
- **No gradients** except functional scrims, defined once in `globals.css` and reused:
```css
.scrim-bottom { background: linear-gradient(to top, rgba(32,33,30,.78) 0%, rgba(32,33,30,.38) 40%, rgba(32,33,30,0) 72%); }
.scrim-top    { background: linear-gradient(to bottom, rgba(32,33,30,.45), rgba(32,33,30,0) 22%); } /* nav legibility */
.scrim-flat   { background: rgba(32,33,30,.45); }
```
Check text over photos by sampling the brightest pixel inside the text box: contrast against bone must be >= 4.5:1.
- No hex literals or `rgba()` in components; scrims and the on-ink hairline live in `globals.css` only.

## 3. Typography system
**Serif speaks, sans organises.** Fraunces (`--font-display`; axes `opsz` + `SOFT`; normal + italic) carries headlines, dish names, the lead paragraph and guest notes. Hanken Grotesk (`--font-sans`) carries body, labels, prices, nav and buttons. No third family; no Playfair, Cormorant or DM Serif (over-used); no mono, no script.

| Role | Class | Face / weight | Tracking | Leading | Notes |
|---|---|---|---|---|---|
| Hero wordmark | `text-display-xl` | Fraunces 300 | -0.02em | 0.95 | hero only; `"opsz" 144, "SOFT" 40` |
| Footer wordmark | `text-wordmark` | Fraunces 300 | -0.02em | 0.8 | footer only; fills viewport width |
| Section `h2` | `text-display-lg` | Fraunces 300–340 | -0.02em | 1.0 | <= 7 words, <= 3 lines at 375px |
| Secondary `h2` | `text-display-md` | Fraunces 300–340 | -0.02em | 1.02 | Plates, Atmosphere, Visit, Guest-note lead |
| `h3` | `text-display-sm` | Fraunces 340–380 | -0.015em | 1.05 | dish names, footer nav, overlay links |
| Lead | `text-lead` | Fraunces 300, `font-optical-sizing: auto` | -0.005em | 1.3 | one per section, <= 34rem |
| Body | `text-body` | Hanken 400 | 0 | 1.65 | `max-w-[34rem]`, `text-wrap: pretty` |
| Small | `text-small` | Hanken 400 | 0.01em | 1.5 | hours rows, legal |
| Label / eyebrow / caption / button | `text-label` | Hanken 500, uppercase | 0.18em | 1.4 | `text-muted-strong` (bone on ink) |
| Price | `text-small` | Hanken 500 | 0 | 1.4 | `tabular-nums` |

- Sizes come from tokens only: no `text-xs/sm/base/lg/xl/2xl+`, no `text-[..px]` in components. Only the two wordmarks are "xl".
- Fraunces never >= 500; Hanken never >= 600. Display variation settings come from one shared utility, never repeated inline.
- Headlines: sentence case, `text-wrap: balance`, left-aligned. No Title Case; no ALL CAPS except wordmarks and `text-label`.
- **Italic-emphasis rule:** at most one `<em>` per headline, one or two words, a sensory noun or verb, never the first word, never in `h3`, body or buttons, same weight as the roman. Only the Story `h2` em is accent-coloured; elsewhere it stays ink/bone.
```tsx
<h2 className="text-display-lg">Cooked over <em>fire</em></h2>            {/* DO: one em, not first word (example copy) */}
<h2 className="text-display-lg"><em>Welcome</em> to <em>TINMO</em></h2>   {/* DON'T: two ems, first word, banned phrase */}
```
- Never set paragraphs in Fraunces beyond the lead; never set headlines in Hanken; dish descriptions stay in Hanken.
- Fonts load via `next/font/google` with `display: "swap"`, adjusted fallback metrics, latin subset; CLS from font swap must read ~0.

## 4. Shape language
| Shape | CSS | Allowed | Limit |
|---|---|---|---|
| Rectangle (default) | `border-radius: 0` | every image, button, input, dialog, panel, map | everything not listed below |
| Arch | `border-radius: 999px 999px 0 0; overflow: hidden` | portrait 4:5 photographs only: Story `story-chef`, Atmosphere `atmo-pour` | **2 per page**; never in Hero, Plates, Visit or CTA |
| Circle | `rounded-full` | map pin (10–14px), 6px list bullets, one optional static seal <= 112px (1px outline, never filled, never rotating) | decorative details only; never an image crop, avatar or button |

- Implement the arch once (a `.shape-arch` utility or `shape="arch"` on `MediaImage`); never hand-roll radii. `rounded-sm/md/lg/xl/2xl/3xl` are banned.
- Buttons: rectangular, 1px border, `min-height: 48px`, padding `0 1.75rem`, `text-label`. Two variants only — `solid` (ink on light, bone on dark) and `outline` (1px `currentColor`). Hover wipe fills with the opposite surface colour; arrow nudges 4px. Never pills, shadows, gradients or accent fills.
- Inputs and the reservation `<dialog>`: radius 0, `bg-paper`, 1px `--color-line`, no shadow; `::backdrop` is flat `rgba(32,33,30,.6)`, no blur.

## 5. Texture and hairlines
- Texture is one static SVG-noise tile at 3–4% alpha multiplied into the ground. Define it once as `--texture-noise`; apply to `body` and the stone surface utility. Ink surfaces stay flat (photo grain supplies texture).
```css
body { background-color: var(--color-paper); background-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .13 0 0 0 0 .13 0 0 0 0 .12 0 0 0 .035 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
```
- No fixed overlays, no `mix-blend-mode` over content, no `filter`/`backdrop-filter` on viewport-sized elements, no grain video.
- Hairlines: 1px `--color-line`, one weight, one colour. No double, dotted or ornamental rules. Every section opens with `<Eyebrow>` = `NN — Label` (index, em dash, label in `text-label`) and a hairline running to the end of column 12 (`data-reveal="rule"`). Data rows (hours, prices, guest notes) are split by hairlines, never boxed.

## 6. Layout, negative space and asymmetry
- Grid: `grid grid-cols-6 md:grid-cols-12 gap-x-[calc(var(--gutter)/1.5)]` inside `Container` (`--content-max` 96rem, `--content-narrow` 64rem). Below `md` compose by hand: offset images (`col-span-4 col-start-3`), 2-up crops, staggered margins — never a stack of identical full-width boxes.
- **Whitespace quotas (desktop 1440):** every row leaves >= 1 of 12 columns empty; >= 35% of every viewport is bare ground; gap between content rows >= `calc(var(--section-y) * 0.4)`; eyebrow to `h2` 1.5rem; `h2` to lead/body 2.5rem; image to caption 0.75rem.
- **Asymmetry:** `text-center` and `mx-auto` on headings/paragraphs are forbidden (`mx-auto` lives only in `Container`). Text blocks start on column 1, 2 or 9. Images take unequal spans (4–8) and unequal ratios; no two adjacent images share both span and ratio.
- **Bleed:** Story, Plates, Atmosphere and Visit each have one image bleeding off a viewport edge (`-ml-[var(--gutter)]` / `-mr-[var(--gutter)]`), alternating left, right, left, right.
- **Uneven rhythm:** padding is Story `--section-y`, Plates 1.25x top / 0.75x bottom, Atmosphere `--section-y`, Guest notes 0.8x, Visit `--section-y`, CTA `min-h-[90svh]`.
- QA widths 375, 430, 768, 1024, 1440, 1920 (Tailwind defaults + `3xl`): no overflow, no clipped text, captions never overlap images.

**Adding or changing a section:** (1) pick a surface that differs from both neighbours; (2) start the headline on a different column from the previous `h2`; (3) choose spans from 4–8 and ratios from section 7 that differ from the neighbour; (4) allocate one empty column, one `md:mt-*` drop, one bleed; (5) reuse `Eyebrow`, `data-reveal` roles, caption pattern; (6) run section 12.

## 7. Photography, video and the tinmo grade
**Cinematic = one dominant warm light source, shallow depth, negative space inside the frame.** Immersive = table-height eye line (~1.1m), never wide-angle estate-agent interiors.
- Light: candle, window or flame; colour temperature feels 2700–3500K; blacks lifted slightly, never crushed; highlights unclipped; no HDR halos.
- Tone family: stone, ceramic, linen, charred timber, steam, ember. One warm accent in frame, near `--color-accent` (terracotta/ember). Reject cyan/magenta casts, neon, saturated reds and oranges.
- Subject <= 55% of frame on a thirds line, one calm side for a caption or scrim. Faces never centred; max one visible face per section. Alternate scale down the page: room · table · detail · room; never two same-scale shots adjacent.
- **Reject on sight:** stock smiles or cheers, visible third-party logos/text/watermarks, 12-dish flat-lays, bamboo/lanterns/red-gold props, crossed chopsticks on a bowl, over-saturation, cut-outs.
- **The grade:** run every photograph through `node scripts/optimize-image.mjs <in> <out-base> --width N --ratio W:H --position attention|fx,fy --quality 80`. Default `--grade tinmo` (saturation x0.93, R x1.015, B x0.97) is mandatory; `--grade none` only for colour-true images, with the reason in the `media.ts` note. Grade the hero poster the same way and match the video in transcode: `-vf "eq=saturation=0.93,colorchannelmixer=rr=1.015:bb=0.97"`.
- Output: WebP <= 2200px and <= 260KB; focal point in the `media.ts` registry applied as `object-position`; licence and source in `media.ts` and `public/media/CREDITS.md`. Alt text describes what is visible ("Hands pouring tea into a stoneware cup"), <= 125 characters; decorative images get `alt=""` + `aria-hidden`.

| Slot | Find | Frame and crop |
|---|---|---|
| `hero` | pour, flame or steam over charred timber or stone; 10–14s | lower-left calm and dark for the wordmark, subject upper-right, no faces |
| `story-interior` 3:2 | the room at dusk, candle or window light | table height, empty or silhouettes, one strong diagonal |
| `story-chef` 4:5 arch | hands or back of a cook at the pass | arch trims top corners: keep >= 18% headroom, subject on the vertical axis |
| `story-ingredients` 3:4 | raw produce on stone or linen, window light | one hero ingredient, the rest soft |
| `story-table` 16:10 | set table, hands passing a dish | calm third on the left |
| `dish-black-cod` 4:5 · `dish-duck` 3:2 · `dish-dumplings` 1:1 · `dish-cheesecake` 4:5 | one plate on ceramic or stone, 30–45° or table height | >= 25% empty ground around the plate, no garnish confetti, same tone family across all four |
| `atmo-pour` 4:5 arch · `atmo-bar` 3:2 · `atmo-detail` 1:1 · `atmo-kitchen` 4:5 · `atmo-table` 16:10 · `atmo-plating` 3:2 · `atmo-steam` 21:9 | motion mid-gesture (pour, steam); wide, medium and close alternating | ratios here are this skill's decision; keep faces out |
| `cta-evening` 21:9 | candlelit table at night | left 45% dark and quiet for the headline; survives `.scrim-flat` |

## 8. Captions, labels, voice and motion
- Captions use `text-label` (uppercase via CSS); store them sentence case in `src/content/*` ("The first pour"). Pattern `NN.n — Caption` on Story and Atmosphere ("04.3 — The first pour"): 1–5 words, no full stop, no superlatives. Caption sits 0.75rem under the image, aligned to its left edge, never inside it, never on a chip.
- Placeholder notes are label type with a leading em dash ("Placeholder — illustrative dishes"), always directly under the eyebrow row, right-aligned in columns 9–12, `text-muted-strong` (bone 72% on ink). They vanish when the data flag flips (`isPlaceholder`, `confirmed`); never hide them with `sr-only` or low contrast.
- Voice: short, sensory, understated; <= 16 words per sentence on average; one concrete noun per sentence; no adjective triplets; no exclamation marks. Banned: Welcome, best, authentic, world-class, exotic, oriental, zen, journey, discover, indulge, elevate, crafted with passion, nestled, tapestry, symphony, feast for the senses.
- Motion is part of the look, never decoration. One role per element type: headlines `data-reveal="mask-up"` (70ms word stagger), body `fade-up`, images `image` (blocks 120ms apart), rules `rule`, nav and captions `fade`. Use `--ease-out`; `--dur-base` 450ms for UI, `--dur-slow` 900ms for hover scale, `--dur-cine` 1400ms reserved for hero and CTA. Animate only `transform`, `opacity`, `clip-path`; no loops, bounce, parallax or magnetic effects.

## 9. Section-by-section cheat sheet
Spans are `md:` and up. Anchors and numbers: `#top` 01 · `#story` 02 · `#menu` 03 · `#atmosphere` 04 · `#reviews` 05 · `#visit` 06 · `#reserve` 07 · Footer 08.
```tsx
{/* 02 Story, row 1: headline 1–7, arch 9–12 dropped, lead hangs from column 2 */}
<div className="grid grid-cols-6 md:grid-cols-12 gap-x-[calc(var(--gutter)/1.5)]">
  <h2 className="col-span-6 md:col-span-7 text-display-lg">…<em className="text-accent">…</em></h2>
  <figure className="col-span-4 col-start-3 md:col-span-4 md:col-start-9 md:row-span-2 md:mt-24">{/* arch 4:5 */}</figure>
  <p className="col-span-6 md:col-span-5 md:col-start-2 text-lead">…</p>
</div>
```

**01 Hero (`#top`, ink).** Full-bleed video `min-h-[100svh]` (portrait 720x1280 source on mobile), graded poster, `.scrim-bottom` + `.scrim-top`. The top 50% holds no text except nav — the footage is the negative space. Wordmark `text-display-xl` bone, bottom-left, flush to the gutter. Tagline `text-lead` bone, columns 8–12, `max-w-[20rem]`, above the wordmark's right half, under a `01 — Asian fusion` eyebrow with hairline; `solid` Reserve + `outline` View menu below it. 44x44 square pause/play (1px bone border) bottom-right. Mobile: wordmark, tagline, buttons all left-aligned. Nothing centred; no scroll cue.

**02 Story (`#story`, paper).** Recipe above. Then `story-interior` 3:2 columns 1–8 bleeding off the left edge, body paragraph columns 9–12 `self-end` so it bottom-aligns with the image. Closing pair: `story-ingredients` 3:4 columns 3–5 and `story-table` 16:10 columns 7–12 dropped `md:mt-32`; columns 1–2 and 6 stay empty. Mobile: arch at 72% width right-aligned, interior full-bleed left, ingredients + table as a `grid-cols-[5fr_7fr]` 2-up with the table dropped 2.5rem.

**03 Signature plates (`#menu`, stone).** `h2` `text-display-md` columns 1–5; placeholder note columns 9–12 bottom-aligned to it. Four dishes zig-zag with four spans and four ratios: `dish-black-cod` 4:5 columns 1–5; `dish-duck` 3:2 columns 7–12 (bleeds right) dropped `md:mt-48`; `dish-dumplings` 1:1 columns 2–5; `dish-cheesecake` 4:5 columns 8–11 dropped `md:mt-24`. Each dish = unboxed image, `h3` `text-display-sm`, Hanken description <= 26rem, then `flex justify-between border-t border-line pt-3` with `03.n` and a tabular price. No cards, icons or tags. Close with a "View full menu" text link, columns 8–12, hairline above.

**04 Atmosphere (`#atmosphere`, paper).** A collage, not a masonry. Row 1: `h2` `text-display-md` columns 1–6; arch `atmo-pour` 4:5 columns 9–12. Row 2: `atmo-bar` 3:2 columns 1–8 (bleeds left); `atmo-detail` 1:1 columns 10–12, bottom-aligned. Row 3: `atmo-kitchen` 4:5 columns 2–5; `atmo-table` 16:10 columns 6–12 dropped `md:mt-40`. Row 4: `atmo-plating` 3:2 columns 5–10, then `atmo-steam` 21:9 full-bleed as the closing strip. Every image has a `04.n` caption; row gaps vary between 0.4x and 0.8x `--section-y`. Mobile: 2-up crops (`grid-cols-[1fr_1.4fr]`) alternating with 78%-width images that switch sides.

**05 Guest notes (`#reviews`, stone).** The quiet beat: 0.8x padding, text only. "Illustrative guest notes — not real reviews" sits in the placeholder-note slot. Accent 3rem x 1px rule, then the lead note in Fraunces roman `text-display-md`, columns 1–8, no quote-mark glyph. Remaining notes in columns 9–12 as hairline-separated rows in `text-body`, attribution in `text-label` ("Guest note — illustrative"). No avatars, names, stars or counts unless a verified `rating` exists. No carousel, no three equal cards.

**06 Visit (`#visit`, paper).** `h2` `text-display-md` columns 1–5; beneath it a `<dl>` (`text-label` terms, `text-body` values: address, phone, email placeholders from the brief), then "Temporary opening hours" as 3rem rows split by hairlines, `tabular-nums`, with its placeholder note. `MapPlaceholder` columns 7–12 bleeding right, 4:5 on stone with 1px `--color-line`/ink strokes and one 12px circle pin; no real geography. tel/mailto/maps render only when configured; targets >= 44px.

**07 Reservation CTA (`#reserve`, ink).** `cta-evening` full-bleed, `min-h-[90svh]`, `.scrim-flat` + `.scrim-bottom`, top 40% image only. `h2` `text-display-lg` bone, columns 1–8, anchored low-left, one italic word; `solid` bone `ReserveButton` below in columns 1–4; one `text-small` line (phone placeholder) columns 9–12, bottom-aligned. No arch, no form, no countdown, no "limited tables".

**08 Footer (ink).** 1px `rgba(239,235,224,0.16)` hairline from 07. Row 1: columns 1–4 address/hours placeholders, columns 6–8 nav in `text-display-sm`, columns 10–12 contact and "Instagram — link to be added" as plain text. Row 2: legal in `text-small`. Row 3: `text-wordmark` TINMO in bone, flush left, `leading-[0.8]`, filling the viewport width. No newsletter form unless it works.

**Chrome.** Nav: `text-label` links, small Fraunces wordmark, `outline` Reserve (no pill), transparent over hero then solid `bg-paper` + hairline. Mobile menu: full-screen `bg-ink-soft` overlay, links in `text-display-sm`, left-aligned. `/menu`: columns 1–5 category `h2`s, columns 7–12 dish rows (name serif, price tabular, hairlines), no images.

## 10. What binds the sections
1. `Eyebrow` `NN — Label` + hairline opens every section, in the same position.
2. One 12-column grid; text starts on column 1, 2 or 9; at least one empty column per row.
3. One image treatment: radius 0, `data-reveal="image"`, tinmo grade, `NN.n` caption.
4. The arch appears exactly twice, both portrait 4:5 in columns 9–12 (Story, Atmosphere) — a deliberate echo.
5. Fixed surface order (section 2) with hard-cut + hairline joins.
6. At most one headline em per section; one button pair (`solid`/`outline`); one link underline-draw.
7. Placeholder notes always in the same slot and style.
8. What varies: alignment side, scale, density, bleed side, vertical padding. What never varies: tokens, radius, hairline, type roles, grade.

## 11. AI-slop blacklist
| Banned | TINMO alternative |
|---|---|
| Centred hero + three equal cards (`grid-cols-3`) | Left-anchored wordmark hero; unequal spans (4–8) and ratios; recipes in section 9 |
| Gradient blobs, mesh, aurora, gradient text, glow borders | Flat ink/paper/stone plus photography; gradients only as `.scrim-*` |
| Glassmorphism (`backdrop-blur`, translucent white panels) | Nav turns solid `bg-paper` + hairline; dialog solid; flat `::backdrop` |
| `rounded-2xl` on everything | Radius 0; two arches per page; circle details only |
| `shadow-xl`, floating soft cards | 1px `border-line`, a paper-to-stone tone shift, or whitespace |
| Purple/blue/neon SaaS palette, `slate`/`gray` | Warm paper/stone/ink + terracotta accent <= 2% |
| Inter/Geist/system sans for everything; Playfair + Inter | Fraunces display + Hanken Grotesk, roles in section 3 |
| Emoji or icon-in-circle feature rows | Text indices, em-dash rules, hairlines; SVG only for functional arrow/close/pause, 1.5px stroke |
| "Welcome to TINMO", "Discover", "Our Story/Our Menu" headings | One sensory sentence led by ingredient, fire, season or table; specific headings |
| Identical section rhythm (centred `h2` + paragraph + grid, same padding) | Uneven padding, alternating alignment and bleed, varied density |
| Lorem-style or filler copy ("passion for food", "crafted with love") | Concrete noun + verb, short; flagged placeholder until the owner confirms; never lorem ipsum |
| Stock smiles, cheers, people staring at the camera | Hands, backs, silhouettes, table-height details |
| "Scroll to explore", bouncing chevrons, marquees, cursor followers, parallax, tilt | Nothing: the hero is the invitation; motion only reveals, once |
| Pill buttons, gradient CTAs | Rectangular 1px-border buttons, fill wipe |
| Fake social proof: star rows, "10,000 guests", "as seen in" logos | "Illustrative guest notes — not real reviews"; stars only for a verified rating |
| Orientalist clichés: bamboo, red-and-gold, chopsticks, dragons, waves, lanterns, blossom, brush fonts, decorative CJK | Ingredient, technique, restraint; arch/rectangle geometry; stone, ceramic, linen, charred timber |

## 12. Before you ship a change
- [ ] Tokens only: `rg -n "#[0-9a-fA-F]{6}|(text|bg|border)-(black|white|gray|slate|zinc|neutral|purple|violet|indigo|blue)" src/components` returns nothing.
- [ ] Shape and surface bans: `rg -n "rounded-(sm|md|lg|xl|2xl|3xl)|shadow-|backdrop-|bg-(linear|radial|conic|gradient)|blur-|text-center|grid-cols-3" src/components src/app` returns only intended hits (scrim utilities, `rounded-full` circle details); any other hit is a bug.
- [ ] Type: `rg -n "\btext-(xs|sm|base|lg|xl|[2-9]xl)\b|text-\[" src/components` returns nothing; exactly one `<h1>`; <= 1 `<em>` per headline; Fraunces weight <= 380.
- [ ] Accent: static `text-accent|bg-accent|border-accent` appears at most twice (Story em, Guest-note rule).
- [ ] Arches on the page <= 2; ink sections are exactly 01, 07, 08.
- [ ] Every new photo passed `optimize-image.mjs` with the tinmo grade, <= 260KB, and has alt text, focal point, licence and an `NN.n` caption.
- [ ] Copy: `rg -n -i "welcome|authentic|world-class|\bbest\b|journey|discover|indulge" src/content` returns nothing; no exclamation marks; British spelling.
- [ ] Every unconfirmed fact carries its visible placeholder note; no invented address, phone, hours, reviewer, rating or award.
- [ ] Checked at 375, 430, 768, 1024, 1440, 1920: no overflow, unequal spans, an empty column present; reduced motion resolves everything instantly.
- [ ] Squint test: shrink the full-page screenshot to 400px wide — you should see alternating ground, large photographs, one wordmark, almost no UI.
