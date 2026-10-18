import type { RichText } from "@/types/content";

/** Renders a RichText value inline: plain strings as text, `{ em }` segments as <em>. */
export default function RichInline({ text }: { text: string | RichText }) {
  const segments = typeof text === "string" ? [text] : text;
  return (
    <>
      {segments.map((segment, i) =>
        typeof segment === "string" ? segment : <em key={i}>{segment.em}</em>,
      )}
    </>
  );
}
