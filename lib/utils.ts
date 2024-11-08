import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET as string;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FormatDateProps {
  date: Date | string;
  type: "date" | "string";
}

export const formatDate = (date: Date | string, type: "date" | "string"): string | undefined => {
  if (type === "date") {
    return date instanceof Date ? date.toISOString() : new Date(date).toISOString();
  } else if (type === "string") {
    return new Date(date).toLocaleDateString("en-US");
  }
  return undefined;
};

export const getStringFromArrayData = (data: []) => {
  if (data) {
    return data.join(", ");
  }
  return null;
};

export const sortedData = (data: any, orderBy: any, order: any) => {
  return data
    ? [...data].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];

        if (aValue < bValue) {
          return order === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return order === "asc" ? 1 : -1;
        }
        return 0;
      })
    : [];
};

export const setItems = (key: string, data: any): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const removeItems = (key: string): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const encryptData = (data: any): string | null => {
  try {
    if (!SECRET_KEY) throw new Error("Missing encryption secret key");

    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();

    return ciphertext;
  } catch (error) {
    console.error("Encryption failed:", error);
    return null;
  }
};

export const decryptData = (ciphertext: string): any => {
  try {
    if (!SECRET_KEY) throw new Error("Missing decryption secret key");

    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    if (!originalText) {
      throw new Error("Failed to decode UTF-8 string");
    }

    return JSON.parse(originalText);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};

export const getTableId = (page: any, rowsPerPage: any, index: any) => {
  return page * rowsPerPage + index + 1;
};

export const getItems = (key: string): any | null => {
  if (typeof window !== "undefined") {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return null;
    }
  }
  return null;
};
