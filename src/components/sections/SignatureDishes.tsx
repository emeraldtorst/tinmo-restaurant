import Container from "@/components/ui/Container";
import MediaImage from "@/components/ui/MediaImage";
import { MenuCards } from "@/components/ui/MenuViewer";
import type { ImageAsset } from "@/types/content";

interface FoodProps {
  heading: string;
  intro: string;
  items: Array<{ image: ImageAsset; caption: string }>;
}

/** The food: six square photographs on deep moss, each named after its dish on the menu, then the three menus. */
export default function SignatureDishes({ heading, intro, items }: FoodProps) {
  return (
    <section id="menu" aria-labelledby="menu-title" data-tone="dark" className="bg-ink py-section text-bone">
      <Container>
        <h2 id="menu-title" className="text-display-lg">
          {heading}
        </h2>
        <p className="mt-5 max-w-[34rem] font-display text-lead text-bone/80">{intro}</p>

        <ul className="m-0 mt-10 grid list-none grid-cols-2 gap-x-3 gap-y-8 p-0 md:mt-16 md:grid-cols-3 md:gap-x-5 md:gap-y-12">
          {items.map(({ image, caption }) => (
            <li key={image.src}>
              <figure className="m-0">
                <MediaImage asset={image} ratio="1 / 1" sizes="(min-width: 768px) 33vw, 50vw" />
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
