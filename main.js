import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import {
  addItem,
  getAllItems,
  getItemByCode,
  updateItem,
  deleteItem,
  filterByCategory,
  sortItemsByPrice,
  stockSummary,
  loadInventoryFromFile
} from "./functions.js";

loadInventoryFromFile();

const rl = readline.createInterface({ input, output });
const antrean = [];
const penunggu = [];

rl.on("line", (baris) => {
  const nilai = baris.trim();
  if (penunggu.length > 0) penunggu.shift()(nilai);
  else antrean.push(nilai);
});

const tanya = (teks) => {
  process.stdout.write(teks);
  if (antrean.length > 0) return Promise.resolve(antrean.shift());
  return new Promise((resolve) => penunggu.push(resolve));
};

const showMenu = () => {
  console.log(`
==============================
SISTEM INVENTARIS UMKM
==============================
1. Lihat semua barang
2. Tambah barang baru
3. Cari barang berdasarkan kode
4. Ubah data barang
5. Hapus barang
6. Filter berdasarkan kategori
7. Urutkan barang berdasarkan harga
8. Ringkasan stok
0. Keluar
==============================
`);
};

const askMenu = async () => {
  while (true) {
    showMenu();
    const choice = await tanya("Pilih menu (0-8): ");

    switch (choice) {
      case "1":
        getAllItems();
        break;

      case "2": {
        const name = await tanya("Masukkan nama barang: ");
        const category = await tanya("Masukkan kategori (Makanan/Minuman/Bahan Baku): ");
        const price = await tanya("Masukkan harga: ");
        const stock = await tanya("Masukkan stok: ");
        const lastRestock = await tanya("Masukkan waktu restock terakhir (YYYY-MM-DDTHH:MM:SS, kosongkan jika tidak ada): ");
        addItem({
          name,
          category,
          price,
          stock,
          lastRestock: lastRestock === "" ? undefined : lastRestock,
        });
        break;
      }

      case "3": {
        const code = await tanya("Masukkan kode barang: ");
        getItemByCode(code);
        break;
      }

      case "4": {
        const code = await tanya("Masukkan kode barang yang ingin diubah: ");
        const price = await tanya("Masukkan harga baru (kosongkan jika tidak diubah): ");
        const stock = await tanya("Masukkan stok baru (kosongkan jika tidak diubah): ");
        const updatedData = {};
        if (price !== "") updatedData.price = price;
        if (stock !== "") updatedData.stock = stock;
        updateItem(code, updatedData);
        break;
      }

      case "5": {
        const code = await tanya("Masukkan kode barang yang ingin dihapus: ");
        deleteItem(code);
        break;
      }

      case "6": {
        const category = await tanya("Masukkan nama kategori: ");
        filterByCategory(category);
        break;
      }

      case "7":
        sortItemsByPrice();
        break;

      case "8": {
        const { totalJenis, totalStok, nilaiStok } = stockSummary();
        console.log(`Jenis barang : ${totalJenis}`);
        console.log(`Total stok   : ${totalStok} unit`);
        console.log(`Nilai stok   : Rp ${nilaiStok.toLocaleString("id-ID")}`);
        break;
      }

      case "0":
        console.log("Keluar dari sistem. Terima kasih!");
        rl.close();
        return;

      default:
        console.log("Pilihan tidak valid, coba lagi!");
    }
  }
};

askMenu();
