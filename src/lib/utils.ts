import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines multiple class names into a single string and merges overlapping Tailwind CSS classes.
 * 
 * @param inputs - Array of class values (strings, objects, arrays, undefined, boolean)
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
