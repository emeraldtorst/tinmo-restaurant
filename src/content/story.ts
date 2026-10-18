import { getMedia } from "@/content/localized-media";
import { getText } from "@/content/text";
import type { Locale } from "@/i18n/config";
import type { StoryContent } from "@/types/content";

/** Story section (02). PLACEHOLDER copy — wording in text/en.ts + de.ts, images in media.ts. */
export function getStory(locale: Locale): StoryContent {
  const t = getText(locale).story;
  const m = getMedia(locale);
  return {
    isPlaceholder: true,
    placeholderNote: t.placeholderNote,
    eyebrow: t.eyebrow,
    heading: t.heading,
    lead: t.lead,
    principles: t.principles,
    figures: {
      interior: { image: m.storyInterior, caption: t.captions.interior },
      chef: { image: m.storyChef, caption: t.captions.chef },
      ingredients: { image: m.storyIngredients, caption: t.captions.ingredients },
      table: { image: m.storyTable, caption: t.captions.table },
    },
  };
}
