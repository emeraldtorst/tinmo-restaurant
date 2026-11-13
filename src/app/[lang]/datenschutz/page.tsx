import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { site } from "@/content/site";
import { getText } from "@/content/text";
import { hasLocale } from "@/i18n/config";
import { getAddress, getEmail, getPhone } from "@/lib/contact";
import { localePath } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getText(lang).legal.privacy;
  return { title: t.title, description: t.description };
}

/** Privacy policy (Datenschutzerklärung). Company details are filled in from site.legal and site.contact. */
export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const text = getText(lang);
  const t = text.legal.privacy;
  const values: Record<string, string> = {
    "{email}": getEmail(text.placeholders).text,
    "{phone}": getPhone(text.placeholders).text,
    "{company}": site.legal.operatorName ?? site.name,
    "{address}": getAddress(text.placeholders).lines.join(", "),
    "{register}": site.legal.companyRegister ?? "",
  };
  const fill = (s: string) => Object.entries(values).reduce((out, [key, value]) => out.split(key).join(value), s);

  return (
    <section aria-labelledby="privacy-title" className="bg-paper pb-section pt-[calc(var(--spacing-section)*0.9)]">
      <Container width="narrow">
        <h1 id="privacy-title" className="text-display-md">
          {t.title}
        </h1>
        <p className="mt-6 max-w-[34rem] text-body text-muted-strong">{t.intro}</p>
        <p className="mt-3 text-small text-muted-strong">{t.updated}</p>

        <div className="mt-14">
          {t.sections.map((section) => (
            <div key={section.heading} className="grid grid-cols-[minmax(0,1fr)] gap-3 border-t border-line py-8 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-8">
              <h2 className="text-display-sm md:text-[1.375rem]">{section.heading}</h2>
              <div className="grid max-w-[38rem] gap-4 text-body">
                {section.paragraphs.map((p) => (
                  <p key={p} className="[overflow-wrap:anywhere]">
                    {fill(p)}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 border-t border-line pt-8">
          <Link href={localePath(lang, "/")} className="tm-link tm-label" data-underline>
            ← {text.ui.backHome}
          </Link>
        </p>
      </Container>
    </section>
  );
}
