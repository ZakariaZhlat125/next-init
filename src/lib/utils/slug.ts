/**
 * Slug utility functions for generating and parsing slugs
 * Format: {name}-{id} (e.g., "my-company-123")
 */

/**
 * Generate a slug from name and id
 * Converts name to lowercase, replaces spaces with hyphens, removes special characters
 * and appends the id
 */
export function generateSlug(name: string, id: number | string): string {
  // Convert to lowercase
  const lowerName = name.toLowerCase();
  
  // Replace spaces and special characters with hyphens
  const sanitized = lowerName
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
  
  // Append id
  return `${sanitized}-${id}`;
}

/**
 * Extract id from a slug
 * Assumes format: {name}-{id}
 * Returns the id as a number
 */
export function extractIdFromSlug(slug: string): number | null {
  // Split by hyphen and get the last part
  const parts = slug.split('-');
  const lastPart = parts[parts.length - 1];
  
  // Check if last part is a number
  const id = parseInt(lastPart, 10);
  return isNaN(id) ? null : id;
}

/**
 * Validate if a string is a valid slug format
 */
export function isValidSlug(slug: string): boolean {
  // Slug should contain at least one hyphen and end with a number
  const parts = slug.split('-');
  if (parts.length < 2) return false;
  
  const lastPart = parts[parts.length - 1];
  const id = parseInt(lastPart, 10);
  
  return !isNaN(id);
}
