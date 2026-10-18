import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import PlaceholderNote from "@/components/ui/PlaceholderNote";
import Button from "@/components/ui/Button";
import ReserveButton from "@/components/ui/ReserveButton";
import MapEmbed from "@/components/ui/MapEmbed";
import { getHours } from "@/content/hours";
import { site } from "@/content/site";
import { getText } from "@/content/text";
import type { Locale } from "@/i18n/config";
import { getAddress, getEmail, getPhone } from "@/lib/contact";
import { getDirections } from "@/lib/directions";
import { localePath } from "@/lib/i18n";

function Value({ text, href, placeholder }: { text: string; href: string | null; placeholder: boolean }) {
  if (href) {
    return (
      <a href={href} className="tm-link tm-tap">
        {text}
      </a>
    );
  }
  return <span className={placeholder ? "text-muted-strong" : undefined}>{text}</span>;
}

/** 06 — Visit. Quick actions first on mobile (reserve / directions / call); details + map beneath. */
export default function VisitSection({ locale }: { locale: Locale }) {
  const text = getText(locale);
  const t = text.visit;
  const hours = getHours(locale);
  const address = getAddress(text.placeholders);
  const phone = getPhone(text.placeholders);
  const email = getEmail(text.placeholders);
  const directions = getDirections();

  return (
    <section id="visit" aria-labelledby="visit-title" className="overflow-x-clip bg-paper py-section">
      <Container>
        <Eyebrow>{t.eyebrow}</Eyebrow>

        <div className="tm-grid mt-14 md:mt-20">
          <div className="col-span-6 md:col-span-5">
            <RevealText id="visit-title" text={t.heading} className="text-display-md" />
            <p className="mt-6 max-w-[26rem] text-body text-muted-strong" data-reveal="fade-up">
              {t.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3" data-reveal="fade-up">
              <ReserveButton />
              {directions.href ? (
                <Button href={directions.href} variant="outline">
                  {text.ui.getDirections}
                </Button>
              ) : (
                <Button variant="outline" disabled disabledReason={text.ui.directionsPendingReason} arrow={false}>
                  {text.ui.directionsPending}
                </Button>
              )}
              {phone.href ? (
                <Button href={phone.href} variant="outline" arrow={false}>
                  {text.ui.call}
                </Button>
              ) : null}
            </div>

            <dl className="mt-14 grid gap-8 text-body">
              <div className="border-t border-line pt-5" data-reveal="fade-up">
                <dt className="tm-label text-muted-strong">{t.address}</dt>
                <dd className="mt-2">
                  <address className="not-italic">
                    {address.lines.map((line) => (
                      <span key={line} className={address.isPlaceholder ? "block text-muted-strong" : "block"}>
                        {line}
                      </span>
                    ))}
                  </address>
                </dd>
              </div>
              <div className="border-t border-line pt-5" data-reveal="fade-up">
                <dt className="tm-label text-muted-strong">{t.phone}</dt>
                <dd className="mt-2">
                  <Value text={phone.text} href={phone.href} placeholder={phone.isPlaceholder} />
                </dd>
              </div>
              <div className="border-t border-line pt-5" data-reveal="fade-up">
                <dt className="tm-label text-muted-strong">{t.email}</dt>
                <dd className="mt-2">
                  <Value text={email.text} href={email.href} placeholder={email.isPlaceholder} />
                </dd>
              </div>
            </dl>

            <div className="mt-16">
              <h3 className="text-display-sm" data-reveal="fade-up">
                {hours.label}
              </h3>
              <table className="mt-6 w-full border-collapse text-body tabular-nums">
                <caption className="sr-only">{hours.label}</caption>
                <tbody>
                  {hours.rows.map((row) => (
                    <tr key={row.day} className="border-t border-line">
                      <th scope="row" className="py-3.5 pr-6 text-left font-normal">
                        {t.days[row.day]}
                      </th>
                      <td className="py-3.5 text-right text-muted-strong">
                        {row.opens && row.closes ? `${row.opens} – ${row.closes}` : text.ui.closed}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-line">
                    <td colSpan={2} className="pt-3" />
                  </tr>
                </tbody>
              </table>
              {!hours.confirmed ? <PlaceholderNote className="mt-2">{hours.note}</PlaceholderNote> : null}
            </div>
          </div>

          <div className="col-span-6 mt-16 md:sticky md:top-28 md:col-span-6 md:col-start-7 md:mt-0 md:self-start">
            <div className="md:-mr-gutter" data-reveal="fade">
              <MapEmbed
                embedUrl={site.location.embedUrl}
                mapsUrl={site.location.mapsUrl}
                privacyHref={localePath(locale, "/datenschutz")}
                labels={t.map}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
