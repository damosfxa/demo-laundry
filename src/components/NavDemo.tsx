"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TAB = [
  { href: "/", label: "Pelanggan" },
  { href: "/pemilik", label: "Pemilik" },
];

const PETUNJUK: Record<string, string> = {
  "/": "Ini demo. Coba ketik nomor nota LDY-1002, lalu buka tab Pemilik untuk mengubah statusnya.",
  "/pemilik":
    "Coba tambah nota baru atau ubah status cucian, tekan Kabari untuk melihat pesan WhatsApp-nya, lalu cek hasilnya di tab Pelanggan.",
};

export function NavDemo() {
  const path = usePathname();

  return (
    <div className="space-y-3">
      <nav className="grid grid-cols-2 gap-1 rounded-2xl bg-stone-200/70 p-1">
        {TAB.map((t) => {
          const aktif = path === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={aktif ? "page" : undefined}
              className={`rounded-xl py-2.5 text-center font-semibold ${
                aktif ? "bg-white text-teal-800 shadow-sm" : "text-stone-500 hover:text-stone-800"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>
      {PETUNJUK[path] && (
        <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-200">
          {PETUNJUK[path]}
        </p>
      )}
    </div>
  );
}
