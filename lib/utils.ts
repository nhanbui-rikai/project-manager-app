import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date, type: string) => {
  let formatDate = null;
  formatDate = type === "date" ? new Date(date) : date.toLocaleDateString("en-US");
  return formatDate;
};
