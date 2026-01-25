'use client';

import { startTransition } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { COLORS } from '@/constants/colors';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    startTransition(() => {
      router.replace(newPath, { scroll: false });
    });
  };

  return (
    <button
      onClick={() => switchLocale(locale === 'en' ? 'ja' : 'en')}
      style={{
        padding: '8px 12px',
        background: 'transparent',
        border: `1px solid ${COLORS.border}`,
        borderRadius: '6px',
        color: COLORS.textMuted,
        fontSize: '13px',
        fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui",
        cursor: 'pointer',
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
      {locale === 'en' ? '日本語' : 'English'}
    </button>
  );
}
