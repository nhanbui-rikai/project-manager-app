import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
