import type { SocialLink } from '@/types';

export const socialLinks: SocialLink[] = [
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
