#!/usr/bin/env node
/**
 * Optimise a source photograph into a web-ready master for /public/media.
 *
 *   node scripts/optimize-image.mjs <input> <output-base> [options]
 *
 * Options
 *   --width   <px>    Max output width (default 2000, never upscales)
 *   --ratio   <w:h>   Crop to an aspect ratio, e.g. 4:5, 16:9, 1:1 (default: keep original)
 *   --position <p>    Crop focus: attention (default) | entropy | center | top | bottom | left | right
 *                     or a focal point "fx,fy" in 0..1, e.g. 0.62,0.4
 *   --quality <1-100> Encoder quality (default 80)
 *   --format  <f>     webp (default) | avif | jpeg
 *   --grade   <g>     tinmo (default) | none. The "tinmo" grade is a very light, uniform treatment
 *                     (saturation -7%, a touch warmer) so photographs from different sources sit
 *                     together as one set. Use "none" for images that must stay colour-true.
 *
 * Writes <output-base>.<ext> and prints one JSON line:
 *   { src, width, height, bytes, blurDataURL, color, source: {width,height} }
 * where `src` is the public URL (the leading "public" folder is stripped).
 *
 * Example
 *   node scripts/optimize-image.mjs raw/interior.jpg public/media/story/interior --width 2200 --ratio 3:2
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

function parseArgs(argv) {
  const positional = [];
  const opts = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) opts[a.slice(2)] = argv[++i];
    else positional.push(a);
  }
  return { positional, opts };
}

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

const { positional, opts } = parseArgs(process.argv.slice(2));
const [input, outBase] = positional;
if (!input || !outBase) {
  console.error("Usage: node scripts/optimize-image.mjs <input> <output-base> [--width N] [--ratio W:H] [--position p] [--quality Q] [--format webp|avif|jpeg]");
  process.exit(1);
}

const maxWidth = Number(opts.width ?? 2000);
const quality = Number(opts.quality ?? 80);
const format = opts.format ?? "webp";
const position = opts.position ?? "attention";
const grade = opts.grade ?? "tinmo";

const { data, info } = await sharp(input, { failOn: "none" })
  .rotate()
  .toBuffer({ resolveWithObject: true });
const srcW = info.width;
const srcH = info.height;

let pipeline = sharp(data);
if (grade === "tinmo") {
  pipeline = pipeline.modulate({ saturation: 0.93 }).recomb([
    [1.015, 0, 0],
    [0, 1, 0],
    [0, 0, 0.97],
  ]);
}
let outW = Math.min(maxWidth, srcW);
let outH = Math.round((outW * srcH) / srcW);

if (opts.ratio) {
  const [rw, rh] = opts.ratio.split(":").map(Number);
  const r = rw / rh;
  let cw;
  let ch;
  if (srcW / srcH > r) {
    ch = srcH;
    cw = Math.round(srcH * r);
  } else {
    cw = srcW;
    ch = Math.round(srcW / r);
  }
  outW = Math.min(maxWidth, cw);
  outH = Math.round(outW / r);

  if (/^[\d.]+,[\d.]+$/.test(position)) {
    const [fx, fy] = position.split(",").map(Number);
    const left = clamp(Math.round(fx * srcW - cw / 2), 0, srcW - cw);
    const top = clamp(Math.round(fy * srcH - ch / 2), 0, srcH - ch);
    pipeline = pipeline
      .extract({ left, top, width: cw, height: ch })
      .resize({ width: outW, height: outH });
  } else {
    const strategies = { attention: sharp.strategy.attention, entropy: sharp.strategy.entropy };
    pipeline = pipeline.resize({
      width: outW,
      height: outH,
      fit: "cover",
      position: strategies[position] ?? position,
    });
  }
} else {
  pipeline = pipeline.resize({ width: outW });
}

const encoders = {
  webp: () => pipeline.webp({ quality, effort: 5 }),
  avif: () => pipeline.avif({ quality: Math.min(quality, 65), effort: 4 }),
  jpeg: () => pipeline.jpeg({ quality, mozjpeg: true }),
};
if (!encoders[format]) {
  console.error(`Unknown format: ${format}`);
  process.exit(1);
}
const ext = format === "jpeg" ? "jpg" : format;
const out = await encoders[format]().toBuffer({ resolveWithObject: true });

const file = `${outBase}.${ext}`;
await mkdir(path.dirname(file), { recursive: true });
await writeFile(file, out.data);

const blur = await sharp(out.data).resize(24).blur(0.8).webp({ quality: 40 }).toBuffer();
const px = await sharp(out.data).resize(1, 1).raw().toBuffer();
const color = `#${[...px].slice(0, 3).map((n) => n.toString(16).padStart(2, "0")).join("")}`;

const normalised = file.replaceAll("\\", "/");
console.log(
  JSON.stringify({
    src: normalised.replace(/^(\.\/)?public/, ""),
    width: out.info.width,
    height: out.info.height,
    bytes: out.data.length,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    color,
    source: { width: srcW, height: srcH },
  }),
);
