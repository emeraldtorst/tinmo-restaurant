"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import type { ImageAsset } from "@/types/content";
import { cn } from "@/lib/cn";
import { SHOW_MEDIA } from "@/content/flags";
import { useLocaleText } from "@/components/ui/LocaleProvider";

interface MediaImageProps {
  asset: ImageAsset;
  /** Truthful responsive `sizes` for the slot, e.g. "(min-width: 1024px) 40vw, 90vw". REQUIRED. */
  sizes: string;
  /** CSS aspect-ratio of the frame, e.g. "4 / 5". Defaults to the asset's own ratio. `"fill"` fills the (positioned) parent; `"css"` leaves the ratio to className (e.g. responsive aspect classes). */
  ratio?: string;
  /** `arch` rounds the top into a half-circle (use sparingly: max 2 per page). */
  shape?: "rect" | "arch";
  /** LCP / above-the-fold images only. */
  priority?: boolean;
  /** Editorial clip + settle reveal on scroll (default true). */
  reveal?: boolean;
  /** Subtle hover zoom on pointer devices (default true). */
  hover?: boolean;
  /** Stagger delay in ms. */
  delay?: number;
  /** Override the asset's focal point. */
  objectPosition?: string;
  className?: string;
  quality?: 60 | 75 | 85;
}

/**
 * The one way TINMO renders photography.
 * - Explicit aspect-ratio box (no layout shift) + average-colour backing.
 * - next/image `fill` with blur placeholder and a truthful `sizes`.
 * - Failure fallback: a stone panel in the image's own colour, never a broken icon.
 * - Decorative images (empty alt) are hidden from assistive tech.
 */
export default function MediaImage({
  asset,
  sizes,
  ratio,
  shape = "rect",
  priority = false,
  reveal = true,
  hover = true,
  delay = 0,
  objectPosition,
  className,
  quality = 75,
}: MediaImageProps) {
  const [failed, setFailed] = useState(false);
  const { ui } = useLocaleText();
  const decorative = asset.alt === "";

  const style: CSSProperties = {
    ...(ratio === "fill"
      ? { position: "absolute", inset: 0 }
      : ratio === "css"
        ? null
        : { aspectRatio: ratio ?? `${asset.width} / ${asset.height}` }),
    ...(SHOW_MEDIA && asset.color ? { backgroundColor: asset.color } : null),
    ...(delay ? ({ "--d": `${delay}ms` } as CSSProperties) : null),
  };

  return (
    <div
      className={cn("tm-media", shape === "arch" && "tm-media--arch", !SHOW_MEDIA && "tm-media--blank", className)}
      style={style}
      data-reveal={reveal && !priority ? "image" : undefined}
      data-hover={hover ? "zoom" : undefined}
    >
      {!SHOW_MEDIA ? null : failed ? (
        <div className="tm-media__fallback tm-label" role={decorative ? undefined : "img"} aria-label={decorative ? undefined : asset.alt} aria-hidden={decorative || undefined}>
          <span aria-hidden="true">{ui.imageUnavailable}</span>
        </div>
      ) : (
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={priority}
          placeholder={asset.blurDataURL ? "blur" : "empty"}
          blurDataURL={asset.blurDataURL}
          style={{ objectPosition: objectPosition ?? asset.objectPosition ?? "50% 50%" }}
          aria-hidden={decorative || undefined}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
