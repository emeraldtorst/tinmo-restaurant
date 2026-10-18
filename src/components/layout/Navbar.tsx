"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import ReserveButton from "@/components/ui/ReserveButton";
import { useLocaleText } from "@/components/ui/LocaleProvider";
import LanguageSwitch from "@/components/layout/LanguageSwitch";
import MobileMenu from "@/components/layout/MobileMenu";
import { cn } from "@/lib/cn";
import type { NavLink } from "@/types/content";

interface NavbarProps {
  links: NavLink[];
  homeHref: string;
}

/**
 * Fixed header. Transparent (bone text) over the hero; turns solid paper + hairline once the hero
 * sentinel (`[data-hero-sentinel]`) leaves the viewport. Pages without a hero start solid.
 * Reserve is always one tap away, including on mobile.
 */
export default function Navbar({ links, homeHref }: NavbarProps) {
  const { ui } = useLocaleText();
  const pathname = usePathname();
  const isHome = pathname === homeHref;
  const [open, setOpen] = useState(false);
  const [heroPassed, setHeroPassed] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const sentinel = document.querySelector("[data-hero-sentinel]");
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => setHeroPassed(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isHome]);

  // Pages without a hero are solid from the start.
  const solid = !isHome || heroPassed;
  const dark = !solid && !open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-[450ms]",
          dark ? "border-transparent text-bone" : "border-line bg-paper text-ink",
          open && "border-transparent bg-transparent text-bone",
        )}
        data-tone={dark || open ? "dark" : "light"}
      >
        <div className="mx-auto flex h-[4.5rem] w-full max-w-content items-center justify-between px-gutter">
          <Link href={homeHref} aria-label={ui.homeAria} className="font-display text-[1.625rem] font-light tracking-[0.08em]">
            {site.name}
          </Link>

          <nav aria-label={ui.navPrimary} className="hidden items-center gap-10 lg:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="tm-link tm-tap tm-label">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitch className="hidden lg:flex" />
            <ReserveButton size="sm" tone={dark || open ? "dark" : "light"} arrow={false} />
            <button
              type="button"
              className="tm-label -mr-2 inline-flex h-11 min-w-11 items-center justify-center px-2 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? ui.menuClose : ui.menuOpen}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} links={links} />
    </>
  );
}
