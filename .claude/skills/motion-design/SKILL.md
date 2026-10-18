---
name: motion-design
description: Use when adding, changing or reviewing any animation on the TINMO restaurant site - scroll reveals, hero entrance, hover states, navigation and mobile menu, image treatments, section transitions or smooth scroll. Defines the motion tokens, the data-reveal contract, reference CSS/TypeScript and the performance and reduced-motion rules.
---

# TINMO motion design

Motion is candlelight, not a light show: it tells the eye what to read next, then gets out of the way. Values come from the shared brief (section 5); this file is how they are implemented. If a component disagrees with this file, fix the component.

## 1. Restraint rules
- The vocabulary is closed: fade, 12px rise, word mask-up, image clip + scale settle, hairline draw, button fill wipe, link underline draw. Anything else needs owner sign-off.
- Banned, reject in review: parallax (except the hero drift in section 9), bounce/spring/overshoot easings (any cubic-bezier with y outside 0-1), looping or ambient motion, cursor followers, magnetic or tilting buttons, scroll hijack or snap, marquees, counters, typewriter/scramble text, blur-in, animated shadows or `filter`, sliding page transitions, preloaders, Ken Burns, auto-rotating carousels.
- Each element reveals once. Nothing re-hides on scroll-out; no exit animations.
- No `--d` above 600ms. No element's own transition exceeds 900ms except `image` (1200/1600ms) and `rule` (`--dur-cine`).
- Never delay information: hours, address, prices and Reserve buttons use `fade`/`fade-up` with `--d` <= 180ms.
- If removing an animation makes the page no harder to read or less calm, remove it.

## 2. Tokens (`:root` in `globals.css`; never hard-code these values elsewhere)
| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | every entrance and hover (default) |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | symmetrical moves: rule draw, menu close |
| `--dur-fast` | `180ms` | colour flips, reduced-motion overlay fade |
| `--dur-base` | `450ms` | button wipe, arrow nudge, nav panel, menu links |
| `--dur-slow` | `900ms` | word/letter mask-up, image hover zoom |
| `--dur-cine` | `1400ms` | hairline rule draw |
| `--stagger` | `70ms` | step between words; blocks use 120ms via `delay={i * 120}`; hero letters 90ms |
Recipe literals (allowed only inside the motion block of `globals.css`): fade/fade-up 700ms and 12px; image clip 1200ms; image inner scale 1.12 to 1 over 1600ms; link underline 350ms; menu open 500ms / close 350ms; hero nav 600ms; hero curtain 1200ms.

## 3. The reveal contract (attribute-driven)
| Hook | Meaning |
|---|---|
| `data-reveal="fade-up"` | opacity 0 to 1 + `translateY(12px)` to 0, 700ms. Body copy, lists, CTAs |
| `data-reveal="fade"` | opacity only, 700ms. Eyebrows, captions, footer links |
| `data-reveal="mask-up"` | on a headline; words are `.w > span`, slide `translateY(110%)` to 0, `--dur-slow`, delay = the word's own `--d` |
| `data-reveal="image"` | wrapper clips `inset(0 0 100% 0)` to `inset(0)` 1200ms; `.media-scale` child scales 1.12 to 1 over 1600ms; `data-from="left"` clips from the left |
| `data-reveal="rule"` | hairline `scaleX(0)` to 1 from the left, `--dur-cine`, `--ease-in-out` |
| `--d` / `--t` | inline delay `style={{ "--d": "180ms" }}` / optional duration override (hero only) |
| `data-in` | added only by the shared observer (or at once when the gate is closed). Never render it from JSX or state |
| `html.motion-ok` | added by the head script only for `prefers-reduced-motion: no-preference`; the only thing that can hide content |

