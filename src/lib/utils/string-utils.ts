import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function to merge Tailwind CSS classes.
 * It combines class names and resolves conflicts.
 * @param inputs - A list of class values to be merged.
 * @returns The merged class name string.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function removeDuplicateSpaces(str: string): string {
	return str.replace(/\s{2,}/g, ' ').trim();
}

export function removeWhitespaceFromLineStart(str: string): string {
	return str.replace(/^\s+/gm, '');
}
