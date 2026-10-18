import { notFound } from "next/navigation";
import AtmosphereGallery from "@/components/sections/AtmosphereGallery";
import GuestReviews from "@/components/sections/GuestReviews";
import Hero from "@/components/sections/Hero";
import ReservationCTA from "@/components/sections/ReservationCTA";
import SignatureDishes from "@/components/sections/SignatureDishes";
import StorySection from "@/components/sections/StorySection";
import VisitSection from "@/components/sections/VisitSection";
import { getDishes } from "@/content/dishes";
import { getGallery } from "@/content/gallery";
import { getHero, getMedia } from "@/content/localized-media";
import { site } from "@/content/site";
import { getStory } from "@/content/story";
import { getText } from "@/content/text";
import { hasLocale } from "@/i18n/config";
import { localePath } from "@/lib/i18n";
import { getReviews } from "@/lib/reviews";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const text = getText(lang);
  const reviews = await getReviews(lang);

  return (
    <>
      <Hero
        name={site.name}
        copy={{ ...text.hero, tagline: text.meta.tagline }}
        menuHref={localePath(lang, "/#menu")}
        media={getHero(lang)}
      />
      <StorySection story={getStory(lang)} />
      <SignatureDishes
        content={getDishes(lang)}
        menuHref={site.menu.fullMenuUrl ?? localePath(lang, "/menu")}
        menuLabel={text.dishes.viewMenu}
        plateLabel={text.dishes.plate}
      />
      <AtmosphereGallery content={getGallery(lang)} />
      <GuestReviews
        content={reviews}
        labels={{
          illustrative: text.reviews.illustrative,
          googlePending: text.reviews.googlePending,
          googlePendingReason: text.reviews.googlePendingReason,
          readMore: text.reviews.readMore,
        }}
      />
      <VisitSection locale={lang} />
      <ReservationCTA copy={text.reserve} image={getMedia(lang).ctaEvening} placeholders={text.placeholders} />
    </>
  );
}
