'use client';

import { useTranslations } from 'next-intl';
import { COLORS } from '@/constants/colors';

export function AboutSection() {
  const translations = useTranslations('about');

  return (
    <section
      id="about"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
      }}
    >
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p
            style={{
              fontSize: '12px',
              color: COLORS.accent,
              fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              marginBottom: '16px',
            }}
          >
            {translations('label')}
          </p>

          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              color: COLORS.text,
              fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
              margin: '0 0 40px',
              letterSpacing: '-0.02em',
            }}
          >
            {translations('headingLine1')}
            <br />
            {translations('headingLine2')}
          </h2>
        </div>
        {/* Section Label */}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
          }}
        >
          {/* Left: Bio */}
          <div>
            <p
              style={{
                fontSize: '16px',
                color: COLORS.textMuted,
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                lineHeight: 1.8,
                marginBottom: '24px',
              }}
            >
              {translations('bio1')}
            </p>
            <p
              style={{
                fontSize: '16px',
                color: COLORS.textMuted,
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                lineHeight: 1.8,
              }}
            >
              {translations('bio2')}
            </p>

            {/* LinkedIn Link */}
            <a
              href="https://linkedin.com/in/yourname"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '24px',
                padding: '12px 20px',
                background: COLORS.cardBg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '8px',
                color: COLORS.textMuted,
                fontSize: '14px',
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                textDecoration: 'none',
                transition: 'all 0.3s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = COLORS.accent;
                e.currentTarget.style.color = COLORS.text;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = COLORS.border;
                e.currentTarget.style.color = COLORS.textMuted;
              }}
            >
              <span>💼</span>
              <span>{translations('linkedinText')}</span>
              <span style={{ marginLeft: '4px' }}>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
