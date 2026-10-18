import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Figure from "@/components/ui/Figure";
import RevealText from "@/components/ui/RevealText";
import type { GalleryContent, GalleryItem } from "@/types/content";

function Tile({
  item,
  n,
  sizes,
  className,
  mediaClassName,
}: {
  item: GalleryItem;
  n: number;
  sizes: string;
  className: string;
  mediaClassName: string;
}) {
  return (
    <Figure
      image={item.image}
      caption={item.caption}
      index={`04.${n}`}
      ratio="css"
      sizes={sizes}
      className={className}
      mediaClassName={mediaClassName}
    />
  );
}

/**
 * 04 — Atmosphere. Built as the twin of 02 — Story: same header (headline left, lead right), the same wide
 * full-bleed opening photograph, the same captions beneath every photo (red folio + label), the same gutters.
 * Then one tight mosaic. Composed for exactly seven items, in the order of `content.items`.
 *
 * Mobile (6 cols):   wide opener · pair · pair · wide · wide
 * Desktop (12 cols): opener (full bleed) · four 4:5 tiles in a row · table 7 + steam 5
 */
export default function AtmosphereGallery({ content }: { content: GalleryContent }) {
  const [pour, table, kitchen, detail, bar, plating, steam] = content.items;

  return (
    <section id="atmosphere" aria-labelledby="atmosphere-title" className="overflow-x-clip bg-paper py-section">
      <Container>
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <div className="tm-grid mt-14 items-end gap-y-8 md:mt-20">
          <RevealText id="atmosphere-title" text={content.heading} className="col-span-6 text-display-lg md:col-span-7" />
          <p
            className="col-span-6 max-w-[34rem] font-display text-lead font-light md:col-span-5 md:col-start-8 md:pb-3"
            data-reveal="fade-up"
          >
            {content.intro}
          </p>
        </div>
      </Container>

      {/* Opening shot — full bleed, exactly like the Story section */}
      <div className="mt-16 md:mt-24">
        <Figure
          image={bar.image}
          caption={bar.caption}
          index="04.1"
          ratio="css"
          mediaClassName="aspect-[4/3] md:aspect-[21/9]"
          sizes="100vw"
          className="[&>figcaption]:px-gutter"
        />
      </div>

      <Container>
        <div className="mt-16 grid grid-cols-6 gap-x-3 gap-y-9 md:mt-28 md:grid-cols-12 md:gap-x-5 md:gap-y-14">
          <Tile item={pour} n={2} sizes="(min-width: 768px) 25vw, 50vw" className="col-span-3 md:col-span-3" mediaClassName="aspect-[4/5]" />
          <Tile item={kitchen} n={3} sizes="(min-width: 768px) 25vw, 50vw" className="col-span-3 md:col-span-3" mediaClassName="aspect-[4/5]" />
          <Tile item={plating} n={4} sizes="(min-width: 768px) 25vw, 50vw" className="col-span-3 md:col-span-3" mediaClassName="aspect-[4/5]" />
          <Tile item={detail} n={5} sizes="(min-width: 768px) 25vw, 50vw" className="col-span-3 md:col-span-3" mediaClassName="aspect-[4/5]" />
          <Tile item={table} n={6} sizes="(min-width: 768px) 58vw, 100vw" className="col-span-6 md:col-span-7" mediaClassName="aspect-[3/2]" />
          <Tile
            item={steam}
            n={7}
            sizes="(min-width: 768px) 42vw, 100vw"
            className="col-span-6 md:col-span-5"
            mediaClassName="aspect-[16/9] md:aspect-auto md:flex-1"
          />
        </div>
      </Container>
    </section>
  );
}
