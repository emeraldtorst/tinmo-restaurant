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
  // The dining room, from the newest photographs. The source files carry a small TINMO logo tile in the top-left corner,
  // so each one is cut 212 px off the left (1388 x 1066 left). Keep the same crop if you replace them.
  pines: photo("room-pines", "#9d7860", "50% 30%", 1388, 1066),
  windowWall: photo("room-window", "#9f806d", "50% 40%", 1388, 1066),
  barFlowers: photo("room-bar", "#ab7f5e", "50% 40%", 1388, 1066),
  stairs: photo("room-stairs", "#c1957b", "50% 50%", 1388, 1066),
  corner: photo("room-corner-hd", "#a46c48", "50% 40%", 1732, 1333), // 2000 px source, cut 268 px at the left
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
