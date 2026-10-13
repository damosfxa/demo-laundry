"use client";

import { useSyncExternalStore } from "react";
import type { Nota, StatusKode } from "./nota";

// Data contoh disimpan di localStorage browser, tanpa server atau database.
const KUNCI = "demo-laundry:nota";
const JAM = 60 * 60 * 1000;

let cache: Nota[] | null = null;
const pendengar = new Set<() => void>();

// Tanggal dihitung dari waktu sekarang supaya demo selalu terlihat baru.
// hp sengaja kosong: tombol WA akan meminta memilih kontak, bukan ke nomor asing.
function buatDataContoh(): Nota[] {
  const sekarang = Date.now();
  const nota = (kode: string, nama: string, layanan: string, berat: number, status: StatusKode, jamLalu: number): Nota => ({
    kode,
    nama,
    hp: null,
    layanan,
    berat,
    status,
    created_at: new Date(sekarang - jamLalu * JAM).toISOString(),
  });
  return [
    nota("LDY-1003", "Mbak Rina", "setrika", 2, "diterima", 2),
    nota("LDY-1002", "Pak Andi", "cuci-kering", 5, "dicuci", 20),
    nota("LDY-1004", "Mas Dimas", "cuci-setrika", 4, "disetrika", 28),
    nota("LDY-1001", "Bu Sari", "cuci-setrika", 3.5, "siap", 40),
    nota("LDY-1005", "Bu Wati", "cuci-kering", 6, "diambil", 72),
  ];
}

function tulis(daftar: Nota[]) {
  try {
    localStorage.setItem(KUNCI, JSON.stringify(daftar));
  } catch {
    // Mode privat atau storage diblokir: demo tetap jalan dari memori
  }
}

function baca(): Nota[] {
  if (cache) return cache;
  try {
    const isi = JSON.parse(localStorage.getItem(KUNCI) ?? "null");
    if (Array.isArray(isi)) cache = isi as Nota[];
  } catch {
    // Data rusak atau storage diblokir: pakai data contoh
  }
  if (!cache) {
    cache = buatDataContoh();
    tulis(cache);
  }
  return cache;
}

function simpan(daftar: Nota[]) {
  cache = daftar;
  tulis(daftar);
  pendengar.forEach((f) => f());
}

function langganan(f: () => void) {
  pendengar.add(f);
  // Sinkron antar tab: ubah status di tab pemilik, tab pelanggan ikut berubah
  const saatStorage = (e: StorageEvent) => {
    if (e.key === KUNCI) {
      cache = null;
      f();
    }
  };
  window.addEventListener("storage", saatStorage);
  return () => {
    pendengar.delete(f);
    window.removeEventListener("storage", saatStorage);
  };
}

// null saat render di server (belum ada localStorage)
export function useDaftarNota(): Nota[] | null {
  return useSyncExternalStore(langganan, baca, () => null);
}

export function ubahStatus(kode: string, status: StatusKode) {
  simpan(baca().map((n) => (n.kode === kode ? { ...n, status } : n)));
}

export function resetDataContoh() {
  simpan(buatDataContoh());
}
