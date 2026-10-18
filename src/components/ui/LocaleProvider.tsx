"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { TextBundle } from "@/content/text";

/** Only the strings that client components need — keeps legal and menu text out of the JS bundle. */
export interface ClientText {
  locale: Locale;
  ui: TextBundle["ui"];
  nav: TextBundle["nav"];
  dialog: TextBundle["dialog"];
  placeholders: TextBundle["placeholders"];
  cuisine: string;
}

const LocaleContext = createContext<ClientText | null>(null);

export function LocaleProvider({ value, children }: { value: ClientText; children: ReactNode }) {
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocaleText(): ClientText {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocaleText must be used inside <LocaleProvider>");
  return ctx;
}
