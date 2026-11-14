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
  interior1: photo("interior1", "#824e24"),
  interior2: photo("interior2", "#75472b", "50% 22%"),
  interior3: photo("interior3", "#743f18"),
  // Cut at the right edge (2600 of 3024 px) to leave out a step ladder and boxes beside the bar. 66% keeps the portrait crop
  // on wide screens where it was. New file name on purpose: the image optimiser and browsers cache by URL.
  interior4: photo("interior4-cropped", "#6b3513", "66% 35%", 2600, 2016),
  interior5: photo("interior5", "#663010"),
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
