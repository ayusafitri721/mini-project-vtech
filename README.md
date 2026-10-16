# SISTEM MANAJEMEN INVENTARIS UMKM

Program ini memungkinkan pengguna untuk mengelola stok barang UMKM secara interaktif melalui terminal (CLI) dengan fitur CRUD (Create, Read, Update, Delete) serta validasi input, penyimpanan data ke file JSON, dan pengurutan inventaris.

> Latar belakang masalah (berbasis data): Riset Business Fitness Index 2024 (OCBC x NielsenIQ) mencatat **77% UMKM Indonesia masih mencatat keuangan secara manual**, dan survei Asosiasi UMKM Indonesia menyebut **70% UMKM kesulitan pencatatan transaksi**. Studi implementasi sistem persediaan pada UMKM menunjukkan akurasi stok naik dari **78% ke 96%**, frekuensi stockout turun **12 ke 4 kali/bulan**, dan nilai kerugian stok turun **Rp3,5 juta ke Rp1,2 juta/bulan**. Program ini adalah versi mini dari solusi tersebut: mengganti buku tulis dengan pencatatan digital terstruktur.

## Fitur

- Menampilkan semua barang dalam bentuk tabel.
- Menambahkan barang baru dengan validasi otomatis.
- Menampilkan detail barang tertentu berdasarkan kode.
- Memperbarui data barang tertentu (harga / stok).
- Menghapus barang berdasarkan kode.
- Menampilkan daftar barang berdasarkan kategori.
- Mengurutkan semua barang berdasarkan harga termurah.
- Menampilkan ringkasan stok (jenis, total unit, nilai rupiah).
- Menyimpan seluruh data inventaris ke file inventory.json.
- Memuat data inventaris dari inventory.json saat program dijalankan.

## Cara Menjalankan

- Pastikan Node.js sudah terinstal.
- Buka terminal dan arahkan ke folder proyek.
- Ubah package.json agar menggunakan module.
- Jalankan program dengan : node main.js

## Format Data Barang

Setiap data barang disimpan dalam bentuk object di dalam array.

{
        itemCode: "MKN-001",
        name: "Indomie Goreng",
        category: "Makanan",
        price: 3500,
        stock: 120,
        lastRestock: "2025-10-20T09:00:00"
}

## Struktur Project

- `data.js`         -> Berisi array data inventaris awal
- `functions.js`    -> Berisi function-function CRUD dan fitur tambahan
- `main.js`         -> Program utama interaktif (CLI)
- `package.json`    -> Konfigurasi Node.js project
- `inventory.json`  -> File penyimpanan data inventaris (otomatis dibuat)
- `README.md`       -> Penjelasan proyek

## Penggunaan

1. Pilih menu 1-8 sesuai operasi yang diinginkan
2. Ikuti instruksi yang muncul di layar
3. Pilih 0 untuk keluar dari program

## Requirements

- Node.js v22.15.0
- Terminal/Command Prompt

## Author

- Nama: Ayu Safitri
- Tema Proyek: Sistem Manajemen Inventaris UMKM
- Kelas: Trial Study Club Backend Basic KSM Android UPNVJ 2025
- Mentor: Torikh Abdullah
