'use client';

import { COLORS } from '@/constants/colors';
import type { Stat } from '@/types';

const stats: Stat[] = [
  { number: '5+', label: 'Years Experience' },
  { number: '50+', label: 'Projects Completed' },
  { number: '20+', label: 'Technologies' },
  { number: '∞', label: 'Lines of Code' },
];

export function AboutSection() {
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
          About Me
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
          Building the Future,
          <br />
          One Line at a Time
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
              I&apos;m a passionate developer who loves crafting elegant solutions to complex problems. With expertise
              spanning system architecture, web development, and artificial intelligence, I bring ideas to life through
              clean, efficient code.
            </p>
            <p
              style={{
                fontSize: '16px',
                color: COLORS.textMuted,
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                lineHeight: 1.8,
              }}
            >
              When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open source, or
              diving deep into the latest AI research. I believe in continuous learning and pushing the boundaries of
              what&apos;s possible.
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
              <span>View my experience on LinkedIn</span>
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
