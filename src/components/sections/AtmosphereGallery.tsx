import Container from "@/components/ui/Container";
import MediaImage from "@/components/ui/MediaImage";
import type { ImageAsset } from "@/types/content";

interface RoomProps {
  heading: string;
  intro: string;
  /** One panoramic photograph, shown wide. */
  wide: ImageAsset;
  /** Four photographs in a row beneath it. */
  photos: ImageAsset[];
}

/** The room: one whole photograph, then four portraits with identical framing and spacing. */
export default function AtmosphereGallery({ heading, intro, wide, photos }: RoomProps) {
  return (
    <section id="room" aria-labelledby="room-title" className="bg-paper py-section">
      <Container>
        <h2 id="room-title" className="text-display-lg">
          {heading}
        </h2>
        <p className="mt-5 max-w-[44rem] font-display text-[1.0625rem] leading-snug md:text-lead text-muted-strong">{intro}</p>
      </Container>

      {/* The whole photograph, uncropped (its own 4:3 shape); on wide screens centred and capped so it stays on screen. */}
      <div className="mt-10 md:mx-auto md:mt-16 md:max-w-[72rem] md:px-gutter">
        <MediaImage asset={wide} sizes="(min-width: 1200px) 72rem, 100vw" />
      </div>

      <Container>
        <div className="mt-3 grid grid-cols-1 gap-3 md:mt-5 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
          {photos.map((image) => (
            <MediaImage
              key={image.src}
              asset={image}
              ratio="css"
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
              className="aspect-[4/3] md:aspect-[4/5]"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
