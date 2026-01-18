'use client';

import { COLORS } from '@/constants/colors';
import type { Star } from '@/types';
import { seededRandom, round } from '@/utils/random';

// Pre-generate deterministic star data to avoid hydration mismatch
const STAR_DATA: Star[] = Array.from({ length: 250 }, (_, i) => ({
  id: i,
  x: round(seededRandom(i * 10) * 100),
  y: round(seededRandom(i * 20) * 100),
  size: round(seededRandom(i * 30) < 0.9 ? seededRandom(i * 40) * 1.5 + 0.5 : seededRandom(i * 50) * 2.5 + 1.5),
  delay: round(seededRandom(i * 60) * 5),
  duration: round(3 + seededRandom(i * 70) * 4),
  brightness: seededRandom(i * 80) < 0.7 ? 0.2 : 0.6,
}));

export function StarField() {
  const stars = STAR_DATA;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.x.toFixed(4)}%`,
            top: `${star.y.toFixed(4)}%`,
            width: `${star.size.toFixed(4)}px`,
            height: `${star.size.toFixed(4)}px`,
            borderRadius: '50%',
            backgroundColor: COLORS.star,
            opacity: star.brightness,
            animation: `twinkle ${star.duration.toFixed(4)}s ease-in-out ${star.delay.toFixed(4)}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
