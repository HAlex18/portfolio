/**
 * Throttle Utility
 * Limits function execution frequency.
 */

/**
 * Creates a throttled version of a function that only executes at most once per interval.
 */
export function throttle<T extends (...args: unknown[]) => void>(func: T, limit: number): T {
  let inThrottle = false;
  return ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
}
