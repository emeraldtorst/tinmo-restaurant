import { getImageProps } from "next/image";
import type { ImageAsset } from "@/types/content";

/**
 * Hero poster with art direction: ONE image is fetched — the landscape poster from 768px up, the portrait
 * poster below. It is the LCP image and the fallback when the video cannot or should not play (reduced
 * motion, Save-Data, error), so it is eager + high priority.
 */
export default function HeroPoster({ landscape, portrait }: { landscape: ImageAsset; portrait: ImageAsset }) {
  const common = { fill: true, sizes: "100vw", priority: true, quality: 75 } as const;
  const { props: wide } = getImageProps({ ...common, alt: landscape.alt, src: landscape.src });
  const { props: tall } = getImageProps({ ...common, alt: portrait.alt, src: portrait.src });
  const { srcSet: wideSet, ...img } = wide;

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={wideSet} sizes="100vw" />
      <source media="(max-width: 767px)" srcSet={tall.srcSet} sizes="100vw" />
      {/* A plain <img> is required inside <picture>; its props come from next/image (getImageProps). */}
      <img {...img} alt={landscape.alt} style={{ ...img.style, objectFit: "cover", objectPosition: "50% 50%" }} />
    </picture>
  );
}
