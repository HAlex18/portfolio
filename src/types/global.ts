// ============================================
// GLOBAL TYPE DEFINITIONS
// Used across multiple components
// ============================================

// Star Field Types
export interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  brightness: number;
}

// Shooting Star Types
export interface ShootingStarState {
  id: number;
  startX: number;
  startY: number;
}
