import readline from "readline";
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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
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
}

function askMenu() {
  showMenu();
  rl.question("Pilih menu (0-8): ", (choice) => {
    switch (choice) {
      case "1":
        getAllItems();
        return askMenu();

      case "2":
        rl.question("Masukkan nama barang: ", (name) => {
          rl.question("Masukkan kategori (Makanan/Minuman/Bahan Baku): ", (category) => {
            rl.question("Masukkan harga: ", (price) => {
              rl.question("Masukkan stok: ", (stock) => {
                rl.question("Masukkan waktu restock terakhir (YYYY-MM-DDTHH:MM:SS, kosongkan jika tidak ada): ", (lastRestock) => {
                  addItem({
                    name,
                    category,
                    price,
                    stock,
                    lastRestock: lastRestock.trim() === "" ? undefined : lastRestock,
                  });
                  askMenu();
                });
              });
            });
          });
        });
        break;

      case "3":
        rl.question("Masukkan kode barang: ", (code) => {
          getItemByCode(code);
          askMenu();
        });
        break;

      case "4":
        rl.question("Masukkan kode barang yang ingin diubah: ", (code) => {
          rl.question("Masukkan harga baru (kosongkan jika tidak diubah): ", (price) => {
            rl.question("Masukkan stok baru (kosongkan jika tidak diubah): ", (stock) => {
              const updatedData = {};
              if (price.trim() !== "") updatedData.price = price;
              if (stock.trim() !== "") updatedData.stock = stock;
              updateItem(code, updatedData);
              askMenu();
            });
          });
        });
        break;

      case "5":
        rl.question("Masukkan kode barang yang ingin dihapus: ", (code) => {
          deleteItem(code);
          askMenu();
        });
        break;

      case "6":
        rl.question("Masukkan nama kategori: ", (category) => {
          filterByCategory(category);
          askMenu();
        });
        break;

      case "7":
        sortItemsByPrice();
        askMenu();
        break;

      case "8":
        stockSummary();
        askMenu();
        break;

      case "0":
        console.log("Keluar dari sistem. Terima kasih!");
        rl.close();
        break;

      default:
        console.log("Pilihan tidak valid, coba lagi!");
        askMenu();
        break;
    }
  });
}

askMenu();
