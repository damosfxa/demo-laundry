// Ikon gelembung chat sederhana (bukan logo resmi WhatsApp)
export function IkonWa({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" />
      <path d="M9 10.5c.5 2 2 3.5 4.5 4.5l1.2-1.2-1.7-1-1 .7c-.8-.4-1.4-1-1.8-1.8l.7-1-1-1.7z" />
    </svg>
  );
}
