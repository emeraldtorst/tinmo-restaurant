import MediaImage from "@/components/ui/MediaImage";
import type { ImageAsset } from "@/types/content";
import { cn } from "@/lib/cn";

interface FigureProps {
  image: ImageAsset;
  /** Caption text, e.g. "The first pour". */
  caption: string;
  /** Folio shown before the caption, e.g. "04.3" (set in the accent red). */
  index?: string;
  sizes: string;
  ratio?: string;
  shape?: "rect" | "arch";
  className?: string;
  /** Extra classes for the image frame (e.g. responsive aspect ratios when `ratio="css"`). */
  mediaClassName?: string;
  delay?: number;
}

/** An unboxed photograph with a label-type caption beneath it ("04.3 — The first pour"). */
export default function Figure({ image, caption, index, sizes, ratio, shape, className, mediaClassName, delay }: FigureProps) {
  return (
    <figure className={cn("m-0 flex flex-col", className)}>
      <MediaImage
        asset={image}
        sizes={sizes}
        ratio={ratio}
        shape={shape}
        delay={delay}
        className={cn("min-h-0", mediaClassName)}
      />
      <figcaption className="tm-label mt-3 text-muted-strong" data-reveal="fade">
        {index ? (
          <>
            <span className="text-accent">{index}</span>
            {" — "}
          </>
        ) : null}
        {caption}
      </figcaption>
    </figure>
  );
}
