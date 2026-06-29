# Scope: Implementation Track

This scope covers implementation milestones B1 to B5 for the October Heroes Academy website overhaul.

## Architecture
- React 19 + TypeScript + Vite + Tailwind CSS v4 + Motion.
- All code files should reside in `src/` and `public/`.
- No code files are allowed inside `.agents/`.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| B1 | Setup & Core Layout | i18n query parameters, sticky navbar with mobile drawer, footer, scroll progress indicator | none | PLANNED |
| B2 | Hero & Features Sections | Full-viewport carousel, gold particle float background, reveal animations, tilt features cards | B1 | PLANNED |
| B3 | Showcase & CTAs | Zoom sports cards, mobile sports carousel, coach card details hover reveal, masonry gallery with image lightbox, floating WhatsApp, mobile sticky CTA | B2 | PLANNED |
| B4 | SEO, AIO & Docs | Canonical, hreflang, JSON-LD schemas in Helmet, robots.txt, sitemap.xml, llms.txt, llms-full.txt, ai-plugin.json | B1, B3 | PLANNED |
| B5 | Build & Deployment | Vite base path support, GitHub Actions workflow deploy.yml, 404.html | B4 | PLANNED |

## Interface Contracts
- See root `PROJECT.md` for contracts.
