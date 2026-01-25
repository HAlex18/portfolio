'use client';

import { COLORS } from '@/constants/colors';
import type { OrbitalParticlesProps } from '@/types';
import { seededRandom, round } from '@/utils/random';

export function OrbitalParticles({ isHovered, seed = 0 }: OrbitalParticlesProps) {
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    angle: (i / 6) * 360,
    distance: round(105 + seededRandom(seed + i * 100) * 15),
    size: round(1.5 + seededRandom(seed + i * 200) * 2),
    speed: round(20 + seededRandom(seed + i * 300) * 15),
  }));

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            width: `${p.size.toFixed(4)}px`,
            height: `${p.size.toFixed(4)}px`,
            borderRadius: '50%',
            backgroundColor: isHovered ? COLORS.accent : COLORS.starDim,
            boxShadow: isHovered ? `0 0 8px ${COLORS.accent}` : 'none',
            top: '50%',
            left: '50%',
            animation: `orbit-${p.id} ${p.speed.toFixed(4)}s linear infinite`,
            opacity: isHovered ? 0.9 : 0.3,
            transition: 'opacity 0.5s, background-color 0.5s, box-shadow 0.5s',
          }}
        />
      ))}
      <style>{`
        ${particles
          .map(
            (p) => `
          @keyframes orbit-${p.id} {
            from { transform: rotate(${p.angle}deg) translateX(${p.distance.toFixed(4)}px); }
            to { transform: rotate(${p.angle + 360}deg) translateX(${p.distance.toFixed(4)}px); }
          }
        `
          )
          .join('')}
      `}</style>
    </>
  );
}
