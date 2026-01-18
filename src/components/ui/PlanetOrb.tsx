'use client';

import { useState } from 'react';
import { COLORS } from '@/constants/colors';
import type { PlanetOrbProps } from '@/types';
import { OrbitalParticles } from './OrbitalParticles';

export function PlanetOrb({ project, index }: PlanetOrbProps) {
  const [isHovered, setIsHovered] = useState(false);

  const rings = [
    { size: 140, opacity: 0.1, offset: isHovered ? -30 : 0 },
    { size: 110, opacity: 0.15, offset: isHovered ? -55 : -14 },
    { size: 80, opacity: 0.2, offset: isHovered ? -80 : -28 },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: `float ${6 + index * 0.4}s ease-in-out ${index * 0.25}s infinite`,
      }}
    >
      {/* Title */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          opacity: isHovered ? 1 : 0.7,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: '17px',
            fontWeight: 600,
            color: isHovered ? COLORS.accent : COLORS.text,
            fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
            transition: 'color 0.4s',
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            margin: '6px 0 0',
            fontSize: '11px',
            color: COLORS.textDim,
            fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <span
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: isHovered ? COLORS.accent : COLORS.textDim,
              transition: 'background-color 0.4s',
            }}
          />
          {project.subtitle}
        </p>
      </div>

      {/* Orb */}
      <div
        style={{
          position: 'relative',
          width: '170px',
          height: '170px',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={0}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        role="button"
        aria-label={`View ${project.title} project`}
      >
        <OrbitalParticles isHovered={isHovered} seed={index * 1000} />

        {/* Aura layers */}
        <div
          style={{
            position: 'absolute',
            inset: '-25px',
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)`,
            transition: 'all 0.5s ease',
            opacity: isHovered ? 1 : 0.6,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            boxShadow: `0 0 20px rgba(255,255,255,0.25), 0 0 40px rgba(255,255,255,0.12), 0 0 60px rgba(255,255,255,0.08)`,
            opacity: isHovered ? 1 : 0.75,
            transition: 'opacity 0.5s',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '0',
            borderRadius: '50%',
            border: `2px solid rgba(255,255,255,${isHovered ? 0.35 : 0.2})`,
            transition: 'all 0.4s ease',
          }}
        />

        {/* Planet */}
        <div
          style={{
            position: 'absolute',
            inset: '4px',
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, ${COLORS.nebulaPrimary} 0%, ${COLORS.nebulaSecondary} 50%, ${COLORS.void} 100%)`,
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: isHovered ? 'scale(1.04)' : 'scale(1)',
            boxShadow: `inset -12px -12px 35px ${COLORS.void}`,
            overflow: 'hidden',
          }}
        >
          {rings.map((ring, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: `${ring.size}px`,
                height: `${ring.size}px`,
                borderRadius: '50%',
                border: `1px solid rgba(255,255,255,${ring.opacity})`,
                top: '50%',
                left: `${ring.offset + 80}px`,
                transform: 'translateY(-50%)',
                transition: 'left 2.5s ease-out',
              }}
            />
          ))}

          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '34px',
              filter: `drop-shadow(0 0 10px rgba(0,0,0,0.8))`,
              zIndex: 10,
              opacity: isHovered ? 1 : 0.8,
              transition: 'opacity 0.4s',
            }}
          >
            {project.icon}
          </div>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: `radial-gradient(circle at 50% 50%, ${COLORS.accent}18 0%, transparent 60%)`,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.5s',
            }}
          />

          <div
            style={{
              position: 'absolute',
              top: '12%',
              left: '18%',
              width: '25%',
              height: '18%',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(255,255,255,0.12) 0%, transparent 70%)',
              filter: 'blur(6px)',
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            inset: '-8px',
            borderRadius: '50%',
            border: `2px solid ${COLORS.accent}`,
            opacity: 0,
            transition: 'opacity 0.2s',
            pointerEvents: 'none',
          }}
          className="focus-ring"
        />
      </div>

      {/* Shadow */}
      <div
        style={{
          width: '90px',
          height: '14px',
          marginTop: '28px',
          borderRadius: '50%',
          background: `radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)`,
          transition: 'all 0.5s ease',
          transform: isHovered ? 'scale(1.4)' : 'scale(1)',
          opacity: isHovered ? 0.7 : 0.35,
        }}
      />
    </div>
  );
}
