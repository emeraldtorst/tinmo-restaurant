import { notFound } from "next/navigation";
import AtmosphereGallery from "@/components/sections/AtmosphereGallery";
import GuestsAndPress from "@/components/sections/GuestsAndPress";
import Hero from "@/components/sections/Hero";
import ReservationCTA from "@/components/sections/ReservationCTA";
import SignatureDishes from "@/components/sections/SignatureDishes";
import VisitSection from "@/components/sections/VisitSection";
import { getMedia } from "@/content/localized-media";
import { heroVideo } from "@/content/media";
import { getText } from "@/content/text";
import { hasLocale } from "@/i18n/config";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const text = getText(lang);
  const m = getMedia(lang);

  return (
    <>
      <Hero
        heading={text.meta.title}
        line={text.hero.line}
        menuLabel={text.hero.menuLabel}
        image={m.pines}
        video={{ videoLabel: text.alt.heroVideo, variants: heroVideo.variants }}
      />
      <AtmosphereGallery heading={text.gallery.heading} paragraphs={text.gallery.paragraphs} rows={[[m.corner, m.windowWall], [m.barFlowers, m.stairs, m.sushi3]]} />
      <SignatureDishes
        heading={text.dishes.heading}
        intro={text.dishes.intro}
        feature={{ wide: m.sushi1, tall: m.sushi2, caption: text.dishes.featureCaption }}
        items={[m.food1, m.food2, m.food3, m.food4, m.dessert1, m.dessert2].map((image, i) => ({ image, caption: text.dishes.captions[i] }))}
      />
      <GuestsAndPress locale={lang} text={text.guests} />
      <VisitSection locale={lang} />
      <ReservationCTA heading={text.reserve.heading} line={text.reserve.line} image={m.pines} placeholders={text.placeholders} />
    </>
  );
}
