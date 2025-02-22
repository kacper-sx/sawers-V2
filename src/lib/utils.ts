import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";



export const qsAll = <T extends string>(selector: T) => {
  const els = document.querySelectorAll(selector)
  return Array.from(els).filter(el => el instanceof HTMLElement)
} 

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
