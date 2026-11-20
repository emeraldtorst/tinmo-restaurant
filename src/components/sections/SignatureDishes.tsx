import Container from "@/components/ui/Container";
import { Photo, type LightboxItem } from "@/components/ui/Lightbox";
import { MenuCards } from "@/components/ui/MenuViewer";
import Ornament from "@/components/ui/Ornament";
import type { ImageAsset } from "@/types/content";

interface DishGroup {
  /** Small heading above the group, e.g. "Sushi". */
  label: string;
  /** Photographs in rows; every photo is shown whole, and the photos in a row share one height. */
  rows: ImageAsset[][];
}

interface FoodProps {
  heading: string;
  intro: string;
  groups: DishGroup[];
}

/**
 * The food on deep moss, in groups (sushi, hot dishes, dim sum, pâtisserie). Inside a group the photographs sit in rows
 * where each one keeps its own shape (nothing is cropped) and the row shares one height, because each photo's width
 * follows its proportions. A tap on any photo opens it large, with arrows through the whole set. The menus follow.
 */
export default function SignatureDishes({ heading, intro, groups }: FoodProps) {
  const all: LightboxItem[] = groups.flatMap((g) => g.rows.flat()).map((image) => ({ image }));
  let next = 0;
  const indexed = groups.map((g) => ({
    label: g.label,
    rows: g.rows.map((row) => row.map((image) => ({ image, index: next++ }))),
  }));

  return (
    <section id="menu" aria-labelledby="menu-title" data-tone="dark" className="bg-ink py-section text-bone">
      <Container>
        <Ornament />
        <h2 id="menu-title" className="text-display-lg">
          {heading}
        </h2>
        <p className="mt-5 max-w-[44rem] font-display text-[1.0625rem] leading-snug md:text-lead text-bone/80">{intro}</p>

        {indexed.map((group) => (
          <div key={group.label} className="mt-14 md:mt-20">
            <h3 className="flex items-center gap-5 font-display text-[1.5rem] leading-none md:text-[1.875rem]">
              {group.label}
              <span aria-hidden="true" className="h-px flex-1 bg-line-dark" />
            </h3>
            <div className="mt-6 flex flex-col gap-2 md:mt-8 md:gap-4">
              {group.rows.map((row, r) => (
                <div key={r} className="flex gap-2 md:gap-4">
                  {row.map(({ image, index }) => (
                    <div key={image.src} className="min-w-0 [flex:var(--a)_1_0%]" style={{ ["--a" as string]: image.width / image.height }}>
                      <Photo group={all} index={index} sizes={`(min-width: 768px) ${Math.round(100 / row.length)}vw, ${Math.round(100 / row.length)}vw`} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-20 md:mt-28">
          <MenuCards />
        </div>
      </Container>
    </section>
  );
}
