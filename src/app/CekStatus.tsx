"use client";

import Link from "next/link";
import { IkonStatus } from "@/components/IkonStatus";
import { formatBerat, formatTanggal, namaLayanan, namaStatus, normalisasiKode, perkiraanSelesai, STATUS } from "@/lib/nota";
import { useDaftarNota } from "@/lib/penyimpanan";

export function CekStatus({ nota }: { nota: string }) {
  const daftar = useDaftarNota();
  const kode = normalisasiKode(nota);
  const data = kode && daftar ? (daftar.find((n) => n.kode === kode) ?? null) : null;
  const indexStatus = data ? STATUS.findIndex((s) => s.kode === data.status) : -1;

  return (
    <div className="space-y-6">

      <section className="space-y-4 rounded-3xl bg-teal-700 p-5 text-white">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Cek Status Cucian</h1>
          <p className="text-teal-50">Ketik nomor nota yang ada di struk Anda.</p>
        </div>
        <form action="/" className="flex gap-2">
          <input
            name="nota"
            defaultValue={nota}
            placeholder="Contoh: LDY-1001"
            aria-label="Nomor nota"
            autoComplete="off"
            autoCapitalize="characters"
            required
            className="min-w-0 flex-1 rounded-xl bg-white px-4 py-3 text-base text-stone-900 uppercase outline-none placeholder:normal-case placeholder:text-stone-400 focus:ring-4 focus:ring-teal-300"
          />
          <button
            type="submit"
            className="rounded-xl bg-amber-400 px-5 py-3 font-semibold text-stone-900 hover:bg-amber-300"
          >
            Cek
          </button>
        </form>
      </section>

      {nota && daftar && !data && (
        <p className="rounded-2xl bg-amber-50 px-4 py-3 text-amber-900">
          Nomor nota tidak ditemukan. Pastikan nomor sudah benar.
        </p>
      )}

      {data && (
        <section className="space-y-5 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
              <IkonStatus status={data.status} className="h-8 w-8" />
            </span>
            <div>
              <p className="text-sm text-stone-500">Halo {data.nama}, cucian Anda</p>
              <p className="text-xl font-bold text-teal-800">{namaStatus(data.status)}</p>
            </div>
          </div>

          <ol>
            {STATUS.map((s, i) => {
              const sudah = i <= indexStatus;
              const sekarang = i === indexStatus;
              return (
                <li key={s.kode} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        sekarang
                          ? "bg-teal-700 text-white ring-4 ring-teal-100"
                          : sudah
                            ? "bg-teal-600 text-white"
                            : "bg-stone-100 text-stone-400"
                      }`}
                    >
                      <IkonStatus status={s.kode} className="h-5 w-5" />
                    </span>
                    {i < STATUS.length - 1 && (
                      <span className={`h-5 w-0.5 ${i < indexStatus ? "bg-teal-600" : "bg-stone-200"}`} />
                    )}
                  </div>
                  <p
                    className={`pt-1.5 ${
                      sekarang ? "font-bold text-stone-900" : sudah ? "font-medium text-stone-700" : "text-stone-400"
                    }`}
                  >
                    {s.nama}
                  </p>
                </li>
              );
            })}
          </ol>

          <dl className="grid grid-cols-2 gap-4 rounded-2xl bg-stone-50 p-4 text-sm">
            <div>
              <dt className="text-stone-500">Nomor nota</dt>
              <dd className="font-mono font-medium">{data.kode}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Layanan</dt>
              <dd className="font-medium">
                {namaLayanan(data.layanan)}, {formatBerat(data.berat)}
              </dd>
            </div>
            <div>
              <dt className="text-stone-500">Tanggal masuk</dt>
              <dd className="font-medium">{formatTanggal(data.created_at)}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Perkiraan selesai</dt>
              <dd className="font-medium">{perkiraanSelesai(data.created_at)}</dd>
            </div>
          </dl>
        </section>
      )}

      {!data && daftar && (
        <section className="space-y-2">
          <p className="text-sm text-stone-500">Coba nomor contoh:</p>
          <div className="flex flex-wrap gap-2">
            {daftar.map((n) => (
              <Link
                key={n.kode}
                href={`/?nota=${n.kode}`}
                className="rounded-full bg-white px-3 py-1.5 font-mono text-sm ring-1 ring-stone-200 hover:ring-teal-600"
              >
                {n.kode}
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
