import { cn } from "@/lib/cn";

/** Visible "this is placeholder content" label. Same slot and style in every section. */
export default function PlaceholderNote({ children, className }: { children: string; className?: string }) {
  return (
    <p className={cn("tm-label text-muted-strong", className)}>
      <span aria-hidden="true">— </span>
      {children}
    </p>
  );
}
