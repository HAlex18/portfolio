'use client';

import { COLORS } from '@/constants/colors';

export function Footer() {
  return (
    <footer
      style={{
        padding: '40px 20px',
        borderTop: `1px solid ${COLORS.border}`,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            background: COLORS.cardBg,
            borderRadius: '6px',
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <span style={{ fontSize: '14px' }}>👁️</span>
          <span
            style={{
              fontSize: '11px',
              color: COLORS.textDim,
              fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Color-blind friendly
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            background: COLORS.cardBg,
            borderRadius: '6px',
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <span style={{ fontSize: '14px' }}>⌨️</span>
          <span
            style={{
              fontSize: '11px',
              color: COLORS.textDim,
              fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Keyboard accessible
          </span>
        </div>
      </div>
      <p
        style={{
          fontSize: '13px',
          color: COLORS.textDim,
          fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
        }}
      >
        &copy; {new Date().getFullYear()} Hiroko.A.Mizoguchi
      </p>
    </footer>
  );
}
