import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import PlaceholderNote from "@/components/ui/PlaceholderNote";
import Button from "@/components/ui/Button";
import type { Review, ReviewsContent } from "@/types/content";

function Attribution({ review, illustrative }: { review: Review; illustrative: string }) {
  if (review.illustrative) return <p className="tm-label mt-3 text-muted-strong">{illustrative}</p>;
  return (
    <div className="mt-3">
      {review.rating ? (
        <p className="tm-label text-ink" aria-label={`${review.rating} out of 5`}>
          <span aria-hidden="true">
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </span>
        </p>
      ) : null}
      {review.author ? <p className="tm-label mt-1 text-muted-strong">{review.author}</p> : null}
    </div>
  );
}

/** 05 — Guest notes. The quiet beat: text only, renders whatever `ReviewsContent` it is given. */
interface GuestReviewsProps {
  content: ReviewsContent;
  labels: { illustrative: string; googlePending: string; googlePendingReason: string; readMore: string };
}

export default function GuestReviews({ content, labels }: GuestReviewsProps) {
  const [lead, ...rest] = content.reviews;
  const { source } = content;
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-stone py-[calc(var(--spacing-section)*0.8)]">
      <Container>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <div className="tm-grid mt-14 md:mt-20">
          <RevealText id="reviews-title" text={content.heading} className="col-span-6 text-display-md md:col-span-7" />
          {source.isPlaceholder && source.disclosure ? (
            <PlaceholderNote className="col-span-6 mt-6 md:col-span-4 md:col-start-9 md:mt-3">{source.disclosure}</PlaceholderNote>
          ) : null}
        </div>

        {lead ? (
          <div className="tm-grid mt-16 md:mt-24">
            <figure className="col-span-6 m-0 md:col-span-8">
              <div className="mb-8 h-px w-12 bg-accent" data-reveal="rule" aria-hidden="true" />
              <blockquote className="m-0">
                <p className="font-display text-display-md font-light" data-reveal="fade-up">
                  {lead.quote}
                </p>
              </blockquote>
              <figcaption>
                <Attribution review={lead} illustrative={labels.illustrative} />
              </figcaption>
            </figure>
            <ul className="col-span-6 m-0 mt-14 list-none p-0 md:col-span-4 md:mt-0">
              {rest.map((review) => (
                <li key={review.id} className="border-t border-line py-6" data-reveal="fade-up">
                  <blockquote className="m-0">
                    <p className="text-body">{review.quote}</p>
                  </blockquote>
                  <Attribution review={review} illustrative={labels.illustrative} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-16 md:mt-24">
          {source.listingUrl ? (
            <Button href={source.listingUrl} variant="outline">
              {labels.readMore}
            </Button>
          ) : (
            <Button variant="outline" disabled disabledReason={labels.googlePendingReason} arrow={false}>
              {labels.googlePending}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
