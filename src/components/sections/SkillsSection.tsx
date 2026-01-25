'use client';

import { COLORS } from '@/constants/colors';
import { skillCategories } from '@/data';

export function SkillsSection() {
  return (
    <section
      id="skills"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
      }}
    >
      <div style={{ maxWidth: '1100px', width: '100%' }}>
        {/* Header */}
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
            Tech Stack
          </p>
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              color: COLORS.text,
              fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
              margin: 0,
            }}
          >
            Skills & Technologies
          </h2>
        </div>

        {/* Skills Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {skillCategories.map((category, i) => (
            <div
              key={i}
              style={{
                padding: '32px',
                background: COLORS.cardBg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '16px',
                transition: 'all 0.3s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = COLORS.border;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px',
                }}
              >
                <span style={{ fontSize: '24px' }}>{category.icon}</span>
                <h3
                  style={{
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: 600,
                    color: COLORS.text,
                    fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                  }}
                >
                  {category.title}
                </h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {category.skills.map((skill, j) => (
                  <span
                    key={j}
                    style={{
                      padding: '8px 14px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '6px',
                      fontSize: '13px',
                      color: COLORS.textMuted,
                      fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                      border: `1px solid ${COLORS.border}`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
