import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "solid" | "outline";
export type ButtonTone = "light" | "dark";
export type ButtonSize = "sm" | "md" | "lg";

interface CommonProps {
  variant?: ButtonVariant;
  /** Surface the button sits on: `light` = paper/stone, `dark` = ink or photography. */
  tone?: ButtonTone;
  size?: ButtonSize;
  /** Show the nudging arrow (default true). */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

type AnchorRest = {
  href: string;
  /** Force new-tab behaviour. Defaults to true for http(s) URLs. */
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children" | "className">;

type NativeRest = {
  href?: undefined;
  /** Visibly disabled + explained state. Use `disabledReason` to say why. */
  disabled?: boolean;
  disabledReason?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "children" | "className" | "disabled">;

export type ButtonProps = CommonProps & (AnchorRest | NativeRest);

function isAnchor(rest: AnchorRest | NativeRest): rest is AnchorRest {
  return typeof rest.href === "string";
}

function Arrow() {
  return (
    <svg
      className="tm-btn__arrow"
      width="18"
      height="10"
      viewBox="0 0 18 10"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 5h16.5M12.5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

/**
 * Rectangular button / link-button with a bottom-up fill wipe on hover and focus.
 * - `solid`: primary action — ink on light surfaces, bone on dark (Reserve a Table).
 * - `outline`: secondary action (Explore the Menu, View Full Menu, Get Directions…).
 * Renders `<a>` / `<Link>` when `href` is given, otherwise a real `<button>`.
 */
export default function Button({
  variant = "outline",
  tone = "light",
  size = "md",
  arrow = true,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn("tm-btn", className);
  const data = {
    "data-variant": variant,
    "data-tone": tone,
    "data-size": size === "md" ? undefined : size,
  };
  const content = (
    <>
      <span>{children}</span>
      {arrow ? <Arrow /> : null}
    </>
  );

  if (isAnchor(rest)) {
    const { href, external, ...anchor } = rest;
    const isWeb = /^https?:/.test(href);
    const isExternal = external ?? (isWeb || /^(mailto:|tel:)/.test(href));
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          {...data}
          {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : null)}
          {...anchor}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...data} {...anchor}>
        {content}
      </Link>
    );
  }

  const { disabled, disabledReason, type = "button", onClick, ...button } = rest;
  return (
    <button
      type={type}
      className={classes}
      {...data}
      {...(disabled ? { "aria-disabled": true, title: disabledReason } : null)}
      onClick={disabled ? undefined : onClick}
      {...button}
    >
      {content}
    </button>
  );
}
