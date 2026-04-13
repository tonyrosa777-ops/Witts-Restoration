import { type ClassValue, clsx } from "clsx";

// Tailwind merge utility — combines class names safely
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Reduced motion detection for animation components
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