Rules:
1. Hidden states exist only as `html.motion-ok [data-reveal]:not([data-in])` inside `@media (prefers-reduced-motion: no-preference)`. No other `opacity: 0`, `invisible` or `translate-*` utilities for reveals.
2. Never put `data-reveal` on an interactive element (its transition would overwrite the hover transition). Wrap it: `<Reveal kind="fade-up"><ReserveButton /></Reveal>`.
3. Never combine `data-reveal` with Tailwind `transition-*`, `duration-*`, `delay-*`, `opacity-*`, `translate-*`. The motion CSS sits in `globals.css` outside `@layer` so it wins.
4. Never put `data-reveal` on a node taller than 1.5 viewports (the 0.15 threshold may never be met); reveal its children.
5. State styles live outside the motion media query, `transition`/`animation` inside it, so reduced-motion users still get instant hover states.
6. `--d-scale` is 0 below `md` and 1 from 768px: stacked single-column items do not wait for siblings that are off screen. Word delays are not scaled.
7. Never import constants from `Reveal.tsx` into a Server Component (exports of a `"use client"` file are references, not values). Constants are duplicated where needed.

Gate script, in `layout.tsx` `<head>` (the root `<html>` has `suppressHydrationWarning` and `data-scroll-behavior="smooth"`). The failsafe guarantees content is never hidden more than 4s if hydration fails:
```tsx
const MOTION_GATE = `(function(){var d=document.documentElement;if(!matchMedia("(prefers-reduced-motion: no-preference)").matches)return;d.classList.add("motion-ok");setTimeout(function(){if(!d.hasAttribute("data-motion-ready")){d.classList.remove("motion-ok");d.setAttribute("data-motion-failsafe","")}},4000)})()`;
<script dangerouslySetInnerHTML={{ __html: MOTION_GATE }} />
```

## 4. Reference CSS (motion block of `globals.css`)
```css
:root { --ease-out: cubic-bezier(0.22, 1, 0.36, 1); --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-fast: 180ms; --dur-base: 450ms; --dur-slow: 900ms; --dur-cine: 1400ms; --stagger: 70ms; --d-scale: 0; }
@media (min-width: 768px) { :root { --d-scale: 1; } }
html { scroll-padding-top: 5rem; scrollbar-gutter: stable; }
.w { display: inline-block; overflow: hidden; vertical-align: top; padding: .14em .05em; margin: -.14em -.05em; } /* room for descenders + italic overhang, same box in every state */
.w > span { display: inline-block; }
.media-scale { position: absolute; inset: 0; }
.rule { height: 1px; margin: 0; border: 0; background: var(--color-line); transform-origin: left center; }
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
  html.motion-ok [data-reveal] { --dd: calc(var(--d, 0ms) * var(--d-scale)); }
  /* fade-up, fade */
  html.motion-ok :is([data-reveal="fade-up"], [data-reveal="fade"]) { transition: opacity 700ms var(--ease-out) var(--dd), transform 700ms var(--ease-out) var(--dd); }
  html.motion-ok [data-reveal="fade-up"]:not([data-in]) { opacity: 0; transform: translateY(12px); }
  html.motion-ok [data-reveal="fade"]:not([data-in]) { opacity: 0; }
  /* mask-up words */
  html.motion-ok [data-reveal="mask-up"] .w > span { transition: transform var(--dur-slow) var(--ease-out) var(--d, 0ms); }
  html.motion-ok [data-reveal="mask-up"]:not([data-in]) .w > span { transform: translateY(110%); }
  /* image: clip on the wrapper, scale settle on .media-scale (explicit inset(0): clip-path cannot interpolate to `none`) */
  html.motion-ok [data-reveal="image"] { clip-path: inset(0); transition: clip-path 1200ms var(--ease-out) var(--dd); }
  html.motion-ok [data-reveal="image"] .media-scale { transition: transform 1600ms var(--ease-out) var(--dd); }
  html.motion-ok [data-reveal="image"]:not([data-in]) { clip-path: inset(0 0 100% 0); }
  html.motion-ok [data-reveal="image"][data-from="left"]:not([data-in]) { clip-path: inset(0 100% 0 0); }
  html.motion-ok [data-reveal="image"]:not([data-in]) .media-scale { transform: scale(1.12); }
  /* rule draw */
  html.motion-ok [data-reveal="rule"] { transition: transform var(--dur-cine) var(--ease-in-out) var(--dd); }
  html.motion-ok [data-reveal="rule"]:not([data-in]) { transform: scaleX(0); }
  /* hover zoom: only on .media--zoom (gallery, plates), only with a real pointer */
  @media (hover: hover) { .media--zoom .media-scale img { transition: transform var(--dur-slow) var(--ease-out); } .media--zoom:hover .media-scale img { transform: scale(1.04); } }
}
@media print { [data-reveal], [data-reveal] .w > span, [data-reveal] .media-scale, [data-hero], [data-hero] > span { opacity: 1 !important; transform: none !important; clip-path: none !important; transition: none !important; animation: none !important; } .hero-curtain { display: none !important; } }
```
Image markup (inside `MediaImage`): `<div class="media media--zoom" data-reveal="image"><div class="media-scale"><Image fill .../></div></div>`. Arch images keep their radius and `overflow: hidden` on the same wrapper; the clip still works.

