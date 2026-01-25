// ============================================
// RATE LIMIT TYPES
// ============================================

/**
 * Record tracking rate limit state for a single IP.
 */
export interface RateLimitRecord {
  count: number;
  resetTime: number;
}

/**
 * Configuration for rate limiter instances.
 */
export interface RateLimitConfig {
  limit: number;
  windowMs: number;
  maxEntries?: number;
}

/**
 * Result of a rate limit check.
 */
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}
