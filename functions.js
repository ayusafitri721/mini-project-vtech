import fs from "fs";
import { inventory } from "./data.js";

const isValidDateTime = (dateTimeStr) => !isNaN(Date.parse(dateTimeStr));

const isValidNumber = (value) => {
  const n = Number(value);
  return Number.isInteger(n) && n >= 0;
};

const generateItemCode = (category) => {
  const prefix = category.split(" ")[0].substring(0, 3).toUpperCase();
  const randomNum = Math.floor(Math.random() * 900 + 100);
  return `${prefix}-${randomNum}`;
};

export const saveInventoryToFile = () => {
  fs.writeFileSync("inventory.json", JSON.stringify(inventory, null, 2));
  console.log("Data inventaris berhasil disimpan ke inventory.json");
};

export const loadInventoryFromFile = () => {
  if (fs.existsSync("inventory.json")) {
    const data = fs.readFileSync("inventory.json");
    const loaded = JSON.parse(data);
    // Ganti isi array agar referensi import tetap sama.
    inventory.splice(0, inventory.length, ...loaded);
    console.log("Data inventaris berhasil dimuat dari file.");
  } else {
    console.log("Belum ada file data yang tersimpan.");
  }
};

export const addItem = (newItem) => {
  const { name, category, price, stock, lastRestock } = newItem;

  if (!name || !category || price === undefined || stock === undefined) {
    console.log("Nama, kategori, harga, dan stok wajib diisi!");
    return;
  }

  if (!isValidNumber(price)) {
    console.log("Harga harus bilangan bulat >= 0!");
    return;
  }

  if (!isValidNumber(stock)) {
    console.log("Stok harus bilangan bulat >= 0!");
    return;
  }

  if (lastRestock && !isValidDateTime(lastRestock)) {
    console.log("Format waktu tidak valid! Gunakan format: YYYY-MM-DDTHH:MM:SS");
    return;
  }

  if (!newItem.itemCode) {
    newItem.itemCode = generateItemCode(category);
  }

  const exists = inventory.find((i) => i.itemCode === newItem.itemCode);
  if (exists) {
    console.log(`Kode barang ${newItem.itemCode} sudah ada!`);
    return;
  }

  newItem.price = Number(price);
  newItem.stock = Number(stock);

  inventory.push(newItem);
  saveInventoryToFile();
  console.log(`Barang ${newItem.itemCode} berhasil ditambahkan.`);
};

export const getAllItems = () => {
  console.log("Daftar Semua Inventaris:");
  console.table(inventory);
  return inventory;
};

export const getItemByCode = (code) => {
  const item = inventory.find((i) => i.itemCode === code);
  if (!item) {
    console.log(`Barang dengan kode ${code} tidak ditemukan.`);
    return null;
  }
  console.table([item]);
  return item;
};

export const updateItem = (code, updatedData) => {
  const index = inventory.findIndex((i) => i.itemCode === code);
  if (index === -1) {
    console.log(`Tidak ada barang dengan kode ${code}.`);
    return;
  }

  const { price, stock, lastRestock } = updatedData;

  if (price !== undefined && !isValidNumber(price)) {
    console.log("Harga harus bilangan bulat >= 0!");
    return;
  }

  if (stock !== undefined && !isValidNumber(stock)) {
    console.log("Stok harus bilangan bulat >= 0!");
    return;
  }

  if (lastRestock && !isValidDateTime(lastRestock)) {
    console.log("Format waktu tidak valid!");
    return;
  }

  if (price !== undefined) updatedData.price = Number(price);
  if (stock !== undefined) updatedData.stock = Number(stock);

  inventory[index] = { ...inventory[index], ...updatedData };
  saveInventoryToFile();
  console.log(`Data barang ${code} berhasil diperbarui.`);
};

export const deleteItem = (code) => {
  const index = inventory.findIndex((i) => i.itemCode === code);
  if (index === -1) {
    console.log(`Tidak ada barang dengan kode ${code}.`);
    return;
  }
  inventory.splice(index, 1);
  saveInventoryToFile();
  console.log(`Barang ${code} berhasil dihapus.`);
};

export const filterByCategory = (categoryName) => {
  const filtered = inventory.filter(
    (i) => i.category.toLowerCase() === categoryName.toLowerCase()
  );
  console.log(`Daftar barang kategori ${categoryName}:`);
  console.table(filtered);
  return filtered;
};

export const sortItemsByPrice = () => {
  const sorted = [...inventory].sort((a, b) => a.price - b.price);
  console.log("Inventaris diurutkan berdasarkan harga termurah:");
  console.table(sorted);
  return sorted;
};

export const stockSummary = () => {
  const totalJenis = inventory.length;
  const totalStok = inventory.reduce((sum, { stock }) => sum + stock, 0);
  const nilaiStok = inventory.reduce((sum, { price, stock }) => sum + price * stock, 0);
  return { totalJenis, totalStok, nilaiStok };
};
