'use client';

import { useState, useEffect, useMemo } from 'react';
import { COLORS } from '@/constants/colors';
import { CONFIG } from '@/config';
import { throttle } from '@/utils/throttle';
import { StarField, ShootingStar } from '@/components/background';
import { Navigation, Footer } from '@/components/layout';
import { HeroSection, AboutSection, ProjectsSection, SkillsSection, ContactSection } from '@/components/sections';
import { AIChatbot } from '@/components/features';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = throttle(() => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    }, CONFIG.ui.scrollThrottleMs);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memoize static nebula styles to prevent recreation on every render
  const nebulaStyles = useMemo(
    () => ({
      primary: {
        position: 'fixed' as const,
        top: '10%',
        right: '-5%',
        width: '40%',
        height: '50%',
        background: `radial-gradient(ellipse, ${COLORS.nebulaPrimary}12 0%, transparent 60%)`,
        filter: 'blur(100px)',
        pointerEvents: 'none' as const,
      },
      secondary: {
        position: 'fixed' as const,
        bottom: '20%',
        left: '-10%',
        width: '35%',
        height: '40%',
        background: `radial-gradient(ellipse, ${COLORS.nebulaSecondary}15 0%, transparent 60%)`,
        filter: 'blur(80px)',
        pointerEvents: 'none' as const,
      },
    }),
    []
  );

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <StarField />
      <ShootingStar />

      {/* Nebula accents */}
      <div style={nebulaStyles.primary} />
      <div style={nebulaStyles.secondary} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navigation activeSection={activeSection} />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
        <AIChatbot />
      </div>
    </div>
  );
}
