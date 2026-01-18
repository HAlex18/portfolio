# Portfolio Website

## Requirements Specification Document

**Version 1.2 | January 2026**

---

## 1. Executive Summary

This document outlines the requirements for a professional portfolio website targeting System Development, Web Development, and AI Development services. The portfolio aims to attract freelance clients and potential employers while demonstrating deep technical expertise across the full stack, AI/ML, and infrastructure domains.

---

## 2. Goals & Objectives

### 2.1 Primary Goals

- Attract high-quality freelance clients seeking development services
- Land full-time or contract positions at target companies
- Showcase technical versatility: Full-stack + AI + Infrastructure
- Demonstrate hands-on expertise through interactive demos

### 2.2 Target Audience

| Audience           | Their Goals                 | What They Look For                                   |
| ------------------ | --------------------------- | ---------------------------------------------------- |
| Hiring Managers    | Find qualified candidates   | Technical skills, project quality, communication     |
| Startup Founders   | Find reliable developers    | Versatility, problem-solving, cost-effectiveness     |
| Enterprise Clients | Find specialized expertise  | Infrastructure knowledge, scalability experience     |
| Other Developers   | Collaboration opportunities | Code quality, technical depth, community involvement |

---

## 3. Site Structure & Sections

| Section                 | Description                                                        | Priority  | Status      |
| ----------------------- | ------------------------------------------------------------------ | --------- | ----------- |
| **Hero/Landing**        | Strong first impression with name, roles, hook statement, and CTAs | Must Have | ✅ Complete |
| **About/Biography**     | Personal story, background, philosophy, and what drives you        | Must Have | ✅ Complete |
| **Skills & Stack**      | Visual display organized by: Development, AI/ML, Infrastructure    | Must Have | ✅ Complete |
| **Projects Gallery**    | Portfolio with interactive planet orb visuals                      | Must Have | ✅ Complete |
| **Interactive AI Demo** | Chatbot that knows about you and can answer visitor questions      | Must Have | ✅ Complete |
| **Contact**             | Form + links to GitHub, LinkedIn, email                            | Must Have | ✅ Complete |

---

## 4. Interactive AI Feature

### 4.1 Personal Chatbot

An AI-powered chatbot embedded in the portfolio that can answer questions about your skills, experience, and projects. This serves dual purposes: demonstrating AI expertise and providing 24/7 visitor engagement.

**Implementation Status:** ✅ Complete

**Current Capabilities:**

- Answer FAQs about experience: "What's your experience with Laravel?"
- Provide project recommendations based on visitor interests
- Floating chat widget with message history
- Rate limiting: 20 messages/hour/IP
- Secure server-side API proxy

---

## 5. Technical Stack

### 5.1 Frontend

| Technology     | Purpose                            | Status         |
| -------------- | ---------------------------------- | -------------- |
| Next.js 16     | React Framework with App Router    | ✅ Implemented |
| React 19       | UI Library with latest features    | ✅ Implemented |
| TypeScript 5   | Type Safety                        | ✅ Implemented |
| Tailwind CSS 4 | Styling with CSS custom properties | ✅ Implemented |
| CSS Animations | Micro-interactions and transitions | ✅ Implemented |

### 5.2 Backend & API

| Technology         | Purpose                         | Status         |
| ------------------ | ------------------------------- | -------------- |
| Next.js API Routes | Primary API for contact & chat  | ✅ Implemented |
| Resend             | Email delivery for contact form | ✅ Implemented |

### 5.3 AI & Machine Learning

| Technology           | Purpose                                    | Status         |
| -------------------- | ------------------------------------------ | -------------- |
| Anthropic Claude API | LLM for chatbot (claude-sonnet-4-20250514) | ✅ Implemented |

---

## 6. Infrastructure & DevOps

Infrastructure expertise is a key differentiator. The portfolio itself will serve as a demonstration of deep infrastructure knowledge.

### 6.1 Hosting & Deployment

| Service              | Purpose                      | Status                  |
| -------------------- | ---------------------------- | ----------------------- |
| Vercel / AWS Amplify | Frontend hosting             | 🔄 Pending deployment   |
| Docker               | Development containerization | ✅ Dockerfile.dev ready |
| GitHub Actions       | CI/CD pipeline               | 🔄 Pending setup        |

### 6.2 Infrastructure Showcase Elements

- Architecture diagrams in project case studies
- CI/CD pipeline visualization (GitHub Actions)
- Docker containerization badges/notes
- Dedicated "How This Site Works" technical page

**Status:** Pending (Phase 5)

---

## 7. Internationalization (i18n)

### 7.1 Supported Languages

| Language | Code | Primary Use                                 | Status      |
| -------- | ---- | ------------------------------------------- | ----------- |
| English  | en   | International clients, global opportunities | ✅ Default  |
| Japanese | ja   | Primary market, local clients               | ✅ Complete |

### 7.2 Implementation

**Implementation Status:** ✅ Complete

**Approach:**

- next-intl for Next.js App Router integration
- URL-based locale routing (`/en/`, `/ja/`)
- Language switcher component with manual override

**Translated Sections:**

