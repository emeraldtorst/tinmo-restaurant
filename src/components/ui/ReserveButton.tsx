"use client";

import { getReservationAction } from "@/lib/reservation";
import Button, { type ButtonSize, type ButtonTone, type ButtonVariant } from "@/components/ui/Button";
import { useLocaleText } from "@/components/ui/LocaleProvider";
import { useReservationDialog } from "@/components/ui/ReservationDialog";

interface ReserveButtonProps {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  arrow?: boolean;
  className?: string;
}

/**
 * The single "Reserve a Table" action used everywhere on the site.
 * - Booking URL configured -> a real link to it (new tab by default).
 * - Otherwise              -> opens the honest placeholder dialog.
 * Connect a real provider by setting `site.reservation.url`; no component changes needed.
 */
export default function ReserveButton({
  variant = "solid",
  tone = "light",
  size = "md",
  arrow = true,
  className,
}: ReserveButtonProps) {
  const action = getReservationAction();
  const { open } = useReservationDialog();
  const { ui } = useLocaleText();

  if (action.kind === "link") {
    return (
      <Button
        href={action.href}
        external={action.external}
        variant={variant}
        tone={tone}
        size={size}
        arrow={arrow}
        className={className}
      >
        {ui.reserve}
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      tone={tone}
      size={size}
      arrow={arrow}
      className={className}
      onClick={open}
      aria-haspopup="dialog"
    >
      {ui.reserve}
    </Button>
  );
}
