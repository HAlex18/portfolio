'use client';

import { COLORS } from '@/constants/colors';

export function HeroSection() {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '100px 20px 60px',
        position: 'relative',
      }}
    >
      {/* Nebula glow behind */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: `radial-gradient(ellipse, ${COLORS.nebulaPrimary}30 0%, transparent 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Greeting */}
      <p
        style={{
          fontSize: '14px',
          color: COLORS.accent,
          fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          marginBottom: '24px',
          animation: 'fadeInUp 0.8s ease-out',
        }}
      >
        Welcome to my universe
      </p>

      {/* Name */}
      <h1
        style={{
          fontSize: 'clamp(48px, 10vw, 100px)',
          fontWeight: 700,
          color: COLORS.text,
          fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
          margin: 0,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          animation: 'fadeInUp 0.8s ease-out 0.1s both',
        }}
      >
        Your Name
      </h1>

      {/* Title */}
      <h2
        style={{
          fontSize: 'clamp(20px, 4vw, 32px)',
          fontWeight: 400,
          color: COLORS.textMuted,
          fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
          margin: '24px 0 0',
          animation: 'fadeInUp 0.8s ease-out 0.2s both',
        }}
      >
        System Developer • Web Developer • AI Developer
      </h2>

      {/* CTA Buttons */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '16px',
          marginTop: '48px',
          animation: 'fadeInUp 0.8s ease-out 0.3s both',
        }}
      >
        <button
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            padding: '16px 32px',
            width: '200px',
            background: COLORS.accent,
            color: COLORS.void,
            border: `2px solid ${COLORS.accent}`,
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            transition: 'all 0.3s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = COLORS.accentHover;
            e.currentTarget.style.borderColor = COLORS.accentHover;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = COLORS.accent;
            e.currentTarget.style.borderColor = COLORS.accent;
          }}
        >
          View Projects
        </button>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            padding: '16px 32px',
            width: '200px',
            background: 'transparent',
            color: COLORS.text,
            border: `2px solid ${COLORS.border}`,
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            transition: 'all 0.3s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderColor = COLORS.accent)}
          onMouseOut={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
        >
          Contact Me
        </button>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          animation: 'bounce 2s ease-in-out infinite',
        }}
      >
        <span style={{ fontSize: '12px', color: COLORS.textDim, letterSpacing: '0.1em' }}>SCROLL</span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: `linear-gradient(180deg, ${COLORS.textDim}, transparent)`,
          }}
        />
      </div>
    </section>
  );
}
