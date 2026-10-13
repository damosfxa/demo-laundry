import { TOKO } from "./toko";

export type StatusKode = "diterima" | "dicuci" | "disetrika" | "siap" | "diambil";

export type Nota = {
  kode: string;
  nama: string;
  hp: string | null;
  layanan: string;
  berat: number;
  status: StatusKode;
  created_at: string;
};

export const LAYANAN: { kode: string; nama: string }[] = [
  { kode: "cuci-kering", nama: "Cuci Kering" },
  { kode: "cuci-setrika", nama: "Cuci Setrika" },
  { kode: "setrika", nama: "Setrika Saja" },
];

export const STATUS: { kode: StatusKode; nama: string }[] = [
  { kode: "diterima", nama: "Diterima" },
  { kode: "dicuci", nama: "Sedang Dicuci" },
  { kode: "disetrika", nama: "Sedang Disetrika" },
  { kode: "siap", nama: "Siap Diambil" },
  { kode: "diambil", nama: "Sudah Diambil" },
];

// Perkiraan selesai untuk demo: 2 hari setelah nota dibuat
const HARI_PENGERJAAN = 2;

export function normalisasiKode(mentah: string): string {
  const kode = mentah.trim().toUpperCase();
  return /^[A-Z0-9-]{4,20}$/.test(kode) ? kode : "";
}

export function namaLayanan(kode: string): string {
  return LAYANAN.find((l) => l.kode === kode)?.nama ?? kode;
}

export function namaStatus(kode: StatusKode): string {
  return STATUS.find((s) => s.kode === kode)?.nama ?? kode;
}

export function formatTanggal(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
}

export function perkiraanSelesai(iso: string): string {
  const selesai = new Date(new Date(iso).getTime() + HARI_PENGERJAAN * 24 * 60 * 60 * 1000);
  return formatTanggal(selesai.toISOString());
}

// 0812xxxx atau +62 812xxxx menjadi 62812xxxx (format wa.me)
export function nomorWa(hp: string | null): string {
  if (!hp) return "";
  let angka = hp.replace(/\D/g, "");
  if (angka.startsWith("0")) angka = `62${angka.slice(1)}`;
  else if (angka.startsWith("8")) angka = `62${angka}`;
  return angka.length >= 10 ? angka : "";
}

export function pesanWa(nota: Nota, alamat: string): string {
  const link = `${alamat}/?nota=${nota.kode}`;
  switch (nota.status) {
    case "diterima":
      return `Halo ${nota.nama}, cucian Anda sudah kami terima di ${TOKO.nama}. Nomor nota: ${nota.kode}, perkiraan selesai ${perkiraanSelesai(nota.created_at)}. Pantau statusnya di sini: ${link}`;
    case "siap":
      return `Halo ${nota.nama}, cucian Anda (nota ${nota.kode}) sudah siap diambil di ${TOKO.nama}. Detail: ${link}`;
    case "diambil":
      return `Terima kasih ${nota.nama} sudah mempercayakan cucian ke ${TOKO.nama}. Sampai jumpa lagi!`;
    default:
      return `Halo ${nota.nama}, cucian Anda (nota ${nota.kode}) saat ini ${namaStatus(nota.status).toLowerCase()}. Pantau statusnya di sini: ${link}`;
  }
}

// Tanpa nomor, WhatsApp akan meminta pemilik memilih kontak
export function linkWa(nota: Nota, alamat: string): string {
  return `https://wa.me/${nomorWa(nota.hp)}?text=${encodeURIComponent(pesanWa(nota, alamat))}`;
}

// 2.5 menjadi "2,5 kg"
export function formatBerat(berat: number): string {
  return `${berat.toLocaleString("id-ID")} kg`;
}
