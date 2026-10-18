"use client";

import { usePathname } from "next/navigation";
import { locales } from "@/i18n/config";
import { swapLocale } from "@/lib/i18n";
import { useLocaleText } from "@/components/ui/LocaleProvider";
import { cn } from "@/lib/cn";

/**
 * DE / EN switch: plain links to the same page in the other language (no cookies, works without JS).
 * A full page load on purpose: the <html lang> and head change, so a client-side transition would re-render
 * the root layout.
 */
export default function LanguageSwitch({ className }: { className?: string }) {
  const pathname = usePathname();
  const { locale, ui } = useLocaleText();

  return (
    <nav aria-label={ui.language} className={cn("tm-label flex items-center gap-2", className)}>
      {locales.map((code, i) => (
        <span key={code} className="flex items-center gap-2">
          {i > 0 ? <span aria-hidden="true" className="opacity-40">/</span> : null}
          <a
            href={swapLocale(pathname, code)}
            lang={code}
            hrefLang={code}
            aria-current={code === locale ? "true" : undefined}
            className={cn(
              "inline-flex h-11 min-w-8 items-center justify-center",
              code === locale ? "underline underline-offset-[6px]" : "opacity-70 hover:opacity-100",
            )}
          >
            {code.toUpperCase()}
          </a>
        </span>
      ))}
    </nav>
  );
}
