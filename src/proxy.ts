import { NextResponse, type NextRequest } from "next/server";

const locales = ["de", "en"];
const defaultLocale = "de";

/** Pick the visitor's language from Accept-Language: German or English, German when unsure. */
function pickLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language") ?? "";
  for (const part of header.split(",")) {
    const tag = part.trim().split(";")[0].toLowerCase();
    if (tag.startsWith("de")) return "de";
    if (tag.startsWith("en")) return "en";
  }
  return defaultLocale;
}

/** "/" and any path without a language prefix are redirected to /de/… or /en/… (no cookies involved). */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  request.nextUrl.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (icons, media, robots.txt, sitemap.xml).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
