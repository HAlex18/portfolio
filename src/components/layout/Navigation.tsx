'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { COLORS } from '@/constants/colors';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import type { NavItem, NavigationProps } from '@/types';

const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export function Navigation({ activeSection }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check viewport width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: isMobile ? '16px 20px' : '20px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Logo */}
        <div
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            zIndex: 101,
          }}
          onClick={() => scrollTo('home')}
        >
          <Image
            src="/logo.svg"
            alt="Hiroko A Mizoguchi"
            width={isMobile ? 200 : 240}
            height={isMobile ? 25 : 30}
            priority
          />
        </div>

        {/* Desktop Nav Links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeSection === item.id ? COLORS.accent : COLORS.textMuted,
                  fontSize: '14px',
                  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                  cursor: 'pointer',
                  padding: '8px 0',
                  position: 'relative',
                  transition: 'color 0.3s',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {item.label}
                {activeSection === item.id && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: COLORS.accent,
                      borderRadius: '1px',
                    }}
                  />
                )}
              </button>
            ))}
            <LanguageSwitcher />
          </div>
        )}

        {/* Hamburger Button (Mobile) */}
        {isMobile && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 101,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '44px',
              height: '44px',
            }}
          >
            {/* Hamburger Icon / X Icon */}
            <div
              style={{
                width: '24px',
                height: '2px',
                background: COLORS.text,
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: isMobileMenuOpen ? 'rotate(45deg) translateY(0)' : 'rotate(0) translateY(-6px)',
              }}
            />
            <div
              style={{
                width: '24px',
                height: '2px',
                background: COLORS.text,
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                opacity: isMobileMenuOpen ? 0 : 1,
                transform: isMobileMenuOpen ? 'translateX(-10px)' : 'translateX(0)',
              }}
            />
            <div
              style={{
                width: '24px',
                height: '2px',
                background: COLORS.text,
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(0)' : 'rotate(0) translateY(6px)',
              }}
            />
          </button>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(180deg, ${COLORS.void} 0%, ${COLORS.space} 100%)`,
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            opacity: isMobileMenuOpen ? 1 : 0,
            pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
          }}
        >
          {/* Decorative stars in menu */}
          <div
            style={{
              position: 'absolute',
              top: '15%',
              left: '10%',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: COLORS.star,
              opacity: 0.5,
              boxShadow: `
                60px 30px 0 ${COLORS.star},
                200px 80px 0 ${COLORS.star},
                80px 200px 0 ${COLORS.star},
                250px 150px 0 ${COLORS.star}
              `,
            }}
          />

          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === item.id ? COLORS.accent : COLORS.text,
                fontSize: '28px',
                fontWeight: 600,
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                cursor: 'pointer',
                padding: '16px 32px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                transition: 'all 0.3s ease',
                transform: isMobileMenuOpen ? 'translateY(0)' : `translateY(${20 + index * 10}px)`,
                opacity: isMobileMenuOpen ? 1 : 0,
                transitionDelay: isMobileMenuOpen ? `${index * 0.05}s` : '0s',
              }}
            >
              {item.label}
              {activeSection === item.id && (
                <div
                  style={{
                    width: '40px',
                    height: '3px',
                    background: COLORS.accent,
                    borderRadius: '2px',
                    margin: '8px auto 0',
                  }}
                />
              )}
            </button>
          ))}

          {/* Language Switcher in Mobile Menu */}
          <div
            style={{
              marginTop: '24px',
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: 'opacity 0.3s ease',
              transitionDelay: isMobileMenuOpen ? '0.25s' : '0s',
            }}
          >
            <LanguageSwitcher />
          </div>

          {/* Accessibility note at bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              opacity: isMobileMenuOpen ? 0.5 : 0,
              transition: 'opacity 0.3s ease 0.2s',
            }}
          >
            <span style={{ fontSize: '12px' }}>👁️</span>
            <span
              style={{
                fontSize: '10px',
                color: COLORS.textDim,
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Color-blind friendly
            </span>
          </div>
        </div>
      )}
    </>
  );
}
