/**
 * Input Validation Utilities
 * Centralized validation and sanitization functions.
 */

/**
 * Strip HTML tags and limit string length.
 */
export function sanitizeInput(text: string, maxLength: number = 1000): string {
  return text
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Validate email format.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Sanitize email for use in headers (prevent CRLF injection).
 */
export function sanitizeEmailForHeader(email: string): string {
  return email.replace(/[\r\n]/g, '');
}
