import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const safeAsync =  async (fn) => {
    try {
      const data = await fn();
      return [data, null]
    } catch (error) {
      return [null, error]
    }
}