## 5. Reference components
`src/components/ui/Reveal.tsx` (client; type-checks under strict TS, React 19.3). One module-level observer, no state, no effect, no re-render:
```tsx
"use client";
import { useCallback, type CSSProperties, type ReactNode } from "react";
export type RevealKind = "fade-up" | "fade" | "mask-up" | "image" | "rule";
type Tag = "div" | "p" | "span" | "h1" | "h2" | "h3" | "figure" | "figcaption" | "li" | "hr";
const NO_PREF = "(prefers-reduced-motion: no-preference)";
const MAX_DELAY = 600; // ms
let io: IntersectionObserver | null = null;

function gateOpen(): boolean { // JS alive, motion allowed, failsafe not fired
  const root = document.documentElement;
  if (root.hasAttribute("data-motion-failsafe") || !matchMedia(NO_PREF).matches) return false;
  root.classList.add("motion-ok"); // idempotent; restores the class React's dev Strict Mode remount strips from <html>
  root.setAttribute("data-motion-ready", ""); // disarms the head-script failsafe
  return true;
}
function onIntersect(entries: IntersectionObserverEntry[]) {
  for (const { target, isIntersecting, boundingClientRect } of entries) {
    // Reveal when visible OR already scrolled past (reload mid-page, #anchor jump). Below the fold: keep waiting.
    if (!isIntersecting && boundingClientRect.top >= 0) continue;
    io?.unobserve(target);
    const el = target as HTMLElement;
    if (el.dataset.reveal === "image") { // will-change only while animating: 600 max delay + 1600 + margin
      el.style.willChange = "clip-path";
      setTimeout(() => { el.style.willChange = ""; }, 2400);
    }
    el.setAttribute("data-in", "");
  }
}
function observe(el: HTMLElement) {
  if (el.hasAttribute("data-in")) return;
  if (!gateOpen()) return void el.setAttribute("data-in", "");
  io ??= new IntersectionObserver(onIntersect, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
  io.observe(el);
}
type Props = { as?: Tag; kind: RevealKind; delay?: number; from?: "left"; className?: string; children?: ReactNode };
export function Reveal({ as: Tag = "div", kind, delay = 0, from, className, children }: Props) {
  const ref = useCallback((el: HTMLElement | null) => { // stable callback ref with React 19 cleanup
    if (!el) return;
    observe(el);
    return () => io?.unobserve(el);
  }, []);
  const style = delay ? ({ "--d": `${Math.min(delay, MAX_DELAY)}ms` } as CSSProperties) : undefined;
  return <Tag ref={ref} data-reveal={kind} data-from={from} className={className} style={style}>{children}</Tag>;
}
export default Reveal;
```
`src/components/ui/RevealText.tsx` stays a Server Component. It renders `<Reveal as={as} kind="mask-up">` containing `<span className="sr-only">{text}</span>` plus one `<span className="w" aria-hidden="true"><span style={{ "--d": ... } as CSSProperties}>{word}</span></span>` per word, a plain `" "` between wrappers (outside `.w`), `--d = delay + i * step`, `step = Math.min(70, 560 / Math.max(words.length - 1, 1))`, and one optional `italic` word. Screen readers read the headline once; no hand-split headlines elsewhere.
Usage: `<RevealText text="Fire, salt and patience" italic="patience" delay={180} />` / `<Reveal kind="fade-up" delay={360}><p>...</p></Reveal>` / `<Reveal as="hr" kind="rule" className="rule" />` / siblings: `items.map((d, i) => <Reveal key={d.id} kind="fade-up" delay={i * 120}>...)`.

