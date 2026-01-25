# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Production build
npm run start            # Start production server

# Quality
npm run lint             # ESLint check
npm run lint:fix         # ESLint with auto-fix
npm run format           # Prettier format all files
npm run format:check     # Check formatting
npm run check            # Combined lint + format check
```

## Architecture

### Stack

- **Next.js 16** with App Router + **React 19**
- **TypeScript 5** (strict mode, path alias `@/*` → `src/*`)
- **Tailwind CSS 4** + inline styles with `COLORS` constant
- **next-intl** for i18n (English/Japanese)

### Directory Structure

```
src/
├── app/
│   ├── [locale]/         # i18n routing (/en/, /ja/)
│   │   ├── layout.tsx    # NextIntlClientProvider wrapper
│   │   └── page.tsx      # Main portfolio page (client component)
│   └── api/
│       ├── chat/         # Claude chatbot proxy (rate limited)
│       └── contact/      # Contact form + Resend email
├── components/
│   ├── sections/         # Page sections (Hero, About, Projects, Skills, Contact)
│   ├── features/         # Feature components (AIChatbot)
│   ├── layout/           # Navigation, Footer
│   ├── ui/               # Reusable (LanguageSwitcher, PlanetOrb)
│   └── background/       # Visual effects (StarField, ShootingStar)
├── constants/colors.ts   # Colorblind-safe palette
├── types/                # TypeScript interfaces (barrel export via index.ts)
├── locales/              # en.json, ja.json (38 strings each)
└── i18n/                 # config.ts, request.ts
```

### Key Patterns

**Styling**: Inline `style` objects using `COLORS` constant, not Tailwind classes:

```typescript
import { COLORS } from '@/constants/colors';
style={{ color: COLORS.accent, background: COLORS.cardBg }}
```

**Translations**: Use `useTranslations` hook:

```typescript
const t = useTranslations('section_key');
return <h1>{t('heading')}</h1>;
```

**API Security**: Both `/api/chat` and `/api/contact` implement:

- Rate limiting (in-memory Map, IP-based)
- Input sanitization
- Honeypot field (contact form)

**SSR Consistency**: Use `seededRandom()` from `@/utils/random` for animations to prevent hydration mismatch.

### Environment Variables

Required in `.env.local`:

```
ANTHROPIC_API_KEY=     # For chatbot
RESEND_API_KEY=        # For contact form
CONTACT_EMAIL=         # Recipient address
```

## Locales

- Supported: `en` (default), `ja`
- URL pattern: `/en/...`, `/ja/...`
- Translated: Hero, About, Contact, Chat sections
- Not translated (intentional): Navigation, Projects, Skills
