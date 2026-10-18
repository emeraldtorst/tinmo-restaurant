import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Figure from "@/components/ui/Figure";
import PlaceholderNote from "@/components/ui/PlaceholderNote";
import RevealText from "@/components/ui/RevealText";
import { cn } from "@/lib/cn";
import type { StoryContent } from "@/types/content";

function Chapter({ n, label, text, className }: { n: string; label: string; text: string; className?: string }) {
  return (
    <div className={className}>
      <p className="font-display text-display-lg font-light leading-none text-accent" aria-hidden="true" data-reveal="fade-up">
        {n}
      </p>
      <div className="mt-6 border-t border-line pt-6">
        <h3 className="text-display-sm" data-reveal="fade-up">
          {label}
        </h3>
        <p className="mt-3 max-w-[26rem] text-body text-muted-strong" data-reveal="fade-up">
          {text}
        </p>
      </div>
    </div>
  );
}

/**
 * 02 — Story. An opening line and lead, one wide establishing shot of the room, then three chapters
 * (technique · ingredients · sharing), each a photograph paired with a numbered note. The photographs
 * alternate sides and scale; on mobile each chapter stacks image-first with the sides still alternating.
 */
export default function StorySection({ story }: { story: StoryContent }) {
  const { figures, principles } = story;
  const [technique, ingredients, sharing] = principles;

  return (
    <section id="story" aria-labelledby="story-title" className="relative overflow-x-clip bg-paper py-section">
      <Container>
        <Eyebrow>{story.eyebrow}</Eyebrow>
        {story.isPlaceholder ? <PlaceholderNote className="mt-4 md:text-right">{story.placeholderNote}</PlaceholderNote> : null}

        <div className="tm-grid mt-14 items-end gap-y-8 md:mt-20">
          <RevealText
            id="story-title"
            text={story.heading}
            emClassName="text-accent"
            className="col-span-6 text-display-lg md:col-span-7"
          />
          <p
            className="col-span-6 max-w-[34rem] font-display text-lead font-light md:col-span-5 md:col-start-8 md:pb-3"
            data-reveal="fade-up"
          >
            {story.lead}
          </p>
        </div>
      </Container>

      {/* Establishing shot — full bleed */}
      <div className="mt-16 md:mt-24">
        <Figure
          image={figures.interior.image}
          caption={figures.interior.caption}
          index="02.1"
          ratio="css"
          mediaClassName="aspect-[4/3] md:aspect-[21/9]"
          sizes="100vw"
          className="[&>figcaption]:px-gutter"
        />
      </div>

      <Container>
        {/* Chapter 1 — technique: arch portrait left, note right */}
        <div className="tm-grid mt-20 items-center gap-y-10 md:mt-36">
          <Figure
            image={figures.chef.image}
            caption={figures.chef.caption}
            index="02.2"
            shape="arch"
            ratio="4 / 5"
            sizes="(min-width: 768px) 40vw, 80vw"
            className="col-span-5 col-start-2 md:col-span-5 md:col-start-1 md:row-start-1"
          />
          <Chapter
            n="01"
            label={technique.label}
            text={technique.text}
            className="col-span-6 md:col-span-4 md:col-start-8 md:row-start-1"
          />
        </div>

        {/* Chapter 2 — ingredients: note left, portrait right, dropped */}
        <div className="tm-grid mt-20 items-start gap-y-10 md:mt-36">
          <Figure
            image={figures.ingredients.image}
            caption={figures.ingredients.caption}
            index="02.3"
            ratio="3 / 4"
            sizes="(min-width: 768px) 38vw, 80vw"
            className="col-span-5 md:col-span-5 md:col-start-8 md:row-start-1"
          />
          <Chapter
            n="02"
            label={ingredients.label}
            text={ingredients.text}
            className={cn("col-span-6 md:col-span-4 md:col-start-2 md:row-start-1 md:mt-28")}
          />
        </div>
      </Container>

      {/* Chapter 3 — sharing: wide table bleeding left, note bottom-right */}
      <Container>
        <div className="tm-grid mt-20 items-end gap-y-10 md:mt-36">
          <Figure
            image={figures.table.image}
            caption={figures.table.caption}
            index="02.4"
            ratio="3 / 2"
            sizes="(min-width: 768px) 66vw, 100vw"
            className="col-span-6 -ml-gutter md:col-span-8 [&>figcaption]:pl-gutter"
          />
          <Chapter n="03" label={sharing.label} text={sharing.text} className="col-span-6 md:col-span-4" />
        </div>
      </Container>
    </section>
  );
}
