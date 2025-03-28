import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return '';
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
    }).format(new Date(dateString));
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};
