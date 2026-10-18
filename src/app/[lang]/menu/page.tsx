import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import PlaceholderNote from "@/components/ui/PlaceholderNote";
import RevealText from "@/components/ui/RevealText";
import ReserveButton from "@/components/ui/ReserveButton";
import { getMenu } from "@/content/menu";
import { getText } from "@/content/text";
import { hasLocale } from "@/i18n/config";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getText(lang).meta;
  return { title: t.menuTitle, description: t.menuDescription };
}

/** /menu — pure typography, no images. Edit the wording in text/en.ts + de.ts (or set site.menu.fullMenuUrl to a PDF). */
export default async function MenuPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const menu = getMenu(lang);

  return (
    <section aria-labelledby="menu-page-title" className="bg-paper pb-section pt-[calc(var(--spacing-section)*0.9)]">
      <Container>
        <Eyebrow>{menu.eyebrow}</Eyebrow>
        <div className="tm-grid mt-14 md:mt-20">
          <RevealText as="h1" id="menu-page-title" text={menu.heading} className="col-span-6 text-display-lg md:col-span-7" />
          <div className="col-span-6 mt-8 md:col-span-4 md:col-start-9 md:mt-3">
            <p className="max-w-[26rem] text-body text-muted-strong">{menu.intro}</p>
            {menu.isPlaceholder ? <PlaceholderNote className="mt-4">{menu.placeholderNote}</PlaceholderNote> : null}
            <div className="mt-8">
              <ReserveButton />
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-32">
          {menu.categories.map((category) => (
            <div key={category.id} className="tm-grid border-t border-line py-12 md:py-16">
              <div className="col-span-6 md:col-span-4">
                <h2 className="text-display-md">{category.title}</h2>
                {category.note ? <p className="mt-3 text-small text-muted-strong">{category.note}</p> : null}
              </div>
              <ul className="col-span-6 m-0 mt-8 list-none p-0 md:col-span-7 md:col-start-6 md:mt-0">
                {category.items.map((item) => (
                  <li key={item.name} className="flex items-baseline justify-between gap-6 border-b border-line py-5 first:pt-0 last:border-b-0">
                    <div>
                      <h3 className="text-display-sm">
                        {item.name}
                        {item.dietary?.length ? (
                          <span className="tm-label ml-3 align-middle text-muted-strong">{item.dietary.join(" · ")}</span>
                        ) : null}
                      </h3>
                      <p className="mt-2 max-w-[30rem] text-small text-muted-strong">{item.description}</p>
                    </div>
                    {item.price ? <p className="text-small font-medium tabular-nums">{item.price}</p> : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-[34rem] border-t border-line pt-6 text-small text-muted-strong">{menu.footnote}</p>
      </Container>
    </section>
  );
}