| Section    | Strings | Status      |
| ---------- | ------- | ----------- |
| Hero       | 6       | ✅ Complete |
| About      | 10      | ✅ Complete |
| Contact    | 12      | ✅ Complete |
| AI Chatbot | 10      | ✅ Complete |
| **Total**  | **38**  | ✅ Complete |

**Note:** Navigation labels, Projects, and Skills sections remain English-only (intentional for consistency).

---

## 8. Design Direction

The design philosophy is "Simple but Playful" — clean, professional layouts enhanced with delightful micro-interactions.

### 8.1 Design Principles

1. Clean, minimal layouts with generous whitespace ✅
2. Subtle micro-interactions on hover and scroll ✅
3. Playful animations that don't distract from content ✅
4. Personality in copywriting and visual elements ✅
5. Colorblind-safe color palette ✅ (dark theme default, no toggle needed)

### 8.2 Current Implementation

- Space/cosmic theme with dark background
- Interactive planet orb visuals for projects
- Starfield and shooting star animations
- Color-blind friendly palette
- Responsive design (mobile-first)

---

## 9. Content Requirements

| Content Type              | Status       | Notes                             |
| ------------------------- | ------------ | --------------------------------- |
| Professional bio/story    | ✅ Complete  | English and Japanese translations |
| Project descriptions      | ✅ Complete  | 4 projects with descriptions      |
| Project screenshots/demos | ✅ Complete  | Planet orb visuals implemented    |
| Skills inventory          | ✅ Complete  | 6 categories with tags            |
| Headshot/avatar           | ❌ Not Ready | Placeholder used                  |

---

## 10. Development Phases

### Phase 1: Foundation ✅ Complete

- [x] Set up Next.js project with TypeScript
- [x] Configure Tailwind CSS
- [x] Create basic layout and navigation

### Phase 2: Core Pages ✅ Complete

- [x] Build Hero section with animations
- [x] Create About/Bio section
- [x] Develop Skills showcase with visual elements
- [x] Build Projects gallery with planet orb visuals
- [x] Implement Contact form with Resend email

### Phase 3: AI Integration ✅ Complete

- [x] Implement chatbot API with Anthropic Claude
- [x] Build and integrate chatbot UI (floating widget)
- [x] Add rate limiting and security measures

### Phase 4: Polish 🔄 In Progress

- [x] Responsive design
- [x] Color accessibility
- [x] i18n for Hero, About, Contact, and Chatbot sections
- [ ] Performance optimization
- [ ] SEO implementation

### Phase 5: Infrastructure & Deployment ❌ Pending

- [ ] Set up hosting infrastructure
- [ ] Configure CI/CD pipeline
- [ ] Implement monitoring and logging
- [ ] Create "How This Site Works" technical page
- [ ] Launch!

---

## 11. Security Requirements

### 11.1 API & Chatbot Protection

**Rate Limits:** ✅ Implemented

| Endpoint     | Limit                 | Action on Exceed                   | Status |
| ------------ | --------------------- | ---------------------------------- | ------ |
| Chatbot      | 20 messages/hour/IP   | Temporary block + friendly message | ✅     |
| Contact Form | 5 submissions/hour/IP | Reject with cooldown notice        | ✅     |

**LLM Cost Control:** ✅ Implemented

| Strategy             | Implementation                      | Status |
| -------------------- | ----------------------------------- | ------ |
| Use efficient models | Claude Sonnet for chatbot           | ✅     |
| Click to start       | User must click to initiate chatbot | ✅     |
| Rate limiting        | 20 msgs/hour prevents abuse         | ✅     |
| Server-side API key  | Never exposed to client             | ✅     |

**Prompt Security:** ✅ Implemented

- Input sanitization before sending to LLM
- System prompt hardening (server-side only)
- Error handling with fallback messages

### 11.2 Contact Form Security

**Approach:** No CAPTCHA — using non-intrusive protection ✅ Implemented

| Protection           | Purpose                                   | Status |
| -------------------- | ----------------------------------------- | ------ |
| **Honeypot Field**   | Hidden field that bots fill, humans don't | ✅     |
| **Rate Limiting**    | 5 submissions/hour/IP                     | ✅     |
| **Input Validation** | Sanitize inputs, enforce length limits    | ✅     |
| **Email Validation** | Format check                              | ✅     |

### 11.3 General Security Practices

- **Dependencies:** ESLint, Prettier, Husky pre-commit hooks ✅
- **Secrets:** Environment variables only, .env in .gitignore ✅
- **Type Safety:** Strict TypeScript configuration ✅

---

## 12. Open Items & Decisions

| Item              | Decision                      | Notes                    |
| ----------------- | ----------------------------- | ------------------------ |
| Domain name       | ❌ Pending                    | Choose domain name       |
| LLM provider      | ✅ Anthropic Claude           | claude-sonnet-4-20250514 |
| Email provider    | ✅ Resend                     | For contact form         |
| Animation library | ✅ CSS animations             | Framer Motion not needed |
| Database          | ✅ None                       | Stateless design         |
| CMS               | ✅ None                       | Content hardcoded        |
| i18n scope        | ✅ Hero, About, Contact, Chat | 38 strings translated    |

---

_— End of Document —_
