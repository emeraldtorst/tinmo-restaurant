"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { getAddress, getPhone } from "@/lib/contact";
import LanguageSwitch from "@/components/layout/LanguageSwitch";
import ReserveButton from "@/components/ui/ReserveButton";
import { useLocaleText } from "@/components/ui/LocaleProvider";
import type { NavLink } from "@/types/content";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}

/** Full-screen overlay menu: focus moves in, Tab is trapped, Esc closes, scroll is locked. */
export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const { ui, placeholders, cuisine } = useLocaleText();
  const ref = useRef<HTMLDivElement>(null);
  const address = getAddress(placeholders);
  const phone = getPhone(placeholders);

  useEffect(() => {
    if (!open) return;
    const root = ref.current;
    if (!root) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(root.querySelectorAll<HTMLElement>("a[href], button:not([aria-disabled='true'])"));
    focusables()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={ui.menuOpen}
      hidden={!open}
      data-open={open}
      data-tone="dark"
      className="tm-mobile-menu fixed inset-0 z-40 bg-ink-soft text-bone lg:hidden"
    >
      <div className="flex h-full flex-col justify-between px-gutter pb-10 pt-28">
        <nav aria-label={ui.navMobile}>
          <ul className="m-0 list-none p-0">
            {links.map((link, i) => (
              <li key={link.href} className="tm-mobile-menu__item border-b border-line-dark" style={{ ["--i" as string]: i }}>
                <Link href={link.href} onClick={onClose} className="block py-5 font-display text-display-sm font-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="tm-mobile-menu__item" style={{ ["--i" as string]: 4 }}>
          <p className="tm-label text-bone">{cuisine}</p>
          <p className="mt-3 text-small text-bone/75">{address.lines.join(", ")}</p>
          <p className="mt-1 text-small text-bone/75">
            {phone.href ? <a href={phone.href}>{phone.text}</a> : phone.text}
          </p>
          <div className="mt-6 flex items-center justify-between">
            <ReserveButton tone="dark" size="lg" />
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </div>
  );
}
