import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CatatanDemo } from "@/components/CatatanDemo";
import { Header } from "@/components/Header";
import { NavDemo } from "@/components/NavDemo";
import { TOKO } from "@/lib/toko";

const inter = Inter({ subsets: ["latin"], display: "swap" });

// Judul dan deskripsi ini yang muncul di pratinjau link saat dikirim lewat WhatsApp
const judul = `Demo Cek Status Cucian | ${TOKO.nama}`;
const deskripsi = "Contoh demo, coba sendiri: pelanggan cek status cucian dari HP, pemilik kabari lewat WhatsApp sekali tekan.";

export const metadata: Metadata = {
  title: judul,
  description: deskripsi,
  openGraph: { title: judul, description: deskripsi, type: "website", locale: "id_ID" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${inter.className} min-h-dvh bg-stone-50 text-stone-900 antialiased`}>
        <main className="mx-auto w-full max-w-xl space-y-5 px-4 py-6">
          <Header />
          <NavDemo />
          {children}
          <CatatanDemo />
        </main>
      </body>
    </html>
  );
}
