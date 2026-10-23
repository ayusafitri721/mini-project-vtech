# Aplikasi Inventaris UMKM Berbasis CLI

## Gambaran Umum

Aplikasi backend sederhana untuk mengelola persediaan barang UMKM melalui terminal. Program mendukung operasi CRUD (Create, Read, Update, Delete) pada data barang, dilengkapi validasi input, filter kategori, pengurutan harga, ringkasan stok, serta penyimpanan ke file JSON agar data tetap ada saat program dijalankan kembali.

Latar belakang: riset Business Fitness Index 2024 (OCBC x NielsenIQ) mencatat 77% UMKM di Indonesia masih mencatat keuangan secara manual, dan survei Asosiasi UMKM Indonesia menyebut 70% UMKM kesulitan melakukan pencatatan transaksi. Aplikasi ini adalah versi sederhana dari solusi pencatatan stok digital.

## Fitur

- Menampilkan semua barang dalam bentuk tabel.
- Menambahkan barang baru dengan validasi otomatis.
- Menampilkan detail barang berdasarkan kode.
- Memperbarui harga dan stok barang.
- Menghapus barang berdasarkan kode.
- Menampilkan barang berdasarkan kategori.
- Mengurutkan barang berdasarkan harga termurah.
- Menampilkan ringkasan stok (jenis, total unit, nilai rupiah).
- Menyimpan data ke `inventory.json` dan memuatnya saat program dijalankan.

## Cara Menjalankan Program

1. Pastikan Node.js sudah terinstal (disarankan versi 22).
2. Buka terminal dan arahkan ke folder proyek.
3. Jalankan salah satu perintah berikut:

```bash
npm start
```

atau

```bash
node main.js
```

## Format Data

Data disimpan sebagai array of objects. Setiap object mewakili satu barang dengan key-value berikut:

```js
{
  itemCode: "MKN-001",          // kode unik barang (string)
  name: "Indomie Goreng",       // nama barang (string)
  category: "Makanan",          // kategori barang (string)
  price: 3500,                  // harga satuan (number, bulat >= 0)
  stock: 120,                   // jumlah stok (number, bulat >= 0)
  lastRestock: "2025-10-20T09:00:00" // waktu restock (string ISO)
}
```

## Penjelasan Function CRUD

- **Create** (`addItem`): memvalidasi nama, kategori, harga, stok, dan waktu restock, membuat kode otomatis jika kosong, menolak kode duplikat, lalu menambahkan barang ke array dan menyimpannya ke file.
- **Read** (`getAllItems`, `getItemByCode`): `getAllItems` menampilkan seluruh barang dalam tabel, sedangkan `getItemByCode` mencari satu barang berdasarkan kode dan menampilkan pesan jika tidak ditemukan.
- **Update** (`updateItem`): mencari barang berdasarkan kode, memvalidasi harga dan stok baru, menggabungkan data lama dengan data baru menggunakan spread operator, lalu menyimpan perubahan.
- **Delete** (`deleteItem`): mencari barang berdasarkan kode, menghapusnya dari array, lalu menyimpan perubahan ke file.

Fungsi pendukung: `saveInventoryToFile` dan `loadInventoryFromFile` untuk persistensi, `filterByCategory` untuk penyaringan, `sortItemsByPrice` untuk pengurutan, dan `stockSummary` untuk ringkasan stok.

## Struktur Project

- `data.js`         -> array data inventaris awal
- `functions.js`    -> seluruh fungsi CRUD, validasi, filter, sort, ringkasan, dan persistensi
- `main.js`         -> program utama interaktif (CLI) dengan menu dan input pengguna
- `package.json`    -> konfigurasi Node.js project
- `inventory.json`  -> file penyimpanan data (otomatis dibuat)
- `README.md`       -> dokumentasi proyek
- `PENJELASAN.md`   -> penjelasan fungsi setiap file

## Penggunaan

1. Pilih menu 1-8 sesuai operasi yang diinginkan.
2. Ikuti instruksi yang muncul di layar.
3. Pilih 0 untuk keluar dari program.

## Requirements

- Node.js v22.15.0
- Terminal/Command Prompt

## Author

- Nama: Ayu Safitri
- Tema Proyek: Sistem Manajemen Inventaris UMKM
- Kelas: Trial Study Club Backend Basic KSM Veterantech 2026
- Mentor: Nadia Jasmine
