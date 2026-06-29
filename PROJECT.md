# Project: October Heroes Academy UI/UX Overhaul

## Architecture
- **Tech Stack**: React 19 + Vite 6 + Tailwind CSS v4 + Motion (Framer Motion) + i18next + react-helmet-async.
- **Languages**: Arabic (default, RTL) & English (LTR).
- **Core State**: In-memory locale synchronized with URL parameter `?lang=ar|en`.
- **Target Deployment**: GitHub Pages with static sub-directory assets or custom domain redirects.

## Code Layout
- `src/main.tsx` — App bootstrap and Context Providers.
- `src/App.tsx` — Main application container, router, and root styles.
- `src/i18n.ts` — Translation tables and dynamic query parameters handling.
- `src/index.css` — Global CSS imports, Tailwind `@theme` overrides, and custom glassmorphism styles.
- `src/components/` — Individual interactive page components (Navbar, HeroSection, FeaturesSection, etc.).
- `public/` — Static assets (logos, pictures, sitemap.xml, robots.txt, llms.txt, .well-known/ai-plugin.json).

## Milestones

| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Setup & Core Layout | i18n URL synchronization, custom Tailwind classes, sticky glassmorphic navbar with mobile drawer, footer, scroll progress indicator | none | PLANNED |
| 2 | Hero & Features Sections | Full-viewport carousel, gold particle float, reveal animations, counter hooks, and 3D tilt feature cards | M1 | PLANNED |
| 3 | Showcase & CTAs | Interactive zoom sports cards, swipeable carousel on mobile, coach card details hover reveal, masonry gallery with image lightbox, floating WhatsApp button, mobile sticky action bar | M2 | PLANNED |
| 4 | SEO, AIO & Documentation | Canonical, hreflang tags, dynamic JSON-LD schemas in Helmet, robots.txt, sitemap.xml, llms.txt, llms-full.txt, ai-plugin.json | M1, M3 | PLANNED |
| 5 | Build & Deployment | Vite dynamic base path, GitHub Actions workflow deploy.yml, 404.html redirection | M4 | PLANNED |
| 6 | E2E Testing Suite | Setup Playwright/testing framework, write Tier 1-4 tests (coverage, boundaries, combinations, workflows) | none | PLANNED |
| 7 | Integration & Hardening | Run full E2E test suite, fix bugs, add Tier 5 whitebox adversarial tests, Forensic Audit checks | M5, M6 | PLANNED |

## Interface Contracts
### URL/History ↔ Navbar & App
- URL changes to `?lang=en` or `?lang=ar` update `i18n.language` immediately.
- Toggling language in Navbar invokes history state push with `?lang=...` instead of only in-memory changes.

### E2E Test Suite ↔ Academy App
- The application should be served locally on port 5173 or a dynamic port for opaque-box E2E testing.
- Target elements use CSS selectors/accessible labels for query targets.
