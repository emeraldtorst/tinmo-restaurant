import Ornament from "@/components/ui/Ornament";
import Container from "@/components/ui/Container";
import { google, press, reviews } from "@/content/reviews";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";

export interface GuestsText {
  eyebrow: string;
  heading: string;
  ratingLine: string;
  original: string;
  allReviews: string;
  pressHeading: string;
  readArticle: string;
  stars: string;
  summaries: string[];
}

/** Google's four-colour "G" mark, drawn inline so nothing is requested from Google. */
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

/** The five stars, three guest quotes, then the two press articles. Quiet and light, on the page's cream. */
export default function GuestsAndPress({ locale, text }: { locale: Locale; text: GuestsText }) {
  const fmt = new Intl.DateTimeFormat(locale === "de" ? "de-AT" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
    <section id="guests" aria-labelledby="guests-title" className="bg-paper py-section">
      <Container>
        <Ornament />
        <p className="tm-label text-muted-strong">{text.eyebrow}</p>
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="guests-title" className="text-display-lg">
            {text.heading}
          </h2>
          <div className="md:text-right">
            <p className="flex items-baseline gap-3 md:justify-end">
              <span className="font-display text-[3rem] leading-none">{google.rating[locale]}</span>
              <span role="img" aria-label={text.stars} className="text-[1.25rem] tracking-[0.2em] text-accent">
                ★★★★★
              </span>
            </p>
            <p className="mt-3 flex items-center gap-2 text-small text-muted-strong md:justify-end">
              <GoogleG className="h-5 w-5 shrink-0" />
              <span>
                <span className="font-medium text-ink">Google Maps</span> · {text.ratingLine}
              </span>
            </p>
          </div>
        </div>

        <ul className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
          {reviews.map((r) => (
            <li key={r.name} className="tm-frame flex flex-col border border-line bg-bone p-7 md:p-9">
              <span role="img" aria-label={text.stars} className="text-[0.95rem] tracking-[0.2em] text-accent">
                ★★★★★
              </span>
              <blockquote lang="de" className="mt-4 flex-1 font-display text-[1.125rem] leading-snug md:text-[1.1875rem]">
                „{r.text}“
              </blockquote>
              <p className="mt-6 text-small">
                <span className="font-medium">{r.name}</span>
                <span className="text-muted-strong"> · {r.when[locale]}</span>
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-[0.8125rem] text-muted-strong">
                <GoogleG className="h-4 w-4 shrink-0" />
                Google Maps
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-small text-muted-strong">
          {text.original}{" "}
          {site.location.mapsUrl ? (
            <a className="tm-link" data-underline href={site.location.mapsUrl} target="_blank" rel="noopener noreferrer">
              {text.allReviews}
            </a>
          ) : null}
        </p>
      </Container>
    </section>

    <section id="press" aria-labelledby="press-title" data-tone="dark" className="bg-ink py-section text-bone">
      <Container>
        <Ornament />
        <h2 id="press-title" className="text-display-md">
          {text.pressHeading}
        </h2>
        <ul className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-8">
          {press.map((p, i) => (
            <li key={p.url} className="tm-frame flex flex-col border border-line-dark p-8 md:p-12">
              <span
                role="img"
                aria-label={p.outlet}
                className="block bg-bone"
                style={{
                  height: p.logo.height,
                  width: `calc(${p.logo.height} * ${p.logo.ratio})`,
                  maxWidth: "100%",
                  mask: `url(${p.logo.src}) left center / contain no-repeat`,
                  WebkitMask: `url(${p.logo.src}) left center / contain no-repeat`,
                }}
              />
              <div className="my-7 h-px w-full bg-line-dark" aria-hidden="true" />
              <p className="tm-label text-bone/70">
                <time dateTime={p.date}>{fmt.format(new Date(p.date))}</time>
              </p>
              <h3 lang="de" className="mt-3 font-display text-[1.5rem] leading-snug md:text-[1.75rem]">
                {p.title}
              </h3>
              <p className="mt-4 max-w-[34rem] flex-1 text-bone/75">{text.summaries[i]}</p>
              <a className="tm-link tm-tap mt-6 inline-flex text-small" data-underline href={p.url} target="_blank" rel="noopener noreferrer">
                {text.readArticle}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
    </>
  );
}
