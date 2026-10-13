import type { StatusKode } from "@/lib/nota";

const PATH: Record<StatusKode, React.ReactNode> = {
  // papan nota
  diterima: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 3h6v3H9zM9 11h6M9 15h4" />
    </>
  ),
  // mesin cuci
  dicuci: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="13" r="4" />
      <path d="M8 6.5h.01M11 6.5h.01" />
    </>
  ),
  // setrika
  disetrika: (
    <>
      <path d="M3 18h18v-2a7 7 0 0 0-7-7H8" />
      <path d="M8 9V6h7" />
    </>
  ),
  // tas siap diambil
  siap: (
    <>
      <path d="M5 8h14l-1 12H6z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      <path d="m9.5 14 2 2 3.5-4" />
    </>
  ),
  // selesai
  diambil: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
};

export function IkonStatus({ status, className = "h-5 w-5" }: { status: StatusKode; className?: string }) {
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
      {PATH[status]}
    </svg>
  );
}
