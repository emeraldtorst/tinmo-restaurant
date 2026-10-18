"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocaleText } from "@/components/ui/LocaleProvider";
import type { HeroMedia } from "@/types/content";

interface NavigatorWithConnection extends Navigator {
  connection?: { saveData?: boolean };
}

const noopSubscribe = () => () => {};
const canPlayMotion = () =>
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  (navigator as NavigatorWithConnection).connection?.saveData !== true;
const isNarrow = () => window.matchMedia("(max-width: 820px)").matches;

/**
 * Muted looping background video with a visible pause/play control.
 * Not mounted visually when: reduced motion, Save-Data, or the video errors — the poster
 * underneath (rendered by <Hero/>) is then the whole hero. Pauses while off-screen.
 */
export default function HeroVideo({ media }: { media: HeroMedia }) {
  const { ui } = useLocaleText();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  // Browser-only preferences, read without effects: the server snapshot is "off", the client snapshot is real.
  const supported = useSyncExternalStore(noopSubscribe, canPlayMotion, () => false);
  const narrow = useSyncExternalStore(noopSubscribe, isNarrow, () => false);
  const enabled = supported && !failed;
  const variants = narrow ? media.variants.portrait : media.variants.landscape;

  useEffect(() => {
    const video = ref.current;
    if (!enabled || !video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [enabled, variants]);

  if (!enabled) return null;

  return (
    <>
      <video
        ref={ref}
        key={variants[0]?.src}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms]"
        style={{ opacity: ready ? 1 : 0 }}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-label={media.videoLabel}
        onPlaying={() => {
          setReady(true);
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      >
        {variants.map((v) => (
          <source key={v.src} src={v.src} type={v.type} />
        ))}
      </video>
      <button
        type="button"
        className="tm-label absolute bottom-8 right-gutter z-10 inline-flex h-11 w-11 items-center justify-center border border-bone/70 text-bone"
        aria-label={playing ? ui.pauseVideo : ui.playVideo}
        onClick={() => {
          const video = ref.current;
          if (!video) return;
          if (video.paused) void video.play();
          else video.pause();
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="currentColor">
          {playing ? (
            <>
              <rect x="1.5" y="1" width="3" height="10" />
              <rect x="7.5" y="1" width="3" height="10" />
            </>
          ) : (
            <path d="M2 1l9 5-9 5z" />
          )}
        </svg>
      </button>
    </>
  );
}
