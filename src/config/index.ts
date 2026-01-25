/**
 * Application Configuration
 * Centralized constants to avoid magic numbers throughout the codebase.
 */

export const CONFIG = {
  /** Rate limiting configuration */
  rateLimits: {
    chat: {
      limit: 20,
      windowMs: 60 * 60 * 1000, // 1 hour
      maxEntries: 10000, // Prevent memory exhaustion
    },
    contact: {
      limit: 5,
      windowMs: 60 * 60 * 1000, // 1 hour
      maxEntries: 10000, // Prevent memory exhaustion
    },
    cleanupIntervalMs: 5 * 60 * 1000, // 5 minutes
  },

  /** API configuration */
  api: {
    timeoutMs: 30000, // 30 seconds
    retryAfterSeconds: 3600, // 1 hour
    maxMessageLength: 500,
    maxContactMessageLength: 2000,
    maxNameLength: 100,
    maxEmailLength: 254,
    maxCompanyLength: 100,
  },

  /** UI configuration */
  ui: {
    starCount: 250,
    mobileBreakpoint: 768,
    scrollThrottleMs: 100,
    rateLimitResetMs: 60 * 60 * 1000, // 1 hour
  },

  /** Animation configuration */
  animation: {
    twinkleDurationBase: 3,
    twinkleDurationRange: 4,
    shootingStarIntervalMs: 4000,
  },
} as const;

export type Config = typeof CONFIG;
