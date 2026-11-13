import type { CSSProperties } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { MenuButton } from "@/components/ui/MenuViewer";
import ReserveButton from "@/components/ui/ReserveButton";
import MediaImage from "@/components/ui/MediaImage";
import HeroVideo from "@/components/sections/HeroVideo";
import type { HeroVideoMedia, ImageAsset } from "@/types/content";

interface HeroProps {
  /** The page heading read by search engines and screen readers (the logo image alone says only "TINMO"). */
  heading: string;
  line: string;
  menuLabel: string;
  image: ImageAsset;
  video: HeroVideoMedia;
}

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Full-screen hero: the room (photo, then looping video), the TINMO logo, one line and two buttons. */
export default function Hero({ heading, line, menuLabel, image, video }: HeroProps) {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      data-tone="dark"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-bone"
    >
      <div className="absolute inset-0">
        <MediaImage asset={image} sizes="100vw" ratio="fill" priority hover={false} reveal={false} quality={100} />
        <HeroVideo media={video} />
        <div className="scrim-bottom absolute inset-0" />
        <div className="scrim-top absolute inset-0" />
      </div>

      <Container className="relative pb-12 pt-40 md:pb-20">
        <h1 id="hero-title" className="tm-enter m-0">
          <span className="sr-only">{heading}</span>
          <Image
            src="/brand/tinmo-logo-cream.png"
            alt=""
            aria-hidden="true"
            width={1400}
            height={427}
            priority
            sizes="(min-width: 768px) 44rem, 82vw"
            className="h-auto w-[min(82vw,44rem)]"
          />
        </h1>
        <p className="tm-enter mt-6 max-w-[38rem] font-display text-[1.0625rem] leading-snug md:text-lead" style={delay(200)}>
          {line}
        </p>
        <div className="tm-enter mt-8 flex flex-wrap gap-3" style={delay(350)}>
          <ReserveButton tone="dark" />
          <MenuButton tone="dark" id="food">
            {menuLabel}
          </MenuButton>
        </div>
      </Container>
      <div data-hero-sentinel aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-24 h-px" />
    </section>
  );
}
