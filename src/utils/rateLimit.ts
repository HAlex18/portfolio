/**
 * Rate Limiting Utility
 * Centralized rate limiting with automatic memory cleanup.
 */

import type { NextRequest } from 'next/server';
import { CONFIG } from '@/config';
import type { RateLimitRecord, RateLimitConfig, RateLimitResult } from '@/types';

/**
 * Rate limiter with automatic cleanup of expired entries.
 */
class RateLimiter {
  private map = new Map<string, RateLimitRecord>();
  private lastCleanup = Date.now();

  constructor(private config: RateLimitConfig) {}

  /**
   * Remove expired entries to prevent memory exhaustion.
   */
  private cleanup(): void {
    const now = Date.now();
    if (now - this.lastCleanup < CONFIG.rateLimits.cleanupIntervalMs) return;

    for (const [ip, record] of this.map.entries()) {
      if (now > record.resetTime) {
        this.map.delete(ip);
      }
    }
    this.lastCleanup = now;
  }

  /**
   * Check if request is allowed under rate limit.
   */
  check(ip: string): RateLimitResult {
    this.cleanup();
    const now = Date.now();
    const record = this.map.get(ip);

    // Enforce max entries to prevent memory exhaustion
    const maxEntries = this.config.maxEntries ?? 10000;
    if (!record && this.map.size >= maxEntries) {
      // Map is full and this is a new IP - reject to prevent DoS
      return { allowed: false, remaining: 0 };
    }

    if (!record || now > record.resetTime) {
      this.map.set(ip, { count: 1, resetTime: now + this.config.windowMs });
      return { allowed: true, remaining: this.config.limit - 1 };
    }

    if (record.count >= this.config.limit) {
      return { allowed: false, remaining: 0 };
    }

    record.count++;
    return { allowed: true, remaining: this.config.limit - record.count };
  }
}

/**
 * Extract client IP from request headers.
 */
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0]?.trim() || realIP || 'unknown';
}

// Pre-configured rate limiters
export const chatRateLimiter = new RateLimiter(CONFIG.rateLimits.chat);
export const contactRateLimiter = new RateLimiter(CONFIG.rateLimits.contact);
