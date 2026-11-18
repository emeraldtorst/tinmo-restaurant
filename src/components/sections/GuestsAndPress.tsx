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

/** The five stars, three guest quotes, then the two press articles. Quiet and light, on the page's cream. */
export default function GuestsAndPress({ locale, text }: { locale: Locale; text: GuestsText }) {
  const fmt = new Intl.DateTimeFormat(locale === "de" ? "de-AT" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <section id="guests" aria-labelledby="guests-title" className="bg-paper py-section">
      <Container>
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
            <p className="mt-2 text-small text-muted-strong">{text.ratingLine}</p>
          </div>
        </div>

        <ul className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
          {reviews.map((r) => (
            <li key={r.name} className="flex flex-col border border-line bg-bone p-6 md:p-8">
              <span role="img" aria-label={text.stars} className="text-[0.95rem] tracking-[0.2em] text-accent">
                ★★★★★
              </span>
              <blockquote lang="de" className="mt-4 flex-1 font-display text-[1.125rem] leading-snug md:text-[1.1875rem]">
                „{r.text}“
              </blockquote>
              <p className="mt-6 text-small">
                <span className="font-medium">{r.name}</span>
                <span className="text-muted-strong"> · Google · {r.when[locale]}</span>
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

        <h3 className="mt-16 text-display-sm md:mt-24">{text.pressHeading}</h3>
        <ul className="mt-6 grid gap-8 md:grid-cols-2 md:gap-10">
          {press.map((p, i) => (
            <li key={p.url} className="border-t border-line pt-5">
              <p className="tm-label text-muted-strong">
                {p.outlet} · <time dateTime={p.date}>{fmt.format(new Date(p.date))}</time>
              </p>
              <h4 lang="de" className="mt-3 font-display text-[1.375rem] leading-snug md:text-[1.5rem]">
                {p.title}
              </h4>
              <p className="mt-3 max-w-[34rem] text-muted-strong">{text.summaries[i]}</p>
              <a className="tm-link tm-tap mt-4 inline-flex text-small" data-underline href={p.url} target="_blank" rel="noopener noreferrer">
                {text.readArticle}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
