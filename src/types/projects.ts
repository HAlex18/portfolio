// ============================================
// PROJECTS SECTION TYPE DEFINITIONS
// ============================================

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface PlanetOrbProps {
  project: Project;
  index: number;
}

export interface OrbitalParticlesProps {
  isHovered: boolean;
  seed?: number;
}
