# Demo Laundry: Cek Status Cucian

Demo untuk calon klien laundry. Dua halaman:

- `/` untuk pelanggan: cek status cucian pakai nomor nota.
- `/pemilik` untuk pemilik: daftar cucian, ubah status, dan tombol kabari pelanggan lewat WhatsApp.

Tanpa pembayaran, laporan, atau stok. Data contoh disimpan di browser (localStorage), jadi tidak butuh database atau env.
Nama laundry contoh diatur di `src/lib/toko.ts`, data contoh di `src/lib/penyimpanan.ts`.

## Menjalankan di komputer

1. `npm install`
2. `npm run dev`, lalu buka http://localhost:3000

## Deploy

Vercel, root directory folder ini, tanpa environment variable. Domain: `demo-laundry.rizkyrhamadani.com`.
