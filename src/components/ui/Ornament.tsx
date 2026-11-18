/** A small gold diamond and hairline that opens a section. Decorative only, so it is hidden from screen readers. */
export default function Ornament({ className }: { className?: string }) {
  return <span aria-hidden="true" className={`tm-ornament ${className ?? ""}`} />;
}
