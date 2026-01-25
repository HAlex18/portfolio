'use client';

import { useState, useEffect } from 'react';
import { COLORS } from '@/constants/colors';
import type { ShootingStarState } from '@/types';

export function ShootingStar() {
  const [shooting, setShooting] = useState<ShootingStarState | null>(null);

  useEffect(() => {
    const trigger = () => {
      setShooting({
        id: Date.now(),
        startX: Math.random() * 60 + 20,
        startY: Math.random() * 30,
      });
      setTimeout(() => setShooting(null), 1000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.7) trigger();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!shooting) return null;

  return (
    <div
      key={shooting.id}
      style={{
        position: 'fixed',
        left: `${shooting.startX}%`,
        top: `${shooting.startY}%`,
        width: '100px',
        height: '2px',
        background: `linear-gradient(90deg, ${COLORS.star}, transparent)`,
        borderRadius: '2px',
        transform: 'rotate(35deg)',
        animation: 'shoot 0.8s ease-out forwards',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  );
}
