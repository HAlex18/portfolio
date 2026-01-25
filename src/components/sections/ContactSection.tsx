'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { COLORS } from '@/constants/colors';
import { socialLinks } from '@/data';
import { isValidEmail } from '@/utils/validation';
import type { ContactFormData } from '@/types';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactSection() {
  const translations = useTranslations('contact');
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
      setErrorMessage(translations('validation.nameRequired'));
      return;
    }

    if (!formData.email.trim() || !isValidEmail(formData.email.trim())) {
      setStatus('error');
      setErrorMessage(translations('validation.emailInvalid'));
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus('error');
      setErrorMessage(translations('validation.messageRequired'));
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
        setErrorMessage(translations('validation.rateLimited'));
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
            {translations('label')}
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
            {translations('heading')}
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
            {translations('description')}
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
                {translations('form.name')} <span style={{ color: COLORS.error }}>*</span>
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
                {translations('form.company')}
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
                {translations('form.email')} <span style={{ color: COLORS.error }}>*</span>
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
                {translations('form.message')} <span style={{ color: COLORS.error }}>*</span>
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
                  background: 'rgba(249, 115, 22, 0.1)',
                  border: '1px solid rgba(249, 115, 22, 0.3)',
                  borderRadius: '8px',
                  color: COLORS.error,
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
                  background: 'rgba(14, 165, 233, 0.1)',
                  border: '1px solid rgba(14, 165, 233, 0.3)',
                  borderRadius: '8px',
                  color: COLORS.success,
                  fontSize: '14px',
                  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
                }}
              >
                {translations('success')}
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
              {status === 'submitting' ? translations('form.submitting') : translations('form.submit')}
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
              {translations('socialHeading')}
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
