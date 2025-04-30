import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and merges Tailwind CSS classes efficiently
 * @param {...string} inputs - Class names to combine
 * @returns {string} - Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
} 

// Format a date in a localized format
export function formatDate(date) {
  if (!date) return null;
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// Format a price with currency symbol
export function formatPrice(price, currency = 'GBP') {
  if (!price) return null;
  
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  }).format(price);
} 