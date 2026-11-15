"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
  type TouchEvent,
} from "react";
import MediaImage from "@/components/ui/MediaImage";
import { useLocaleText } from "@/components/ui/LocaleProvider";
import type { ImageAsset } from "@/types/content";

export interface LightboxItem {
  image: ImageAsset;
  caption?: string;
}

interface LightboxContextValue {
  /** Open the large view on `items[index]`; the arrows move through `items`. */
  open: (items: LightboxItem[], index: number) => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

function useLightbox(): LightboxContextValue {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used inside <LightboxProvider>");
  return ctx;
}

/**
 * One native <dialog> for the whole site that shows a photograph large and uncropped. Arrow keys, the on-screen arrows and a
 * swipe move to the next photo; Esc, the close button or a tap on the dark background closes it.
 */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const { ui } = useLocaleText();
  const ref = useRef<HTMLDialogElement>(null);
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

  const open = useCallback((list: LightboxItem[], i: number) => {
    setItems(list);
    setIndex(i);
    ref.current?.showModal();
  }, []);
  const close = useCallback(() => ref.current?.close(), []);
  const go = useCallback((step: number) => setIndex((i) => (items.length ? (i + step + items.length) % items.length : 0)), [items.length]);
  const value = useMemo(() => ({ open }), [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!ref.current?.open) return;
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const onBackdropClick = (event: MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) close();
  };
  const onTouchStart = (event: TouchEvent) => {
    touchX.current = event.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (event: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = (event.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  const current = items[index];
  const many = items.length > 1;

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <dialog
        ref={ref}
        className="tm-dialog tm-dialog--photo"
        aria-label={current?.image.alt ?? ui.photoOpen}
        onClick={onBackdropClick}
        data-tone="dark"
      >
        {current ? (
          <div className="flex h-full flex-col" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className="flex items-center justify-between px-4 py-3 text-small sm:px-6">
              <span className="tabular-nums text-bone/70">{many ? `${index + 1} / ${items.length}` : ""}</span>
              <button type="button" className="tm-dialog__close tm-label" onClick={close}>
                {ui.photoClose}
              </button>
            </div>

            <div className="relative min-h-0 flex-1" onClick={onBackdropClick}>
              <Image
                key={current.image.src}
                src={current.image.src}
                alt={current.image.alt}
                fill
                sizes="100vw"
                quality={85}
                className="object-contain"
              />
              {many ? (
                <>
                  <button type="button" aria-label={ui.photoPrev} className="tm-lightbox__arrow left-2 sm:left-5" onClick={() => go(-1)}>
                    <svg width="14" height="22" viewBox="0 0 14 22" fill="none" aria-hidden="true">
                      <path d="M12 1L2 11l10 10" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </button>
                  <button type="button" aria-label={ui.photoNext} className="tm-lightbox__arrow right-2 sm:right-5" onClick={() => go(1)}>
                    <svg width="14" height="22" viewBox="0 0 14 22" fill="none" aria-hidden="true">
                      <path d="M2 1l10 10L2 21" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </button>
                </>
              ) : null}
            </div>

            <p className="min-h-[3.25rem] px-4 py-3 text-center font-display text-[1.0625rem] text-bone/85 sm:px-6">{current.caption ?? ""}</p>
          </div>
        ) : null}
      </dialog>
    </LightboxContext.Provider>
  );
}

interface PhotoProps {
  /** Every photo in this group, in order; the large view lets people move through them. */
  group: LightboxItem[];
  index: number;
  sizes: string;
}

/** A photograph, shown whole in its own shape; a tap opens it large. */
export function Photo({ group, index, sizes }: PhotoProps) {
  const { open } = useLightbox();
  const { ui } = useLocaleText();
  const item = group[index];
  return (
    <button
      type="button"
      onClick={() => open(group, index)}
      aria-haspopup="dialog"
      aria-label={`${ui.photoOpen}: ${item.image.alt}`}
      className="block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left"
    >
      <MediaImage asset={item.image} sizes={sizes} />
    </button>
  );
}
