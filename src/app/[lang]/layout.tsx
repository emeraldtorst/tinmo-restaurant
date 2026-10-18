import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getPrimaryNav } from "@/content/navigation";
import { site } from "@/content/site";
import { getText } from "@/content/text";
import { hasLocale, locales, type Locale } from "@/i18n/config";
import { localePath } from "@/lib/i18n";
import { buildRestaurantJsonLd, serializeJsonLd } from "@/lib/structured-data";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { LocaleProvider } from "@/components/ui/LocaleProvider";
import RevealObserver from "@/components/ui/RevealObserver";
import { ReservationProvider } from "@/components/ui/ReservationDialog";
import "../globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

type LangParams = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getText(lang).meta;
  const other = locales.find((l) => l !== lang) as Locale;

  return {
    ...(site.url ? { metadataBase: new URL(site.url) } : null),
    title: { default: t.title, template: `%s — ${site.name}` },
    description: t.description,
    applicationName: site.name,
    // Canonical + hreflang only exist once a real domain is configured (NEXT_PUBLIC_SITE_URL).
    ...(site.url
      ? { alternates: { canonical: `/${lang}`, languages: { de: "/de", en: "/en", "x-default": "/de" } } }
      : null),
    // A placeholder site must not be indexed: it goes live when the domain env var is set.
    robots: site.url ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t.title,
      description: t.description,
      locale: getText(lang).ogLocale,
      alternateLocale: [getText(other).ogLocale],
      ...(site.url ? { url: `/${lang}` } : null),
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
  };
}

export const viewport: Viewport = {
  themeColor: "#F8F7F3",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before first paint. Sets `motion-ok` only when the visitor has NOT asked for reduced motion —
 * every reveal animation is gated on this class (see globals.css).
 */
const motionGate = `(function(){try{if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("motion-ok")}}catch(e){}})();`;

export default async function RootLayout({ children, params }: LangParams & { children: ReactNode }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const text = getText(lang);

  return (
    <html lang={text.htmlLang} className={`${fraunces.variable} ${hanken.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
      </head>
      <body>
        <a href="#main" className="tm-skip">
          {text.ui.skip}
        </a>
        <LocaleProvider
          value={{
            locale: lang,
            ui: text.ui,
            nav: text.nav,
            dialog: text.dialog,
            placeholders: text.placeholders,
            cuisine: text.meta.cuisine,
          }}
        >
          <ReservationProvider>
            <Navbar links={getPrimaryNav(lang)} homeHref={localePath(lang, "/")} />
            <main id="main">{children}</main>
            <Footer locale={lang} />
          </ReservationProvider>
          <RevealObserver />
        </LocaleProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildRestaurantJsonLd(lang)) }}
        />
      </body>
    </html>
  );
}
