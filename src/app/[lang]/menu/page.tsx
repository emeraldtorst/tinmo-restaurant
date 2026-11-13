import { notFound, redirect } from "next/navigation";
import { hasLocale } from "@/i18n/config";

type Props = { params: Promise<{ lang: string }> };

/** The menus are PDFs shown in a pop-out on the home page; /menu just takes visitors to that section. */
export default async function MenuPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  redirect(`/${lang}#menu`);
}
