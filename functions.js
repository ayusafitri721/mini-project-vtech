import fs from "fs";
import { inventory } from "./data.js";

function isValidDateTime(dateTimeStr) {
  return !isNaN(Date.parse(dateTimeStr));
}

function isValidNumber(value) {
  const n = Number(value);
  return Number.isInteger(n) && n >= 0;
}

function generateItemCode(category) {
  const prefix = category.split(" ")[0].substring(0, 3).toUpperCase();
  const randomNum = Math.floor(Math.random() * 900 + 100);
  return `${prefix}-${randomNum}`;
}

export function saveInventoryToFile() {
  fs.writeFileSync("inventory.json", JSON.stringify(inventory, null, 2));
  console.log("Data inventaris berhasil disimpan ke inventory.json");
}

export function loadInventoryFromFile() {
  if (fs.existsSync("inventory.json")) {
    const data = fs.readFileSync("inventory.json");
    const loaded = JSON.parse(data);
    // Ganti isi array agar referensi import tetap sama.
    inventory.splice(0, inventory.length, ...loaded);
    console.log("Data inventaris berhasil dimuat dari file.");
  } else {
    console.log("Belum ada file data yang tersimpan.");
  }
}

export function addItem(newItem) {
  if (!newItem.name || !newItem.category || newItem.price === undefined || newItem.stock === undefined) {
    console.log("Nama, kategori, harga, dan stok wajib diisi!");
    return;
  }

  if (!isValidNumber(newItem.price)) {
    console.log("Harga harus bilangan bulat >= 0!");
    return;
  }

  if (!isValidNumber(newItem.stock)) {
    console.log("Stok harus bilangan bulat >= 0!");
    return;
  }

  if (newItem.lastRestock && !isValidDateTime(newItem.lastRestock)) {
    console.log("Format waktu tidak valid! Gunakan format: YYYY-MM-DDTHH:MM:SS");
    return;
  }

  if (!newItem.itemCode) {
    newItem.itemCode = generateItemCode(newItem.category);
  }

  const exists = inventory.find((i) => i.itemCode === newItem.itemCode);
  if (exists) {
    console.log(`Kode barang ${newItem.itemCode} sudah ada!`);
    return;
  }

  newItem.price = Number(newItem.price);
  newItem.stock = Number(newItem.stock);

  inventory.push(newItem);
  saveInventoryToFile();
  console.log(`Barang ${newItem.itemCode} berhasil ditambahkan.`);
}

export function getAllItems() {
  console.log("Daftar Semua Inventaris:");
  console.table(inventory);
  return inventory;
}

export function getItemByCode(code) {
  const item = inventory.find((i) => i.itemCode === code);
  if (!item) {
    console.log(`Barang dengan kode ${code} tidak ditemukan.`);
    return null;
  }
  console.table([item]);
  return item;
}

export function updateItem(code, updatedData) {
  const index = inventory.findIndex((i) => i.itemCode === code);
  if (index === -1) {
    console.log(`Tidak ada barang dengan kode ${code}.`);
    return;
  }

  if (updatedData.price !== undefined && !isValidNumber(updatedData.price)) {
    console.log("Harga harus bilangan bulat >= 0!");
    return;
  }

  if (updatedData.stock !== undefined && !isValidNumber(updatedData.stock)) {
    console.log("Stok harus bilangan bulat >= 0!");
    return;
  }

  if (updatedData.lastRestock && !isValidDateTime(updatedData.lastRestock)) {
    console.log("Format waktu tidak valid!");
    return;
  }

  if (updatedData.price !== undefined) updatedData.price = Number(updatedData.price);
  if (updatedData.stock !== undefined) updatedData.stock = Number(updatedData.stock);

  inventory[index] = { ...inventory[index], ...updatedData };
  saveInventoryToFile();
  console.log(`Data barang ${code} berhasil diperbarui.`);
}

export function deleteItem(code) {
  const index = inventory.findIndex((i) => i.itemCode === code);
  if (index === -1) {
    console.log(`Tidak ada barang dengan kode ${code}.`);
    return;
  }
  inventory.splice(index, 1);
  saveInventoryToFile();
  console.log(`Barang ${code} berhasil dihapus.`);
}

export function filterByCategory(categoryName) {
  const filtered = inventory.filter(
    (i) => i.category.toLowerCase() === categoryName.toLowerCase()
  );
  console.log(`Daftar barang kategori ${categoryName}:`);
  console.table(filtered);
  return filtered;
}

export function sortItemsByPrice() {
  const sorted = [...inventory].sort((a, b) => a.price - b.price);
  console.log("Inventaris diurutkan berdasarkan harga termurah:");
  console.table(sorted);
  return sorted;
}

export function stockSummary() {
  const totalJenis = inventory.length;
  const totalStok = inventory.reduce((sum, i) => sum + i.stock, 0);
  const nilaiStok = inventory.reduce((sum, i) => sum + i.price * i.stock, 0);
  console.log(`Jenis barang : ${totalJenis}`);
  console.log(`Total stok   : ${totalJenis === 0 ? 0 : totalStok} unit`);
  console.log(`Nilai stok   : Rp ${nilaiStok.toLocaleString("id-ID")}`);
  return { totalJenis, totalStok, nilaiStok };
}
