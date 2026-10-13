"use client";

import { useState } from "react";
import { IkonWa } from "@/components/IkonWa";
import { StatusBadge } from "@/components/StatusBadge";
import { linkWa, namaLayanan, pesanWa, STATUS, type Nota, type StatusKode } from "@/lib/nota";
import { resetDataContoh, ubahStatus, useDaftarNota } from "@/lib/penyimpanan";

export default function HalamanPemilik() {
  const daftar = useDaftarNota();
  const [kodePratinjau, setKodePratinjau] = useState<string | null>(null);
  // Ambil dari daftar terbaru supaya pesan ikut status yang baru diubah
  const pratinjau = daftar?.find((n) => n.kode === kodePratinjau) ?? null;

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">Daftar cucian</h1>

      <section className="space-y-3">
        {daftar?.map((n) => (
          <article key={n.kode} className="space-y-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-bold">{n.nama}</p>
                <p className="text-sm text-stone-500">
                  <span className="font-mono">{n.kode}</span> · {namaLayanan(n.layanan)}, {n.berat} kg
                </p>
              </div>
              <StatusBadge status={n.status} />
            </div>

            <div className="flex gap-2">
              <select
                value={n.status}
                onChange={(e) => ubahStatus(n.kode, e.target.value as StatusKode)}
                aria-label={`Ubah status cucian ${n.nama}`}
                className="min-w-0 flex-1 rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              >
                {STATUS.map((s) => (
                  <option key={s.kode} value={s.kode}>
                    {s.nama}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setKodePratinjau(n.kode)}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                <IkonWa className="h-4 w-4" />
                Kabari
              </button>
            </div>
          </article>
        ))}
      </section>

      {daftar && (
        <footer className="space-y-2 pt-2 text-center">
          <p className="text-sm text-stone-400">Ini data contoh, tersimpan di HP ini saja.</p>
          <button type="button" onClick={resetDataContoh} className="text-sm text-stone-500 underline">
            Kembalikan data contoh
          </button>
        </footer>
      )}

      {pratinjau && <PratinjauWa nota={pratinjau} tutup={() => setKodePratinjau(null)} />}
    </div>
  );
}

function PratinjauWa({ nota, tutup }: { nota: Nota; tutup: () => void }) {
  const alamat = window.location.origin;

  return (
    <div className="fixed inset-0 z-10 flex items-end justify-center bg-stone-900/40 sm:items-center" onClick={tutup}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="judul-pratinjau"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl space-y-4 rounded-t-3xl bg-white p-5 pb-8 sm:rounded-3xl sm:pb-5"
      >
        <div className="space-y-1">
          <h2 id="judul-pratinjau" className="text-lg font-bold">
            Pesan untuk {nota.nama}
          </h2>
          <p className="text-sm text-stone-500">Pesan ini otomatis menyesuaikan status cucian.</p>
        </div>

        <p className="rounded-2xl rounded-tl-sm bg-emerald-50 p-4 text-sm leading-relaxed break-words text-stone-800 ring-1 ring-emerald-100">
          {pesanWa(nota, alamat)}
        </p>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={tutup}
            className="rounded-xl bg-stone-100 py-3 font-semibold text-stone-700 hover:bg-stone-200"
          >
            Tutup
          </button>
          <a
            href={linkWa(nota, alamat)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            <IkonWa className="h-4 w-4" />
            Buka WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
