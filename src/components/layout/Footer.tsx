import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import ReserveButton from "@/components/ui/ReserveButton";
import { hoursBase } from "@/content/hours";
import { getFooterNav } from "@/content/navigation";
import { site } from "@/content/site";
import { getText } from "@/content/text";
import type { Locale } from "@/i18n/config";
import { getAddress, getEmail, getInstagram, getPhone } from "@/lib/contact";
import { localePath } from "@/lib/i18n";

function Item({ text, href }: { text: string; href: string | null }) {
  return href ? (
    <a href={href} className="tm-link tm-tap" {...(/^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : null)}>
      {text}
    </a>
  ) : (
    <span className="text-bone/75">{text}</span>
  );
}

/** 08 — Footer: the last frame. Quiet details above, one oversized wordmark filling the width. */
export default function Footer({ locale }: { locale: Locale }) {
  const text = getText(locale);
  const t = text.footer;
  const address = getAddress(text.placeholders);
  const phone = getPhone(text.placeholders);
  const email = getEmail(text.placeholders);
  const instagram = getInstagram(text.placeholders);

  return (
    <footer data-tone="dark" className="bg-ink text-bone">
      <Container className="pt-20 md:pt-28">
        <div className="mb-16 h-px bg-line-dark" aria-hidden="true" />
        <div className="tm-grid gap-y-10 md:gap-y-12">
          <div className="col-span-2 text-[0.8125rem] leading-snug md:col-span-4 md:text-small md:leading-normal">
            <p className="tm-label">{t.visit}</p>
            <p className="mt-4 text-bone/75">
              {address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className="mt-3 text-bone/75">
              <Link href={localePath(locale, "/#visit")} prefetch={false} className="tm-link tm-tap">
                {hoursBase.confirmed ? t.openingHours : text.visit.hoursLabel}
              </Link>
              {hoursBase.confirmed ? null : <span className="block text-bone/60">{t.placeholderTimes}</span>}
            </p>
            <div className="mt-6 hidden md:block">
              <ReserveButton tone="dark" size="sm" />
            </div>
          </div>

          <nav aria-label={text.ui.navFooter} className="col-span-2 md:col-span-3 md:col-start-6">
            <p className="tm-label">{t.navigate}</p>
            <ul className="m-0 mt-4 list-none p-0">
              {getFooterNav(locale).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={false} className="tm-link tm-tap font-display text-[1.125rem] font-light leading-snug md:text-display-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 text-[0.8125rem] leading-snug md:col-span-3 md:col-start-10 md:text-small md:leading-normal">
            <p className="tm-label">{t.contact}</p>
            <ul className="m-0 mt-4 grid list-none gap-3 p-0 [overflow-wrap:anywhere]">
              <li><Item text={phone.text} href={phone.href} /></li>
              <li><Item text={email.text} href={email.href} /></li>
              {instagram.isPlaceholder ? null : (
                <li>
                  <Item text={instagram.text} href={instagram.href} />
                </li>
              )}
            </ul>
          </div>

          <div className="col-span-6 md:hidden">
            <ReserveButton tone="dark" size="sm" />
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 text-small text-bone/60 md:flex-row md:items-start md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {t.rights}
          </p>
          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-1 p-0">
            <li>
              <Link href={localePath(locale, "/impressum")} prefetch={false} className="tm-link tm-tap">
                {text.nav.imprint}
              </Link>
            </li>
            <li>
              <Link href={localePath(locale, "/datenschutz")} prefetch={false} className="tm-link tm-tap">
                {text.nav.privacy}
              </Link>
            </li>
          </ul>
        </div>

        <Image
          src="/brand/tinmo-logo-cream.png"
          alt=""
          width={1400}
          height={427}
          sizes="(min-width: 1536px) 1440px, 92vw"
          className="mb-8 mt-14 h-auto w-full opacity-90"
        />
      </Container>
    </footer>
  );
}
