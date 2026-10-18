import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps {
  as?: ElementType;
  /** `wide` = 96rem (default), `narrow` = 64rem, `full` = no max width (gutters only). */
  width?: "wide" | "narrow" | "full";
  className?: string;
  children: ReactNode;
}

const widths = {
  wide: "max-w-content",
  narrow: "max-w-narrow",
  full: "",
} as const;

/** Horizontal page frame: fluid gutters + a controlled maximum width. */
export default function Container({
  as: Tag = "div",
  width = "wide",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-gutter", widths[width], className)}>{children}</Tag>
  );
}
