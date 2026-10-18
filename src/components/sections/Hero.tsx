import type { CSSProperties } from "react";
import Container from "@/components/ui/Container";
import ReserveButton from "@/components/ui/ReserveButton";
import Button from "@/components/ui/Button";
import HeroPoster from "@/components/sections/HeroPoster";
import HeroVideo from "@/components/sections/HeroVideo";
import { SHOW_MEDIA } from "@/content/flags";
import type { HeroMedia } from "@/types/content";

interface HeroProps {
  name: string;
  copy: { eyebrow: string; menuLabel: string; tagline: string };
  menuHref: string;
  media: HeroMedia;
}

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** 01 — Cinematic hero. Footage is the negative space; wordmark bottom-left, nothing centred. */
export default function Hero({ name, copy, menuHref, media }: HeroProps) {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      data-tone="dark"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-bone"
    >
      <div className="absolute inset-0" aria-hidden={SHOW_MEDIA ? undefined : true}>
        {SHOW_MEDIA ? (
          <>
            <HeroPoster landscape={media.poster} portrait={media.posterPortrait} />
            <HeroVideo media={media} />
          </>
        ) : null}
        <div className="scrim-bottom absolute inset-0" />
        <div className="scrim-top absolute inset-0" />
      </div>

      <Container className="relative pb-12 pt-40 md:pb-16">
        <div className="tm-grid items-end">
          <div className="col-span-6 md:col-span-4 md:col-start-9 md:mb-10">
            <p className="tm-label tm-eyebrow tm-enter-fade" style={delay(900)}>
              <span>{copy.eyebrow}</span>
              <span className="tm-eyebrow__rule" aria-hidden="true" />
            </p>
            <p className="tm-enter mt-6 max-w-[20rem] font-display text-lead font-light" style={delay(900)}>
              {copy.tagline}
            </p>
            <div className="tm-enter mt-8 flex flex-wrap gap-3" style={delay(1200)}>
              <ReserveButton tone="dark" />
              <Button href={menuHref} variant="outline" tone="dark">
                {copy.menuLabel}
              </Button>
            </div>
          </div>
          <h1
            id="hero-title"
            className="col-span-6 mt-14 font-display text-display-xl font-light md:col-span-12 md:mt-0 md:-mb-[0.06em]"
            aria-label={name}
          >
            <span aria-hidden="true">
              {name.split("").map((letter, i) => (
                <span key={i} className="tm-word">
                  <span className="tm-word__in tm-enter-mask" style={delay(200 + i * 90)}>
                    {letter}
                  </span>
                </span>
              ))}
            </span>
          </h1>
        </div>
      </Container>
      <div data-hero-sentinel aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-24 h-px" />
    </section>
  );
}
