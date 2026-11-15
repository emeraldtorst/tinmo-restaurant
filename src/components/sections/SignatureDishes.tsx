import Container from "@/components/ui/Container";
import { Photo, type LightboxItem } from "@/components/ui/Lightbox";
import { MenuCards } from "@/components/ui/MenuViewer";
import type { ImageAsset } from "@/types/content";

interface FoodProps {
  heading: string;
  intro: string;
  /** The two sushi photographs shown large at the top, side by side at the same height. */
  feature: { wide: ImageAsset; tall: ImageAsset; caption: string };
  items: Array<{ image: ImageAsset; caption: string }>;
}

/**
 * The food on deep moss: the sushi first (two photos that share one height), then the dishes, each photo whole in its
 * own 3:2 shape with its name beneath, then the menus. A tap on any photo opens it large, with arrows through the set.
 */
export default function SignatureDishes({ heading, intro, feature, items }: FoodProps) {
  const group: LightboxItem[] = [
    { image: feature.wide, caption: feature.caption },
    { image: feature.tall, caption: feature.caption },
    ...items,
  ];

  return (
    <section id="menu" aria-labelledby="menu-title" data-tone="dark" className="bg-ink py-section text-bone">
      <Container>
        <h2 id="menu-title" className="text-display-lg">
          {heading}
        </h2>
        <p className="mt-5 max-w-[44rem] font-display text-[1.0625rem] leading-snug md:text-lead text-bone/80">{intro}</p>

        <div className="mt-10 flex flex-col gap-3 md:mt-16 md:flex-row md:gap-4">
          {[feature.wide, feature.tall].map((image, i) => (
            <div key={image.src} className="min-w-0 md:[flex:var(--a)_1_0%]" style={{ ["--a" as string]: image.width / image.height }}>
              <Photo group={group} index={i} sizes="(min-width: 768px) 60vw, 100vw" />
            </div>
          ))}
        </div>
        <p className="mt-3 font-display text-[1.125rem] leading-snug md:text-[1.25rem]">{feature.caption}</p>

        <ul className="m-0 mt-12 grid list-none grid-cols-2 gap-x-3 gap-y-8 p-0 md:mt-16 md:grid-cols-3 md:gap-x-4 md:gap-y-10">
          {items.map(({ image, caption }, i) => (
            <li key={image.src}>
              <figure className="m-0">
                <Photo group={group} index={i + 2} sizes="(min-width: 768px) 33vw, 50vw" />
                <figcaption className="mt-3 font-display text-[1.125rem] leading-snug md:text-[1.25rem]">{caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-20 md:mt-28">
          <MenuCards />
        </div>
      </Container>
    </section>
  );
}
