import type { HeroVideoMedia, ImageAsset } from "@/types/content";

/**
 * TINMO's own photographs (public/media/photos). Alt text lives in text/en.ts + de.ts (`alt`, same keys).
 * To swap a picture: optimise it with `node scripts/optimize-image.mjs <input> public/media/photos/<name> --grade none`
 * and update the file here. Use a new <name> for a replacement: optimised copies are cached for 31 days, so the same
 * name keeps showing the old photo. `objectPosition` is the focal point used when the photo is cropped.
 */
const photo = (name: string, color: string, objectPosition = "50% 50%", width = 3024, height = 2016): ImageAsset => ({
  src: `/media/photos/${name}.webp`,
  width,
  height,
  alt: "",
  color,
  objectPosition,
});

export const media = {
  food1: photo("food1", "#e4a878", "50% 55%"),
  food2: photo("food2", "#b48351", "50% 55%"),
  food3: photo("food3", "#e49953", "55% 62%"),
  food4: photo("food4", "#b66c31", "50% 55%"),
  dessert1: photo("dessert1", "#af7242", "52% 50%"),
  dessert2: photo("dessert2", "#783505", "50% 50%"),
  // The dining room, from the newest photographs (3024 px originals). The gallery shows them whole, with the small TINMO logo
  // tile that is part of the source files. Only `pines`, used as a full-bleed background (hero poster, reservation block),
  // is cut 400 px at the left to leave the tile out.
  pines: photo("room-pines-hd", "#9e7860", "50% 40%", 2624, 2016),
  windowWall: photo("room-window-full", "#8a644d", "50% 40%", 3024, 2016),
  barFlowers: photo("room-bar-full", "#855a3a", "50% 40%", 3024, 2016),
  stairs: photo("room-stairs-full", "#ae8566", "50% 40%", 3024, 2016),
  corner: photo("room-corner-full", "#b77c58", "50% 40%", 3024, 2016),
  sushi1: photo("sushi1", "#a08454", "45% 55%", 1600, 1200),
  sushi2: photo("sushi2", "#a08755", "50% 50%", 1200, 1600),
  sushi3: photo("sushi3", "#ad9266", "50% 72%", 1200, 1600),
} satisfies Record<string, ImageAsset>;

export type MediaKey = keyof typeof media;

/** Looping hero background video (public/media/hero). The room photo underneath is the poster / fallback. */
export const heroVideo = {
  variants: {
    landscape: [{ src: "/media/hero/torch-landscape.mp4", type: "video/mp4" }],
    portrait: [{ src: "/media/hero/torch-portrait.mp4", type: "video/mp4" }],
  },
} satisfies Omit<HeroVideoMedia, "videoLabel">;
