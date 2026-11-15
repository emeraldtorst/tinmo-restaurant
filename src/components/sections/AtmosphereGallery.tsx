import Container from "@/components/ui/Container";
import { Photo, type LightboxItem } from "@/components/ui/Lightbox";
import type { ImageAsset } from "@/types/content";

interface RoomProps {
  heading: string;
  intro: string;
  /** Photographs in rows; every photo is shown whole, and the photos in a row share one height. */
  rows: ImageAsset[][];
}

/**
 * The room: rows where each photograph keeps its own shape (nothing is cropped) and the row shares one height, because
 * each photo's width follows its proportions. On a phone the photos simply stack. A tap opens a photo large.
 */
export default function AtmosphereGallery({ heading, intro, rows }: RoomProps) {
  const group: LightboxItem[] = rows.flat().map((image) => ({ image }));
  const indexed = rows.map((row) => row.map((image) => ({ image, index: group.findIndex((g) => g.image.src === image.src) })));

  return (
    <section id="room" aria-labelledby="room-title" className="bg-paper py-section">
      <Container>
        <h2 id="room-title" className="text-display-lg">
          {heading}
        </h2>
        <p className="mt-5 max-w-[44rem] font-display text-[1.0625rem] leading-snug md:text-lead text-muted-strong">{intro}</p>

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
