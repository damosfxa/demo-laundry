import Link from "next/link";
import { TOKO } from "@/lib/toko";

export function Header({ subjudul, kanan }: { subjudul?: string; kanan?: React.ReactNode }) {
  return (
    <header className="flex items-center justify-between gap-3">
      <Link href="/" className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-700 text-sm font-bold tracking-wide text-white">
          {TOKO.inisial}
        </span>
        <span className="leading-tight">
          <span className="flex items-center gap-2 font-bold text-stone-900">
            {TOKO.nama}
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">Contoh</span>
          </span>
          <span className="block text-sm text-stone-500">{subjudul ?? TOKO.tagline}</span>
        </span>
      </Link>
      {kanan}
    </header>
  );
}
