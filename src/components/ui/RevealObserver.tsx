"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One shared IntersectionObserver for every `[data-reveal]` element on the page.
 *
 * Contract (see globals.css + .claude/skills/motion-design):
 *  - Elements already in view when the page hydrates are marked `data-in` immediately
 *    (no hide-then-show flash).
 *  - Then `html.motion-ready` is set, which is the only thing that hides un-revealed content.
 *  - Elements gain `data-in` as they enter the viewport and are then unobserved.
 *  - Reduced motion: `motion-ok` is never set by the head script, so we do nothing.
 *  - If anything below throws or never runs, nothing was hidden — content stays visible.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion-ok") || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.in = "true";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    const seen = new WeakSet<Element>();
    const observe = (el: Element) => {
      if (seen.has(el) || (el as HTMLElement).dataset.in) return;
      seen.add(el);
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
      if (inView && !root.classList.contains("motion-ready")) {
        (el as HTMLElement).dataset.in = "true"; // already visible at load — don't animate
      } else {
        observer.observe(el);
      }
    };

    document.querySelectorAll("[data-reveal]").forEach(observe);
    root.classList.add("motion-ready");

    // Pick up nodes rendered later (client components, route changes).
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.hasAttribute("data-reveal")) observe(node);
          node.querySelectorAll("[data-reveal]").forEach(observe);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
