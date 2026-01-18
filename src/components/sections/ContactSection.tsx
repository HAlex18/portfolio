'use client';

import { useState } from 'react';
import { COLORS } from '@/constants/colors';
import type { SocialLink, ContactFormData } from '@/types';

const socialLinks: SocialLink[] = [
  {
    icon: '📧',
    label: 'Email',
    value: 'hello@example.com',
    href: 'mailto:hello@example.com',
  },
  { icon: '💼', label: 'LinkedIn', value: '/in/yourname', href: '#' },
  { icon: '🐙', label: 'GitHub', value: '@yourname', href: '#' },
  { icon: '🐦', label: 'Twitter', value: '@yourname', href: '#' },
];

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: null,
    email: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState(''); // Bot trap
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus('error');
      setErrorMessage('Please enter your name (minimum 2 characters)');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus('error');
      setErrorMessage('Please enter a message (minimum 10 characters)');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          company: formData.company?.trim() || null,
          email: formData.email.trim(),
          message: formData.message.trim(),
          website: honeypot, // Honeypot field
        }),
      });

      const data = await response.json();

      if (response.status === 429) {
        setStatus('error');
        setErrorMessage('Too many submissions. Please try again in an hour.');
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', company: null, email: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    }
  };

  return (
    <section
      id="contact"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
      }}
    >
      <div style={{ maxWidth: '900px', width: '100%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
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
            Get In Touch
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
            Let&apos;s Work Together
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: COLORS.textMuted,
              fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
              margin: '20px auto 0',
              maxWidth: '500px',
              lineHeight: 1.7,
            }}
          >
            Have a project in mind? I&apos;d love to hear from you. Send me a message and let&apos;s create something
            amazing.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
          }}
        >
          {/* Contact Form */}
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleSubmit}>
            {/* Honeypot field - hidden from users, visible to bots */}
            <div
              style={{
                position: 'absolute',
                left: '-9999px',
                opacity: 0,
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            >
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  color: COLORS.textDim,
                  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '8px',
                }}
              >
                Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: COLORS.cardBg,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '8px',
                  color: COLORS.text,
                  fontSize: '15px',
                  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                  outline: 'none',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.accent)}
                onBlur={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  color: COLORS.textDim,
                  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '8px',
                }}
              >
                Company
              </label>
              <input
                type="text"
                value={formData.company ?? ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    company: e.target.value || null,
                  })
                }
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: COLORS.cardBg,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '8px',
                  color: COLORS.text,
                  fontSize: '15px',
                  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                  outline: 'none',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.accent)}
                onBlur={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  color: COLORS.textDim,
                  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '8px',
                }}
              >
                Email <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: COLORS.cardBg,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '8px',
                  color: COLORS.text,
                  fontSize: '15px',
                  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                  outline: 'none',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.accent)}
                onBlur={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  color: COLORS.textDim,
                  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '8px',
                }}
              >
                Message <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: COLORS.cardBg,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '8px',
                  color: COLORS.text,
                  fontSize: '15px',
                  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.accent)}
                onBlur={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
              />
            </div>
            {/* Status Messages */}
            {status === 'error' && errorMessage && (
              <div
                style={{
                  padding: '12px 16px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  color: '#ef4444',
                  fontSize: '14px',
                  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                }}
              >
                {errorMessage}
              </div>
            )}

            {status === 'success' && (
              <div
                style={{
                  padding: '12px 16px',
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '8px',
                  color: '#22c55e',
                  fontSize: '14px',
                  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                }}
              >
                Message sent successfully! I&apos;ll get back to you soon.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              style={{
                padding: '16px 32px',
                background: status === 'submitting' ? COLORS.textDim : COLORS.accent,
                color: COLORS.void,
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                transition: 'all 0.3s',
                marginTop: '8px',
                opacity: status === 'submitting' ? 0.7 : 1,
              }}
              onMouseOver={(e) => {
                if (status !== 'submitting') {
                  e.currentTarget.style.background = COLORS.accentHover;
                }
              }}
              onMouseOut={(e) => {
                if (status !== 'submitting') {
                  e.currentTarget.style.background = COLORS.accent;
                }
              }}
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message ✦'}
            </button>
          </form>

          {/* Social Links */}
          <div>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: COLORS.text,
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                marginBottom: '24px',
              }}
            >
              Or reach out directly
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px 20px',
                    background: COLORS.cardBg,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: '10px',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = COLORS.accent;
                    e.currentTarget.style.transform = 'translateX(8px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = COLORS.border;
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span style={{ fontSize: '24px' }}>{link.icon}</span>
                  <div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: COLORS.textDim,
                        fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {link.label}
                    </div>
                    <div
                      style={{
                        fontSize: '15px',
                        color: COLORS.text,
                        fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                        marginTop: '2px',
                      }}
                    >
                      {link.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