## 6. Hero entrance (`#top`, section 01)
The hero runs on CSS keyframes, not on hydration, so it starts at first paint and never waits for JS. `data-hero="fade-up | fade | mask-up"` with `--d`/`--t`, gated by `html.motion-ok`, `backwards` fill so it ends in the natural (visible) state. The poster `<Image priority>` is the LCP and is never animated; an ink curtain above poster and video fades away instead. The pause/play control is not animated and is present at first paint. Parenthesised brief values are read as start delays; the last motion ends at 1900ms (< 2s).
| Element | Delay | Duration | Easing |
|---|---|---|---|
| `.hero-curtain` ink overlay, opacity 1 to 0 (reads as video fade-in) | 0ms | 1200ms | `--ease-out` |
| Nav `<header data-hero="fade">` | 600ms | 600ms | `--ease-out` |
| Wordmark letters `T I N M O`, `.w[data-hero="mask-up"]` each | 200ms + 90ms x i | 900ms (`--dur-slow`) | `--ease-out` |
| Tagline `data-hero="fade-up"` | 900ms | 700ms | `--ease-out` |
| CTA group `data-hero="fade-up"` (one wrapper, both buttons) | 1200ms | 700ms | `--ease-out` |
```css
@media (prefers-reduced-motion: no-preference) {
  html.motion-ok [data-hero="fade-up"] { animation: hero-rise var(--t, 700ms) var(--ease-out) var(--d, 0ms) backwards; }
  html.motion-ok [data-hero="fade"] { animation: hero-fade var(--t, 600ms) var(--ease-out) var(--d, 0ms) backwards; }
  html.motion-ok [data-hero="mask-up"] > span { animation: hero-mask var(--dur-slow) var(--ease-out) var(--d, 0ms) backwards; }
  html.motion-ok .hero-curtain { display: block; animation: hero-curtain 1200ms var(--ease-out) forwards; }
  @keyframes hero-rise { from { opacity: 0; transform: translateY(12px); } }
  @keyframes hero-fade { from { opacity: 0; } }
  @keyframes hero-mask { from { transform: translateY(110%); } }
  @keyframes hero-curtain { to { opacity: 0; } }
}
.hero-curtain { display: none; position: absolute; inset: 0; background: var(--color-ink); pointer-events: none; }
```

## 7. Interactions
Hover effects are wrapped in `@media (hover: hover)` (no sticky hover on touch); `:focus-visible` always gets the same end state. Focus outline is 2px `--color-accent`, 3px offset (`--color-bone` on dark), never transitioned.
```css
.btn { position: relative; isolation: isolate; overflow: hidden; min-height: 44px; color: var(--btn-fg); background: var(--btn-bg); border: 1px solid var(--btn-border); }
.btn::before { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--btn-wipe); transform: scaleX(0); transform-origin: right; } /* leaves to the right */
.btn .arrow { display: inline-block; }
.btn:focus-visible { color: var(--btn-fg-hover); } .btn:focus-visible::before { transform: scaleX(1); transform-origin: left; }
@media (hover: hover) { .btn:hover { color: var(--btn-fg-hover); } .btn:hover::before { transform: scaleX(1); transform-origin: left; } .btn:hover .arrow { transform: translateX(4px); } }
.link { background: linear-gradient(currentColor, currentColor) no-repeat 100% 100% / 0% 1px; } /* position flips instantly: draws in from the left, leaves to the right */
.link:focus-visible { background-position: 0 100%; background-size: 100% 1px; }
@media (hover: hover) { .link:hover { background-position: 0 100%; background-size: 100% 1px; } }
@media (prefers-reduced-motion: no-preference) {
  .btn { transition: color var(--dur-base) var(--ease-out); }
  .btn::before, .btn .arrow { transition: transform var(--dur-base) var(--ease-out); }
  .link { transition: background-size 350ms var(--ease-out); }
}
```
- Buttons: variants only set `--btn-*` (fg, bg, border, wipe, fg-hover); they never override `transition`. Wipe 450ms, arrow nudge exactly 4px, no scale, no lift, no shadow. `:active` swaps the wipe colour to `--color-accent-deep`, nothing moves.
- Links: underline is 1px, 350ms, `background-size` only. `aria-current` links keep the underline at 100%. Footer/nav links use `.link`; no colour-only hover.
- Nav: transparent over the hero. A 1px sentinel at the bottom of the hero is watched by one `IntersectionObserver` (`rootMargin: "-80px 0px 0px 0px"`); the nav is solid when `!isIntersecting && boundingClientRect.top < 0`. The paper background + bottom hairline is a `::before` whose `opacity` transitions in `--dur-base` `--ease-out`; link colour flips in the same time. No sentinel on the page (`/menu`): solid from first paint. No hide-on-scroll, no scroll listeners, no scroll-spy.
- Mobile menu: overlay `position: fixed; inset: 0` on `--color-ink`, closed state `clip-path: inset(0 0 100% 0); opacity: 0; visibility: hidden` plus `inert`. Open (`data-open`): `inset(0)`, opacity 1; transition 500ms `--ease-out`. Close: 350ms `--ease-in-out`, `visibility` delayed 350ms. Links (large serif) rise 24px + fade in `--dur-base`, `transition-delay: calc(180ms + var(--i) * var(--stagger))` only while opening, 0 when closing. Bars: two 1px lines rotating +-45deg in `--dur-base`. Lock scroll with `html:has([data-open]) { overflow: hidden }` (`scrollbar-gutter: stable` prevents a jump). Route change closes it. Reduced motion: opacity-only fade in `--dur-fast`, no clip, no stagger.
- Reservation `<dialog>`: opens with `fade-up` 450ms `--ease-out` (`@starting-style`) and a `::backdrop` opacity fade; closing is instant. Reduced motion: opacity only.

