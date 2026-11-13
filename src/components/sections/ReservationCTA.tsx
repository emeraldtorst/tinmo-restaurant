import Container from "@/components/ui/Container";
import MediaImage from "@/components/ui/MediaImage";
import ReserveButton from "@/components/ui/ReserveButton";
import { getPhone, type Placeholders } from "@/lib/contact";
import type { ImageAsset } from "@/types/content";

interface ReservationCTAProps {
  heading: string;
  line: string;
  image: ImageAsset;
  placeholders: Placeholders;
}

/** Photo, one headline, one button. */
export default function ReservationCTA({ heading, line, image, placeholders }: ReservationCTAProps) {
  const phone = getPhone(placeholders);
  return (
    <section
      id="reserve"
      aria-labelledby="reserve-title"
      data-tone="dark"
      className="relative flex min-h-[70svh] flex-col justify-end overflow-hidden bg-ink text-bone"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <MediaImage asset={image} sizes="100vw" ratio="fill" hover={false} reveal={false} />
        <div className="scrim-flat absolute inset-0" />
        <div className="scrim-bottom absolute inset-0" />
      </div>
      <Container className="relative pb-14 pt-32 md:pb-20">
        <h2 id="reserve-title" className="text-display-lg">
          {heading}
        </h2>
        <p className="mt-4 max-w-[30rem] font-display text-lead text-bone/85">{line}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <ReserveButton tone="dark" size="lg" />
          {phone.href ? (
            <a href={phone.href} className="tm-link tm-tap text-small">
              {phone.text}
            </a>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
