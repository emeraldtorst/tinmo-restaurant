import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import MediaImage from "@/components/ui/MediaImage";
import RevealText from "@/components/ui/RevealText";
import ReserveButton from "@/components/ui/ReserveButton";
import { SHOW_MEDIA } from "@/content/flags";
import { getPhone, type Placeholders } from "@/lib/contact";
import type { ImageAsset, RichText } from "@/types/content";

/** 07 — Reservation CTA. Ink surface, headline anchored low-left, one button. No form, no urgency. */
interface ReservationCTAProps {
  copy: { eyebrow: string; heading: RichText; text: string };
  image: ImageAsset;
  placeholders: Placeholders;
}

export default function ReservationCTA({ copy, image, placeholders }: ReservationCTAProps) {
  const phone = getPhone(placeholders);
  return (
    <section
      id="reserve"
      aria-labelledby="reserve-title"
      data-tone="dark"
      className="relative flex min-h-[90svh] flex-col justify-end overflow-hidden bg-accent-deep text-bone"
    >
      {SHOW_MEDIA ? (
        <div className="absolute inset-0" aria-hidden="true">
          <MediaImage asset={image} sizes="100vw" ratio="fill" hover={false} reveal={false} />
          <div className="scrim-flat absolute inset-0" />
          <div className="scrim-red absolute inset-0" />
          <div className="scrim-bottom absolute inset-0" />
        </div>
      ) : null}
      <Container className="relative pb-16 pt-32 md:pb-24">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <div className="tm-grid mt-14 items-end md:mt-24">
          <div className="col-span-6 md:col-span-8">
            <RevealText id="reserve-title" text={copy.heading} className="text-display-lg" />
            <p className="mt-6 max-w-[26rem] text-body text-bone/75" data-reveal="fade-up">
              {copy.text}
            </p>
            <div className="mt-10" data-reveal="fade-up">
              <ReserveButton tone="dark" size="lg" />
            </div>
          </div>
          <p className="col-span-6 mt-10 text-small text-bone/75 md:col-span-3 md:col-start-10 md:mt-0">
            {phone.href ? (
              <a href={phone.href} className="tm-link tm-tap">
                {phone.text}
              </a>
            ) : (
              phone.text
            )}
          </p>
        </div>
      </Container>
    </section>
  );
}