## 8. Images and section transitions
- Entrance is always the clip + scale settle. Alternate `data-from="left"` on landscape frames in the gallery and on story pairs; the second image of a pair gets `delay={120}`. Captions use `fade` at image delay + 360ms. At most 3 `image` reveals start in the same row.
- Hover zoom (`scale(1.04)`, 900ms) only on `.media--zoom` (gallery, plates). Never zoom on scroll, never above 1.12, never crossfade slideshows.
- Same-background boundaries: a `.rule` hairline with `data-reveal="rule"` spans gutter to gutter above each section's eyebrow. Background-change boundaries (paper to stone to ink: hero ink, then paper/stone through `#story` to `#visit`, ink again for `#reserve` and the footer) are hard edges: no gradient, no animated or scroll-linked colour, no rule. The incoming section's first reveal is the transition.
- Standard section choreography (delays are `--d`, max spread 600ms):
| Step | Element | Kind | Delay |
|---|---|---|---|
| 1 | hairline above eyebrow | `rule` | 0 |
| 2 | eyebrow `02 - Story` | `fade` | 100ms |
| 3 | headline | `mask-up` | 180ms + 70ms per word |
| 4 | media | `image` | 240ms |
| 5 | body copy | `fade-up` | 360ms |
| 6 | caption / link | `fade` | 480ms |
- No sliding page transitions: do not import `ViewTransition` or `addTransitionType` from React (Next 16 animates every route change once one exists), no `@view-transition`, no animated layouts. `/` and `/menu` are plain navigations that open at the top; the new page's own reveals play.

## 9. Scrolling
- Smooth scroll is CSS only (section 4) with `scroll-padding-top: 5rem`. `data-scroll-behavior="smooth"` on `<html>` lets Next 16 suspend smoothing on route changes (otherwise `/menu` to `/#visit` animates a page-length scroll). In JS use `scrollIntoView({ behavior: matchMedia(NO_PREF).matches ? "smooth" : "auto" })`; prefer plain `href="/#visit"` links.
- Optional enhancement, hero video drift only, <= 5% (brief cap 6%), overscanned so no gap shows:
```css
@supports (animation-timeline: scroll()) { @media (prefers-reduced-motion: no-preference) {
  .hero-media { inset: -6% 0; animation: hero-drift linear both; animation-duration: 1ms; animation-timeline: scroll(root block); animation-range: 0px 100svh; }
  @keyframes hero-drift { to { transform: translate3d(0, 5%, 0); } }
} }
```
Declare `animation-timeline` after the `animation` shorthand (it resets it). Do not rebuild the reveals on `view()` timelines: support is uneven and timing would depend on scroll speed.

