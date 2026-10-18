"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { getEmail, getPhone } from "@/lib/contact";
import { useLocaleText } from "@/components/ui/LocaleProvider";
import RichInline from "@/components/ui/RichInline";

interface ReservationContextValue {
  /** Open the placeholder reservation dialog. */
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
 * It is only ever opened while `site.reservation.url` is null — i.e. before a real booking provider is
 * connected. It says so plainly and offers the contact route instead of pretending that a booking has been
 * made. Native <dialog> gives us a focus trap, Esc to close, inert background and focus restoration.
 */
export function ReservationProvider({ children }: { children: ReactNode }) {
  const { dialog, placeholders } = useLocaleText();
  const ref = useRef<HTMLDialogElement>(null);
  const open = useCallback(() => ref.current?.showModal(), []);
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
        className="tm-dialog"
        aria-labelledby="reservation-title"
        aria-describedby="reservation-desc"
        onClick={onBackdropClick}
        data-tone="light"
      >
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

          <p className="mt-8 border-l border-accent pl-4 text-small text-muted-strong">{dialog.devNote}</p>

          <div className="mt-8 flex justify-end">
            <button type="button" className="tm-dialog__close tm-label" onClick={close}>
              {dialog.close}
            </button>
          </div>
        </div>
      </dialog>
    </ReservationContext.Provider>
  );
}
