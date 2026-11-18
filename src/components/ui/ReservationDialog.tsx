"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { site } from "@/content/site";
import { getEmail, getPhone } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { useLocaleText } from "@/components/ui/LocaleProvider";
import RichInline from "@/components/ui/RichInline";

interface ReservationContextValue {
  /** Open the reservation dialog. */
  open: () => void;
}

const ReservationContext = createContext<ReservationContextValue | null>(null);

export function useReservationDialog(): ReservationContextValue {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error("useReservationDialog must be used inside <ReservationProvider>");
  return ctx;
}

/**
 * Mounts one native <dialog> for the whole site and exposes `open()`.
 *  - With `site.reservation.embedUrl` (TheFork) the dialog shows the booking system. It is only loaded after the visitor
 *    clicks "Reserve", so nothing is requested from TheFork before that. A link to open it in its own tab, plus phone and
 *    email, stay visible in case the embedded form cannot load.
 *  - Without it the dialog just offers phone and email.
 * Native <dialog> gives us a focus trap, Esc to close, inert background and focus restoration.
 */
export function ReservationProvider({ children }: { children: ReactNode }) {
  const { dialog, placeholders } = useLocaleText();
  const ref = useRef<HTMLDialogElement>(null);
  const [shown, setShown] = useState(false);
  const embedUrl = site.reservation.embedUrl;

  const open = useCallback(() => {
    setShown(true);
    ref.current?.showModal();
  }, []);
  const close = useCallback(() => ref.current?.close(), []);
  const value = useMemo(() => ({ open }), [open]);

  const phone = getPhone(placeholders);
  const email = getEmail(placeholders);

  // Click on the backdrop (the <dialog> element itself, outside the panel) closes it.
  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
      <dialog
        ref={ref}
        className={cn("tm-dialog", embedUrl && "tm-dialog--booking")}
        aria-labelledby="reservation-title"
        aria-describedby={embedUrl ? undefined : "reservation-desc"}
        onClick={onBackdropClick}
        onClose={() => setShown(false)}
        data-tone="light"
      >
        {embedUrl ? (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
              <h2 id="reservation-title" className="text-display-sm">
                <RichInline text={dialog.title} />
              </h2>
              <div className="flex shrink-0 items-center gap-4">
                <a href={embedUrl} target="_blank" rel="noopener noreferrer" className="tm-link tm-tap tm-label hidden sm:inline-flex">
                  {dialog.openNewTab}
                </a>
                <button type="button" className="tm-dialog__close tm-label" onClick={close}>
                  {dialog.close}
                </button>
              </div>
            </div>

            <div className="relative min-h-0 flex-1 bg-white">
              {shown ? (
                <iframe
                  src={embedUrl}
                  title={dialog.eyebrow}
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : null}
            </div>

            <p className="border-t border-line px-4 py-3 text-small text-muted-strong sm:px-6">
              {dialog.phoneHint}{" "}
              {phone.href ? (
                <a className="tm-link" data-underline href={phone.href}>
                  {phone.text}
                </a>
              ) : (
                phone.text
              )}
              {" · "}
              {email.href ? (
                <a className="tm-link" data-underline href={email.href}>
                  {email.text}
                </a>
              ) : (
                email.text
              )}
              {" · "}
              <a className="tm-link" data-underline href={embedUrl} target="_blank" rel="noopener noreferrer">
                {dialog.openNewTab}
              </a>
            </p>
          </div>
        ) : (
          <div className="tm-dialog__panel">
            <p className="tm-label text-muted-strong">{dialog.eyebrow}</p>
            <h2 id="reservation-title" className="mt-4 text-display-sm">
              <RichInline text={dialog.title} />
            </h2>
            <p id="reservation-desc" className="mt-5 max-w-measure text-muted-strong">
              {dialog.body}
            </p>

            <dl className="mt-8 grid gap-5 border-t border-line pt-6 text-small">
              <div>
                <dt className="tm-label text-muted-strong">{dialog.call}</dt>
                <dd className="mt-1.5">
                  {phone.href ? (
                    <a className="tm-link" data-underline href={phone.href}>
                      {phone.text}
                    </a>
                  ) : (
                    <span className="text-muted-strong">{phone.text}</span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="tm-label text-muted-strong">{dialog.email}</dt>
                <dd className="mt-1.5">
                  {email.href ? (
                    <a className="tm-link" data-underline href={email.href}>
                      {email.text}
                    </a>
                  ) : (
                    <span className="text-muted-strong">{email.text}</span>
                  )}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex justify-end">
              <button type="button" className="tm-dialog__close tm-label" onClick={close}>
                {dialog.close}
              </button>
            </div>
          </div>
        )}
      </dialog>
    </ReservationContext.Provider>
  );
}
