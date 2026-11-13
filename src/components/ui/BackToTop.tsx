"use client";

import { useEffect, useState } from "react";
import { useLocaleText } from "@/components/ui/LocaleProvider";

/** A small round button that appears after a screen or so of scrolling and glides back to the top. */
export default function BackToTop() {
  const { ui } = useLocaleText();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setShow(window.scrollY > window.innerHeight * 1.2);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      className="tm-top"
      data-show={show}
      aria-label={ui.backToTop}
      tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
        <path d="M7 15.5V1.5M1.5 6.5L7 1l5.5 5.5" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    </button>
  );
}
