'use client';

import { useTranslations } from 'next-intl';
import { COLORS } from '@/constants/colors';

export function AboutSection() {
  const t = useTranslations('about');

  const stats = [
    { number: '5+', label: t('stats.yearsExperience') },
    { number: '50+', label: t('stats.projectsCompleted') },
    { number: '20+', label: t('stats.technologies') },
    { number: '∞', label: t('stats.linesOfCode') },
  ];

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
        {/* Section Label */}
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
          {t('label')}
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
          {t('headingLine1')}
          <br />
          {t('headingLine2')}
        </h2>

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
              {t('bio1')}
            </p>
            <p
              style={{
                fontSize: '16px',
                color: COLORS.textMuted,
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                lineHeight: 1.8,
              }}
            >
              {t('bio2')}
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
              <span>{t('linkedinText')}</span>
              <span style={{ marginLeft: '4px' }}>→</span>
            </a>
          </div>

          {/* Right: Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '24px',
                  background: COLORS.cardBg,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: 700,
                    color: COLORS.accent,
                    fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: COLORS.textDim,
                    fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginTop: '8px',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
