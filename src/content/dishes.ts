import { getMedia } from "@/content/localized-media";
import { getText } from "@/content/text";
import type { Locale } from "@/i18n/config";
import type { DishesContent } from "@/types/content";

/**
 * Signature plates (03). PLACEHOLDER: dishes, descriptions and prices are illustrative examples, not
 * confirmed menu items. Names/descriptions are in text/en.ts + de.ts (keyed by `id` below); order =
 * display order (the composition is designed for four dishes); prices and photos are set here.
 */
const structure = [
  { id: "black-cod", price: "00", image: "dishBlackCod" },
  { id: "crispy-duck", price: "00", image: "dishDuck" },
  { id: "dumplings", price: "00", image: "dishDumplings" },
  { id: "matcha-basque", price: "00", image: "dishCheesecake" },
] as const;

export function getDishes(locale: Locale): DishesContent {
  const t = getText(locale).dishes;
  const m = getMedia(locale);
  return {
    isPlaceholder: true,
    placeholderNote: t.placeholderNote,
    eyebrow: t.eyebrow,
    heading: t.heading,
    intro: t.intro,
    dishes: structure.map((d) => {
      const text = t.items[d.id];
      return {
        id: d.id,
        name: text.name,
        description: text.description,
        price: d.price,
        image: m[d.image],
        tag: text.tag || undefined,
      };
    }),
  };
}
