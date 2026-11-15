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
  // The dining room, in daylight. New file names on purpose (see the cache note above). The grey-chairs photo is cut at
  // the left edge (1430 of 1600 px) to leave out the toilet signs.
  roomBlue: photo("room-blue", "#9f937c", "50% 25%", 1600, 1200),
  roomPapers: photo("room-papers", "#b9936d", "50% 30%", 1200, 1600),
  roomFans: photo("room-fans", "#c2ac8b", "50% 25%", 1200, 1600),
  roomDucts: photo("room-ducts", "#9b8c7b", "50% 60%", 1600, 1200),
  roomGrey: photo("room-grey", "#cab18f", "50% 50%", 1430, 1200),
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
