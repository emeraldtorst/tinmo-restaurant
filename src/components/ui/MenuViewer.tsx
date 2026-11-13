"use client";

import Image from "next/image";
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
import Button, { type ButtonSize, type ButtonTone, type ButtonVariant } from "@/components/ui/Button";
import { useLocaleText } from "@/components/ui/LocaleProvider";
import { menuFiles, type MenuId } from "@/content/menus";
import { cn } from "@/lib/cn";

interface MenuContextValue {
  /** Open the menu pop-out, optionally on a specific menu. */
  open: (id?: MenuId) => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

export function useMenuViewer(): MenuContextValue {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenuViewer must be used inside <MenuProvider>");
  return ctx;
}

/**
 * One native <dialog> for the whole site that shows the menu PDFs in a pop-out, with a tab per menu.
 * The PDF is only loaded once the dialog is opened. Phones often show just the first page of an embedded PDF,
 * so "Open PDF" (full browser viewer) is always one tap away in the header.
 */
export function MenuProvider({ children }: { children: ReactNode }) {
  const { menus } = useLocaleText();
  const ref = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<MenuId>("food");
  const [shown, setShown] = useState(false);

  const open = useCallback((id?: MenuId) => {
    if (id) setActive(id);
    setShown(true);
    ref.current?.showModal();
  }, []);
  const close = useCallback(() => ref.current?.close(), []);
  const value = useMemo(() => ({ open }), [open]);

  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  const current = menuFiles.find((m) => m.id === active) ?? menuFiles[0];
  // Number the pages across spreads (for the image descriptions).
  let counter = 0;
  const numbered = current.spreads.map((spread) => spread.map((page) => ({ page, n: ++counter })));
  const totalPages = counter;

  return (
    <MenuContext.Provider value={value}>
      {children}
      <dialog
        ref={ref}
        className="tm-dialog tm-dialog--wide"
        aria-label={menus.title}
        onClick={onBackdropClick}
        onClose={() => setShown(false)}
        data-tone="light"
      >
        <div className="flex h-full flex-col">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-line bg-paper px-3 py-2 sm:px-5 sm:py-3">
            <div
              role="tablist"
              aria-label={menus.tabs}
              className="order-2 flex w-full min-w-0 gap-1.5 overflow-x-auto [scrollbar-width:none] sm:order-1 sm:w-auto sm:gap-2"
            >
              {menuFiles.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={m.id === active}
                  onClick={() => setActive(m.id)}
                  className={cn(
                    "tm-label whitespace-nowrap border px-3 py-2.5 transition-colors sm:px-4",
                    m.id === active ? "border-ink bg-ink text-paper" : "border-line hover:border-ink",
                  )}
                >
                  {menus[m.id].name}
                </button>
              ))}
            </div>
            <div className="order-1 ml-auto flex shrink-0 items-center gap-4 sm:order-2 sm:gap-5">
              <a href={current.file} target="_blank" rel="noopener noreferrer" className="tm-link tm-tap tm-label">
                {menus.openPdf}
              </a>
              <button type="button" className="tm-dialog__close tm-label" onClick={close}>
                {menus.close}
              </button>
            </div>
          </div>
          <div
            key={current.id}
            className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain bg-stone [-webkit-overflow-scrolling:touch]"
          >
            {shown ? (
              <ol className="m-0 mx-auto flex max-w-[56rem] list-none flex-col gap-3 p-3 sm:gap-4 sm:p-5 xl:max-w-[80rem] xl:gap-6">
                {numbered.map((spread) => (
                  <li
                    key={spread[0].page.src}
                    className={cn("grid grid-cols-1 gap-3 sm:gap-4 xl:gap-0", spread.length === 2 ? "xl:grid-cols-2" : "xl:mx-auto xl:w-1/2")}
                  >
                    {spread.map(({ page, n }) => (
                      <Image
                        key={page.src}
                        src={page.src}
                        alt={`${menus[current.id].name}, ${n}/${totalPages}`}
                        width={page.width}
                        height={page.height}
                        unoptimized
                        sizes="(min-width: 1280px) 40rem, (min-width: 896px) 56rem, 100vw"
                        className="h-auto w-full bg-white shadow-sm"
                      />
                    ))}
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        </div>
      </dialog>
    </MenuContext.Provider>
  );
}

interface MenuButtonProps {
  id?: MenuId;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  arrow?: boolean;
  children: ReactNode;
}

/** A button that opens the menu pop-out. */
export function MenuButton({ id, variant = "outline", tone = "light", size = "md", arrow = false, children }: MenuButtonProps) {
  const { open } = useMenuViewer();
  return (
    <Button variant={variant} tone={tone} size={size} arrow={arrow} onClick={() => open(id)} aria-haspopup="dialog">
      {children}
    </Button>
  );
}

/** The three menus as large cards; each opens the pop-out on that menu. */
export function MenuCards({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { open } = useMenuViewer();
  const { menus } = useLocaleText();
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-3 md:gap-5">
      {menuFiles.map((m) => (
        <li key={m.id}>
          <button
            type="button"
            onClick={() => open(m.id)}
            aria-haspopup="dialog"
            className={cn(
              "flex h-full w-full flex-col justify-between gap-14 border p-6 text-left transition-colors duration-300 md:min-h-[14rem] md:p-8",
              tone === "dark" ? "border-bone/25 hover:bg-bone hover:text-ink" : "border-line hover:bg-ink hover:text-paper",
            )}
          >
            <span className="font-display text-display-sm">{menus[m.id].name}</span>
            <span>
              <span className="block text-small opacity-75">{menus[m.id].note}</span>
              <span className="mt-4 inline-block border-b border-current pb-0.5 font-medium">{menus.view}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
