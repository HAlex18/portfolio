// ============================================
// RANDOM UTILITY FUNCTIONS
// Used for deterministic values to avoid hydration mismatch
// ============================================

/**
 * Seeded random function for deterministic values
 * Produces the same output for the same seed, avoiding SSR/client mismatch
 */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

/**
 * Round to fixed decimals to prevent hydration mismatch
 * Different JS engines may render floats with different precision
 */
export const round = (n: number, decimals = 4): number => Math.round(n * 10 ** decimals) / 10 ** decimals;
