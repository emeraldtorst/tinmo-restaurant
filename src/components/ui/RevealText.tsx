import type { CSSProperties, ElementType } from "react";
import type { RichText } from "@/types/content";
import { cn } from "@/lib/cn";

interface RevealTextProps {
  /** Plain string or a RichText array with `{ em }` segments for italic emphasis. */
  text: string | RichText;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Class applied to italic-emphasis words, e.g. "text-accent" (only the Story headline uses accent). */
  emClassName?: string;
  /** Extra delay (ms) before the first word rises. */
  delay?: number;
  /** Reveal on scroll (default). Set false to render static text. */
  reveal?: boolean;
}

type Word = { text: string; em: boolean };

function toWords(text: string | RichText): Word[] {
  const segments = typeof text === "string" ? [text] : text;
  const words: Word[] = [];
  for (const segment of segments) {
    const em = typeof segment !== "string";
    const value = typeof segment === "string" ? segment : segment.em;
    for (const piece of value.split(/(\s+)/)) {
      if (piece === "") continue;
      if (/^\s+$/.test(piece)) {
        words.push({ text: " ", em: false });
      } else {
        words.push({ text: piece, em });
      }
    }
  }
  // Merge punctuation-only tokens ("." after an italic word) into the previous word.
  const merged: Word[] = [];
  for (const word of words) {
    const prev = merged[merged.length - 1];
    if (prev && prev.text !== " " && word.text !== " " && /^[.,;:!?)"”’—–-]+$/.test(word.text)) {
      prev.text += word.text;
    } else if (prev && prev.text === " " && word.text === " ") {
      continue;
    } else {
      merged.push({ ...word });
    }
  }
  return merged;
}

/**
 * Headline whose words rise out of a mask, staggered 70ms apart (see motion-design).
 * Server component: the stagger is pure CSS (`--i`), the reveal is triggered by the
 * shared <RevealObserver/> via `data-reveal="words"`. Without JS or with reduced
 * motion the text is simply visible.
 */
export default function RevealText({
  text,
  as: Tag = "h2",
  className,
  id,
  emClassName,
  delay = 0,
  reveal = true,
}: RevealTextProps) {
  const words = toWords(text);
  let index = 0;

  return (
    <Tag
      id={id}
      className={cn(className)}
      data-reveal={reveal ? "words" : undefined}
      style={delay ? ({ "--d": `${delay}ms` } as CSSProperties) : undefined}
    >
      {words.map((word, i) => {
        if (word.text === " ") return " ";
        const style = { "--i": index++ } as CSSProperties;
        const inner = (
          <span className="tm-word__in" style={style}>
            {word.text}
          </span>
        );
        return (
          <span key={i} className={cn("tm-word", word.em && "tm-em", word.em && emClassName)}>
            {inner}
          </span>
        );
      })}
    </Tag>
  );
}
