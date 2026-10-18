import { cn } from "@/lib/cn";

interface EyebrowProps {
  /** Full label, e.g. "02 — Story". Kept as one string so the copy stays editable. */
  children: string;
  className?: string;
  /** Reveal the label and draw the hairline when it enters the viewport (default true). */
  reveal?: boolean;
}

/**
 * Section folio: `02 — Story ————————————` — index, em dash, label, then a hairline
 * running to the end of the row. Opens every section in the same position (art-direction §10).
 * On dark surfaces wrap in (or place inside) an element with `data-tone="dark"`.
 */
export default function Eyebrow({ children, className, reveal = true }: EyebrowProps) {
  return (
    <p className={cn("tm-label tm-eyebrow", className)} data-reveal={reveal ? "fade" : undefined}>
      <span>{children}</span>
      <span
        className="tm-eyebrow__rule"
        aria-hidden="true"
        data-reveal={reveal ? "rule" : undefined}
      />
    </p>
  );
}
