#!/usr/bin/env node
/**
 * Visual QA: screenshots + layout/console diagnostics at several widths, using the
 * installed Microsoft Edge through playwright-core (no browser download needed).
 *
 *   node scripts/shoot.mjs <url> [options]
 *
 *   --out <dir>        Output directory (default ./qa-shots). Created if missing.
 *   --widths <list>    Comma list, default 375,768,1440. QA set: 375,430,768,1024,1440,1920
 *   --height <px>      Viewport height (default 900; mobile widths use 812 unless set)
 *   --mode <m>         tiles (default): one viewport-sized PNG per scroll step — what a visitor sees
 *                      full: a single full-page PNG per width
 *                      viewport: only the first viewport (above the fold)
 *                      selector: screenshot of --selector only
 *   --selector <css>   Element to capture in selector mode (e.g. "#story")
 *   --name <slug>      File prefix (default derived from the URL path)
 *   --reduced          Emulate prefers-reduced-motion: reduce
 *   --nojs             Disable JavaScript (progressive-enhancement check)
 *   --browser <ch>     msedge (default) | chrome
 *
 * Prints one JSON report per width (also saved to <out>/report.json):
 *   horizontal overflow + offending elements, broken images, console errors/warnings,
 *   page errors, failed/4xx/5xx requests, <h1> count, clipped text.
 * Exit code 1 if any width reports overflow, broken images or console/page errors.
 */
import { chromium } from "playwright-core";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

function parse(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) {
      out._.push(a);
      continue;
    }
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) out[key] = true;
    else {
      out[key] = next;
      i++;
    }
  }
  return out;
}

const args = parse(process.argv.slice(2));
const url = args._[0] ?? "http://localhost:3000/";
const outDir = path.resolve(args.out ?? "qa-shots");
const widths = String(args.widths ?? "375,768,1440").split(",").map((w) => Number(w.trim()));
const mode = args.mode ?? "tiles";
const slug =
  args.name ??
  (new URL(url).pathname.replace(/^\/|\/$/g, "").replace(/[^a-z0-9]+/gi, "-") || "home");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ channel: args.browser ?? "msedge", headless: true });
const reports = [];

for (const width of widths) {
  const isMobile = width < 768;
  const height = Number(args.height ?? (isMobile ? 812 : 900));
  const context = await browser.newContext({
    viewport: { width, height },
    isMobile,
    hasTouch: isMobile,
    deviceScaleFactor: 1,
    reducedMotion: args.reduced ? "reduce" : "no-preference",
    javaScriptEnabled: !args.nojs,
  });
  const page = await context.newPage();

  const consoleIssues = [];
  const pageErrors = [];
  const failed = [];
  page.on("console", (msg) => {
    if (["error", "warning"].includes(msg.type())) consoleIssues.push(`${msg.type()}: ${msg.text()}`.slice(0, 400));
  });
  page.on("pageerror", (err) => pageErrors.push(String(err).slice(0, 400)));
  page.on("requestfailed", (req) => failed.push(`${req.failure()?.errorText ?? "failed"} ${req.url()}`.slice(0, 300)));
  page.on("response", (res) => {
    if (res.status() >= 400) failed.push(`${res.status()} ${res.url()}`.slice(0, 300));
  });

  await page.goto(url, { waitUntil: "load", timeout: 60000 });
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  await sleep(700);

  // Pass 1: scroll the whole page so lazy images load and reveals fire.
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = Math.round(height * 0.6);
  for (let y = 0; y < total; y += step) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await sleep(220);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await sleep(900);

  const files = [];
  if (mode === "full") {
    const file = path.join(outDir, `${slug}-${width}-full.png`);
    await page.screenshot({ path: file, fullPage: true });
    files.push(file);
  } else if (mode === "viewport") {
    const file = path.join(outDir, `${slug}-${width}-fold.png`);
    await page.screenshot({ path: file });
    files.push(file);
  } else if (mode === "selector") {
    if (!args.selector) throw new Error("--selector is required in selector mode");
    const locator = page.locator(String(args.selector)).first();
    await locator.scrollIntoViewIfNeeded();
    await sleep(1300);
    const file = path.join(outDir, `${slug}-${width}-${String(args.selector).replace(/[^a-z0-9]+/gi, "")}.png`);
    await locator.screenshot({ path: file });
    files.push(file);
  } else {
    // tiles: what a visitor actually sees, one viewport at a time
    const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    let n = 1;
    for (let y = 0; y < docHeight; y += height - 40) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
      await sleep(450);
      const file = path.join(outDir, `${slug}-${width}-t${String(n++).padStart(2, "0")}.png`);
      await page.screenshot({ path: file });
      files.push(file);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  }

  const metrics = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const sw = document.documentElement.scrollWidth;
    const clipped = (el) => {
      for (let p = el.parentElement; p; p = p.parentElement) {
        const cs = getComputedStyle(p);
        if (/(hidden|clip|auto|scroll)/.test(cs.overflowX)) return true;
      }
      return false;
    };
    const offenders = [];
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if ((r.right > vw + 1 || r.left < -1) && !clipped(el)) {
        offenders.push({
          el: `${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".") : ""}`,
          text: (el.textContent || "").trim().slice(0, 40),
          left: Math.round(r.left),
          right: Math.round(r.right),
        });
        if (offenders.length >= 12) break;
      }
    }
    const clippedText = [];
    for (const el of document.querySelectorAll("h1,h2,h3,h4,p,a,button,li,dt,dd,figcaption,label")) {
      const cs = getComputedStyle(el);
      if (/(hidden|clip)/.test(cs.overflowX) && el.scrollWidth > el.clientWidth + 1 && (el.textContent || "").trim()) {
        clippedText.push((el.textContent || "").trim().slice(0, 50));
      }
    }
    const brokenImages = [...document.images]
      .filter((i) => i.complete && i.naturalWidth === 0 && i.currentSrc)
      .map((i) => i.currentSrc.slice(0, 160));
    const smallTargets = [];
    for (const el of document.querySelectorAll("a[href],button,summary,[role=button]")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.height < 40 || r.width < 40) {
        smallTargets.push(`${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30)} (${Math.round(r.width)}x${Math.round(r.height)})`);
      }
    }
    return {
      viewport: vw,
      scrollWidth: sw,
      overflowX: sw > vw,
      docHeight: document.documentElement.scrollHeight,
      h1Count: document.querySelectorAll("h1").length,
      offenders,
      clippedText,
      brokenImages,
      smallTargets: smallTargets.slice(0, 12),
    };
  });

  const report = { width, url, mode, files, ...metrics, consoleIssues, pageErrors, failed };
  reports.push(report);
  console.log(JSON.stringify(report, null, 1));
  await context.close();
}

await browser.close();
await writeFile(path.join(outDir, `report-${slug}.json`), JSON.stringify(reports, null, 2));

const bad = reports.some(
  (r) => r.overflowX || r.brokenImages.length || r.consoleIssues.length || r.pageErrors.length,
);
process.exit(bad ? 1 : 0);