## 10. Why no animation library
Every required effect is opacity, transform or clip-path, which CSS transitions run off the main thread. GSAP/Framer/Lenis would add tens of KB against a 130KB first-load budget, force `"use client"` around content that is otherwise server-rendered, ship spring and scroll-hijack defaults the brand bans, and replace a no-JS-safe CSS gate with JS-owned hidden states. `Reveal` is about 45 lines. The Web Animations API (`el.animate`) is acceptable for a one-off imperative need. A library needs written owner approval, a dynamic import and a measured budget.

## 11. Progressive enhancement
- JS off: `motion-ok` is never set, no selector in section 4 matches, everything is visible; `data-reveal` markup is server-rendered and identical in all states.
- Reduced motion: the head script does not set the class and the CSS lives inside the no-preference query, so a live OS toggle also works. Hero video: poster only (`HeroVideo` reads `matchMedia` and listens for `change`).
- Slow or failed hydration: the 4s failsafe removes `motion-ok`. Hero keyframes never wait for JS.
- Print: forced visible by the `@media print` block.
- Reduced-motion matrix: reveals and hero off; smooth scroll `auto`; hover zoom, arrow nudge and wipe become instant colour states; menu and dialog use a <= `--dur-fast` opacity fade only.

## 12. Performance rules
- Animate only `transform`, `opacity`, `clip-path`. Sanctioned paint-only exceptions: `color`/`border-color` on small leaf controls (<= `--dur-base`), `background-size` on the 1px link underline, delayed `visibility` on the menu. Never animate layout properties, `box-shadow`, `filter`, `backdrop-filter` (nav panel is opaque paper), gradients or `background-position` on photos.
- No static `will-change` in CSS. Set it in JS on one element for the length of the animation only (see `onIntersect`), never on more than 3 at a time.
- One shared reveal observer (module singleton, `unobserve` after first reveal) plus one nav-sentinel observer. No scroll or resize listeners, no `getBoundingClientRect` in loops, no per-node observers.
- No layout shift: hidden states use transform/opacity/clip only; never `display: none`, `height: 0` or conditional rendering. Images keep aspect-ratio boxes.
- `Reveal` + `RevealText` stay under 1.5KB gzipped; no new motion dependency.

## 13. QA protocol (DevTools: Rendering and Performance panels)
1. Reduced motion: emulate `prefers-reduced-motion: reduce`, hard reload. Everything is visible at first paint, the Animations panel stays empty, hero shows the poster only, `/#visit` jumps without smoothing. Toggle it live: pending content appears.
2. JS off (command menu: "Disable JavaScript"): all copy, nav links and section order intact, nothing blank.
3. Failsafe: block the JS bundle via request blocking; all content is visible by 4.5s.
4. Throttle CPU 4x and network Slow 4G; scroll top to bottom: hero finishes by about 2s, no long task over 50ms during a reveal, no Layout events inside reveal frames.
5. Layout shift: run `new PerformanceObserver(l => l.getEntries().forEach(e => console.log(e.value))).observe({ type: "layout-shift", buffered: true })`, scroll the whole page; expect no entries. At 375 and 1920px check no clipped descenders (g, y, p) or italic overhang in `.w`.
6. Mid-page entry: reload scrolled to `#visit`, then scroll up: nothing above is left hidden.
7. Print preview shows all content; Lighthouse mobile keeps CLS about 0 and Performance >= 90.
8. Keyboard: tab through nav, buttons and menu; every focus ring is visible and the wipe or underline appears.

## Before you ship a change
- [ ] Uses only existing tokens and `data-reveal` kinds; no new durations outside the motion block.
- [ ] No `data-reveal` on interactive or tall nodes; no Tailwind transition utilities beside it.
- [ ] No `--d` over 600ms; block stagger 120ms, word stagger 70ms.
- [ ] Only transform/opacity/clip-path (or a listed exception) animates; no static `will-change`.
- [ ] Reduced motion, JS-off and print each checked; QA steps 1-6 pass.
- [ ] No parallax, bounce, loop or library added; the change answers "does this help someone choose and book a table?".
