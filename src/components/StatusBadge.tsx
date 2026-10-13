import { namaStatus, type StatusKode } from "@/lib/nota";
import { IkonStatus } from "./IkonStatus";

export const WARNA_STATUS: Record<StatusKode, string> = {
  diterima: "bg-stone-100 text-stone-700",
  dicuci: "bg-sky-100 text-sky-800",
  disetrika: "bg-amber-100 text-amber-800",
  siap: "bg-emerald-100 text-emerald-800",
  diambil: "bg-stone-200 text-stone-500",
};

export function StatusBadge({ status }: { status: StatusKode }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium ${WARNA_STATUS[status]}`}
    >
      <IkonStatus status={status} className="h-4 w-4" />
      {namaStatus(status)}
    </span>
  );
}
