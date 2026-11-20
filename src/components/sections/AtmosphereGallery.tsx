import Ornament from "@/components/ui/Ornament";
import Container from "@/components/ui/Container";
import { Photo, type LightboxItem } from "@/components/ui/Lightbox";
import type { ImageAsset } from "@/types/content";

interface RoomProps {
  heading: string;
  /** The story, in paragraphs. The first one is set larger as the opening. */
  paragraphs: string[];
  /** Photographs in rows; every photo is shown whole, and the photos in a row share one height. */
  rows: ImageAsset[][];
}

/**
 * The room: rows where each photograph keeps its own shape (nothing is cropped) and the row shares one height, because
 * each photo's width follows its proportions. On a phone the photos simply stack. A tap opens a photo large.
 */
export default function AtmosphereGallery({ heading, paragraphs, rows }: RoomProps) {
  const [opening, ...rest] = paragraphs;
  const group: LightboxItem[] = rows.flat().map((image) => ({ image }));
  const indexed = rows.map((row) => row.map((image) => ({ image, index: group.findIndex((g) => g.image.src === image.src) })));

  return (
    <section id="room" aria-labelledby="room-title" className="bg-paper py-section">
      <Container>
        <div className="tm-grid gap-y-10">
          <div className="col-span-6 md:col-span-5">
            <Ornament />
            <h2 id="room-title" className="text-display-lg">
              {heading}
            </h2>
          </div>
          <div className="col-span-6 md:col-span-6 md:col-start-7 md:pt-3">
            <p className="font-display text-[1.375rem] leading-snug md:text-[1.75rem]">{opening}</p>
            <div className="mt-8 grid gap-5 text-muted-strong md:mt-10">
              {rest.map((p) => (
                <p key={p} className="max-w-[36rem]">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 md:mt-16 md:gap-4">
          {indexed.map((row, r) => (
            <div key={r} className="flex flex-col gap-3 md:flex-row md:gap-4">
              {row.map(({ image, index }) => (
                <div
                  key={image.src}
                  className="min-w-0 md:[flex:var(--a)_1_0%]"
                  style={{ ["--a" as string]: image.width / image.height }}
                >
                  <Photo group={group} index={index} sizes={`(min-width: 768px) ${Math.round(100 / row.length)}vw, 100vw`} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
