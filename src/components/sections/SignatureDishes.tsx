import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Figure from "@/components/ui/Figure";
import PlaceholderNote from "@/components/ui/PlaceholderNote";
import RevealText from "@/components/ui/RevealText";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Dish, DishesContent } from "@/types/content";

interface SignatureDishesProps {
  content: DishesContent;
  menuHref: string;
  menuLabel: string;
  plateLabel: string;
}

/**
 * Four dishes as two staggered pairs (each pair is its own grid, so nothing can ever overlap).
 * Order = content order. Desktop: 4:5 left + 3:2 right, dropped · 1:1 left + 4:5 right, dropped.
 */
const slots = [
  { ratio: "4 / 5", sizes: "(min-width: 768px) 42vw, 85vw", className: "col-span-5 md:col-span-5 md:col-start-1" },
  { ratio: "3 / 2", sizes: "(min-width: 768px) 50vw, 95vw", className: "col-span-6 mt-16 md:col-span-6 md:col-start-7 md:mt-32" },
  { ratio: "1 / 1", sizes: "(min-width: 768px) 38vw, 85vw", className: "col-span-5 col-start-2 md:col-span-5 md:col-start-2" },
  { ratio: "4 / 5", sizes: "(min-width: 768px) 36vw, 85vw", className: "col-span-5 mt-16 md:col-span-4 md:col-start-8 md:mt-24" },
] as const;

function DishItem({ dish, i, plateLabel }: { dish: Dish; i: number; plateLabel: string }) {
  const slot = slots[i % slots.length];
  return (
    <article className={cn(slot.className)}>
      <Figure image={dish.image} caption={dish.tag ?? plateLabel} index={`03.${i + 1}`} ratio={slot.ratio} sizes={slot.sizes} />
      <h3 className="mt-6 text-display-sm" data-reveal="fade-up">
        {dish.name}
      </h3>
      <p className="mt-3 max-w-[26rem] text-small text-muted-strong" data-reveal="fade-up">
        {dish.description}
      </p>
      {dish.price ? (
        <p className="mt-4 flex max-w-[26rem] justify-between border-t border-line pt-3 text-small font-medium tabular-nums" data-reveal="fade">
          <span className="tm-label text-accent">03.{i + 1}</span>
          <span>{dish.price}</span>
        </p>
      ) : null}
    </article>
  );
}

/** 03 — Signature plates (#menu). Stone ground, unboxed images, no cards. */
export default function SignatureDishes({ content, menuHref, menuLabel, plateLabel }: SignatureDishesProps) {
  const pairs = [content.dishes.slice(0, 2), content.dishes.slice(2, 4)];
  return (
    <section id="menu" aria-labelledby="menu-title" className="overflow-x-clip bg-stone py-section">
      <Container>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <div className="tm-grid mt-14 items-end gap-y-8 md:mt-20">
          <RevealText id="menu-title" text={content.heading} className="col-span-6 text-display-md md:col-span-6" />
          <div className="col-span-6 md:col-span-5 md:col-start-8 md:pb-2">
            <p className="max-w-[34rem] font-display text-lead font-light" data-reveal="fade-up">
              {content.intro}
            </p>
            {content.isPlaceholder ? <PlaceholderNote className="mt-4">{content.placeholderNote}</PlaceholderNote> : null}
          </div>
        </div>

        {pairs.map((pair, p) => (
          <div key={p} className="tm-grid mt-16 items-start md:mt-24">
            {pair.map((dish, j) => (
              <DishItem key={dish.id} dish={dish} i={p * 2 + j} plateLabel={plateLabel} />
            ))}
          </div>
        ))}

        <div className="tm-grid mt-24 md:mt-36">
          <div className="col-span-6 border-t border-line pt-8 md:col-span-5 md:col-start-8" data-reveal="fade-up">
            <Button href={menuHref} variant="outline">
              {menuLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
