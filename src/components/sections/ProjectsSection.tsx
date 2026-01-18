'use client';

import { COLORS } from '@/constants/colors';
import type { Project } from '@/types';
import { PlanetOrb } from '@/components/ui';

const projects: Project[] = [
  { id: '1', title: 'Neural Engine', subtitle: 'AI / ML', icon: '🧠' },
  { id: '2', title: 'Cloud Platform', subtitle: 'Full Stack', icon: '☁️' },
  { id: '3', title: 'Data Cosmos', subtitle: 'Engineering', icon: '📊' },
  { id: '4', title: 'Mobile Galaxy', subtitle: 'React Native', icon: '📱' },
];

export function ProjectsSection() {
  return (
    <section
      id="projects"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
      }}
    >
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
          My Work
        </p>
        <h2
          style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 700,
            color: COLORS.text,
            fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          Featured Projects
        </h2>
      </div>

      {/* Planet Gallery */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '50px',
          maxWidth: '1000px',
          padding: '0 20px',
        }}
      >
        {projects.map((project, index) => (
          <PlanetOrb key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
