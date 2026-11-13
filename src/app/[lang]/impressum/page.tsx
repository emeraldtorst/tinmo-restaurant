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
  const t = getText(lang).legal.imprint;
  return { title: t.title, description: t.description };
}

/** Legal notice (Impressum). Details come from site.legal (Firmenbuch + GISA); empty fields are left out. */
export default async function ImprintPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const text = getText(lang);
  const t = text.legal.imprint;
  const address = getAddress(text.placeholders);
  const phone = getPhone(text.placeholders);
  const email = getEmail(text.placeholders);
  const l = site.legal;

  const rows: Array<{ label: string; value: string | null; href?: string }> = [
    { label: t.rows.operator, value: l.operatorName },
    { label: t.rows.legalForm, value: l.legalForm },
    {
      label: t.rows.seat,
      value: [l.seat, address.isPlaceholder ? null : address.lines.join(", ")].filter(Boolean).join(" · ") || null,
    },
    { label: t.rows.managing, value: l.managingDirector },
    { label: t.rows.contact, value: [phone.isPlaceholder ? null : phone.text, email.isPlaceholder ? null : email.text].filter(Boolean).join(" · ") || null },
    { label: t.rows.register, value: l.companyRegister },
    { label: t.rows.vat, value: l.vatId },
    { label: t.rows.trade, value: l.tradeWording },
    { label: t.rows.authority, value: l.tradeAuthority },
    { label: t.rows.chamber, value: l.chamber },
    { label: t.rows.regulations, value: t.rows.regulationsValue },
    { label: t.rows.purpose, value: t.rows.purposeValue },
  ];

  return (
    <section aria-labelledby="imprint-title" className="bg-paper pb-section pt-[calc(var(--spacing-section)*0.9)]">
      <Container width="narrow">
        <h1 id="imprint-title" className="text-display-md">
          {t.title}
        </h1>
        <p className="mt-6 max-w-[34rem] text-body text-muted-strong">{t.intro}</p>

        <dl className="mt-14 border-b border-line">
          {rows
            .filter((row) => row.value)
            .map((row) => (
              <div key={row.label} className="grid grid-cols-[minmax(0,1fr)] gap-1 border-t border-line py-5 md:grid-cols-[16rem_minmax(0,1fr)] md:gap-8">
                <dt className="tm-label text-muted-strong">{row.label}</dt>
                <dd className="[overflow-wrap:anywhere]">{row.value}</dd>
              </div>
            ))}
        </dl>

        <p className="mt-12">
          <Link href={localePath(lang, "/")} className="tm-link tm-label" data-underline>
            ← {text.ui.backHome}
          </Link>
        </p>
      </Container>
    </section>
  );
}
