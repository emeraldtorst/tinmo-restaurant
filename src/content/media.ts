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
  // The dishes ("Aus der Küche"): iPhone photos from the kitchen, kept in their own proportions, longest side 2000 px.
  dishRollsLong: photo("dish-0764", "#957c62", "50% 50%", 2000, 819),
  dishNigiriPlatter: photo("dish-0606", "#b7976e", "50% 50%", 2000, 1731),
  dishNigiriPlate: photo("dish-0748", "#917353", "50% 50%", 2000, 1987),
  dishDragonRoll: photo("dish-0582", "#bea072", "50% 50%", 1500, 2000),
  dishRollsTea: photo("dish-0564", "#c0ad99", "50% 50%", 1500, 2000),
  dishChicken: photo("dish-0579", "#a69781", "50% 50%", 1500, 2000),
  dishBowlBeef: photo("dish-0598", "#bfaa8a", "50% 50%", 1500, 2000),
  dishTeriyaki: photo("dish-0753", "#95795b", "50% 50%", 2000, 1897),
  dishDuck: photo("dish-0754", "#a08c74", "50% 50%", 1984, 2000),
  dishUdon: photo("dish-0727", "#836d4f", "50% 50%", 2000, 1875),
  dishRamen: photo("dish-0521", "#ae906d", "50% 50%", 1500, 2000),
  dishDimSum: photo("dish-0596", "#ae9578", "50% 50%", 2000, 1634),
  dishBao: photo("dish-0591", "#ae9c81", "50% 50%", 2000, 1917),
  dishTartare: photo("dish-0592", "#d2a471", "50% 50%", 1708, 2000),
  dishBowlSalmon: photo("dish-0507", "#c59260", "50% 50%", 1500, 2000),
  dishDessertPistachio: photo("dish-0542", "#998671", "50% 50%", 1500, 2000),
  dishDessertClay: photo("dish-0544", "#a28e71", "50% 50%", 1500, 2000),
  // The dining room, from the newest photographs (3024 px originals). The gallery shows them whole, with the small TINMO logo
  // tile that is part of the source files. Only `pines`, used as a full-bleed background (hero poster, reservation block),
  // is cut 400 px at the left to leave the tile out.
  pines: photo("room-pines-hd", "#9e7860", "50% 40%", 2624, 2016),
  windowWall: photo("room-window-full", "#8a644d", "50% 40%", 3024, 2016),
  barFlowers: photo("room-bar-full", "#855a3a", "50% 40%", 3024, 2016),
  stairs: photo("room-stairs-full", "#ae8566", "50% 40%", 3024, 2016),
  corner: photo("room-corner-full", "#b77c58", "50% 40%", 3024, 2016),
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
