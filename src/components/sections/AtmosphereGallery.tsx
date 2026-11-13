import Container from "@/components/ui/Container";
import MediaImage from "@/components/ui/MediaImage";
import type { ImageAsset } from "@/types/content";

interface RoomProps {
  heading: string;
  intro: string;
  /** One panoramic photograph, shown wide. */
  wide: ImageAsset;
  /** Three photographs in a row beneath it. */
  trio: [ImageAsset, ImageAsset, ImageAsset];
}

/** The room: a wide cinematic frame, then three portraits with identical framing and spacing. */
export default function AtmosphereGallery({ heading, intro, wide, trio }: RoomProps) {
  return (
    <section id="room" aria-labelledby="room-title" className="bg-paper py-section">
      <Container>
        <h2 id="room-title" className="text-display-lg">
          {heading}
        </h2>
        <p className="mt-5 max-w-[34rem] font-display text-lead text-muted-strong">{intro}</p>
      </Container>

      <div className="mt-10 md:mt-16">
        <MediaImage
          asset={wide}
          ratio="css"
          sizes="100vw"
          quality={100}
          className="aspect-[4/3] md:aspect-[21/9]"
        />
      </div>

      <Container>
        <div className="mt-3 grid grid-cols-1 gap-3 md:mt-5 md:grid-cols-3 md:gap-5">
          {trio.map((image) => (
            <MediaImage key={image.src} asset={image} ratio="css" sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[4/3] md:aspect-[4/5]" />
          ))}
        </div>
      </Container>
    </section>
  );
}
