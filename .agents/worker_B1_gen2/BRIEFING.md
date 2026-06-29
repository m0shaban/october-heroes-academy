# BRIEFING — 2026-06-29

## Mission
Implement Milestone B1: Setup & Core Layout. This includes setting up i18n URL parameters, creating a sticky glassmorphic navbar with a mobile drawer, correcting the logo alt text translations, updating the footer, and adding a direction-aware scroll progress indicator in App.tsx.

## 🔒 My Identity
- Archetype: implementer, qa, specialist
- Roles: implementer, qa, specialist
- Working directory: d:\apps\أكاديمية-أبطال-أكتوبر\.agents\worker_B1_gen2
- Original parent: 94076147-5cbe-4738-9e74-74151c952dd3
- Milestone: B1: Setup & Core Layout

## 🔒 Key Constraints
- CODE_ONLY network mode: No external internet access.
- i18n URL queries: check ?lang=ar|en, fallback to localStorage, fallback to 'ar'.
- Navbar: Sticky with a glassmorphic background, Framer Motion hamburger drawer containing all translated links, language toggle, and "Join Now" CTA button. Logo must use {t('alt_logo')}.
- Footer: Logo must use {t('alt_logo')}.
- Scroll progress indicator: at the top of App.tsx, using motion.div with scroll-linked animation. transformOrigin must be direction-aware ('right' for 'ar', 'left' for 'en').
- Run lint and build to verify changes.

## Current Parent
- Conversation ID: 94076147-5cbe-4738-9e74-74151c952dd3
- Updated: not yet

## Task Summary
- **What to build**:
  - URL-synchronized language configuration in `src/i18n.ts` and `src/components/Navbar.tsx`.
  - Sticky glassmorphic navbar with Framer Motion mobile drawer.
  - Logo translation in navbar and footer.
  - Direction-aware scroll progress bar in `src/App.tsx`.
- **Success criteria**:
  - Language toggle switches parameters correctly and persists in URL / localStorage.
  - Hamburger menu opens/closes mobile drawer with animates.
  - Logo alt texts are localized.
  - Scroll progress bar moves from right-to-left in AR mode, and left-to-right in EN mode.
  - Project builds and lints cleanly.
- **Interface contracts**:
  - `src/i18n.ts`
  - `src/components/Navbar.tsx`
  - `src/components/Footer.tsx`
  - `src/App.tsx`
  - `src/index.css`

## Loaded Skills
- **Source**: C:\Users\shaban\.gemini\config\skills\writing-plans\SKILL.md
- **Local copy**: d:\apps\أكاديمية-أبطال-أكتوبر\.agents\worker_B1_gen2\writing-plans-SKILL.md
- **Core methodology**: Create testable implementation plans with exact files and commands.

- **Source**: C:\Users\shaban\.gemini\config\skills\verification-before-completion\SKILL.md
- **Local copy**: d:\apps\أكاديمية-أبطال-أكتوبر\.agents\worker_B1_gen2\verification-before-completion-SKILL.md
- **Core methodology**: Run builds, tests, and lints before declaring victory.

## Change Tracker
- **Files modified**: None yet
- **Build status**: Unknown
- **Pending issues**: None

## Quality Status
- **Build/test result**: Unknown
- **Lint status**: Unknown
- **Tests added/modified**: None

## Artifact Index
- d:\apps\أكاديمية-أبطال-أكتوبر\.agents\worker_B1_gen2\ORIGINAL_REQUEST.md — Original request
- d:\apps\أكاديمية-أبطال-أكتوبر\.agents\worker_B1_gen2\BRIEFING.md — Working briefing index
- d:\apps\أكاديمية-أبطال-أكتوبر\.agents\worker_B1_gen2\progress.md — Heartbeat and step-by-step progress tracking
