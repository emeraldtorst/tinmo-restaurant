import Link from "next/link";
import Container from "@/components/ui/Container";

/** 404 inside the site frame. Shown in both languages because a missing page has no reliable locale. */
export default function NotFound() {
  return (
    <section className="bg-paper pb-section pt-[calc(var(--spacing-section)*1.1)]">
      <Container width="narrow">
        <p className="tm-label text-muted-strong">404</p>
        <h1 className="mt-6 text-display-lg">
          Seite nicht gefunden.
          <br />
          <em>Page not found.</em>
        </h1>
        <p className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
          <Link href="/de" className="tm-link tm-label" data-underline>
            Zur Startseite
          </Link>
          <Link href="/en" className="tm-link tm-label" data-underline>
            Back to the homepage
          </Link>
        </p>
      </Container>
    </section>
  );
}
