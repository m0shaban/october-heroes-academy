# Project plan: October Heroes Academy UI/UX Overhaul

This plan outlines the steps, roles, and verification checkpoints for the premium UI/UX overhaul, SEO/AIO optimization, and GitHub Pages deployment configuration.

## Phases

### Phase 1: Codebase Analysis and Architecture Design
- **Goal**: Analyze the existing React + Vite + Tailwind 4 + Motion codebase, check files and dependencies, verify active assets, and define the detailed implementation & test architecture.
- **Workers**: `teamwork_preview_explorer` (3 parallel instances)
- **Outputs**:
  - `PROJECT.md`: Global index of milestones, architecture, layout, and contracts.
  - `TEST_INFRA.md`: Plan for the E2E test suite.

### Phase 2: Parallel Tracks Execution
We will run the Implementation Track and the E2E Testing Track in parallel.

#### Track A: E2E Testing Track (opaque-box, requirement-driven)
- **Goal**: Create a comprehensive E2E testing suite covering Tiers 1-4.
- **Milestones**:
  - A1: Test runner & infrastructure setup.
  - A2: Tier 1 & 2 test cases (Feature Coverage, Boundaries).
  - A3: Tier 3 & 4 test cases (Cross-Feature, Real-World Workloads).
  - A4: Publish `TEST_READY.md`.

#### Track B: Implementation Track
- **Goal**: Implement the premium glassmorphic UI, animations, SEO schemas, AIO files, and deployment configurations.
- **Milestones**:
  - B1: Global Layout, Sticky Glassmorphism Navbar, Footer, Mobile Drawer.
  - B2: Premium Hero (carousel, floating gold particles) & Features Sections (3D tilt cards).
  - B3: Interactive Sports, Coach, and Masonry Gallery sections, plus Floating WhatsApp & Mobile CTA.
  - B4: Comprehensive SEO (JSON-LD structured data, meta tags) & AIO (llms.txt, ai-plugin.json).
  - B5: Vite base path & GitHub Actions deploy workflow.

### Phase 3: Integration and Hardening
- **Goal**: Run all E2E tests, resolve bugs, and execute adversarial test coverage hardening.
- **Milestones**:
  - C1: Phase 1 E2E Test Pass (Tiers 1-4).
  - C2: Phase 2 Adversarial Coverage Hardening (Tier 5).

### Phase 4: Final Certification
- **Goal**: Conduct the final Forensic Audit check to verify integrity and zero cheating. Run full linting, building, and E2E verification.
- **Workers**: `teamwork_preview_auditor`
- **Output**: Clean audit certificate and handoff report.

## Verification Checklist

### Local Build & Lint
- [ ] `npm run lint` passes with no warnings/errors.
- [ ] `npm run build` succeeds and produces `dist/`.

### UI Acceptance
- [ ] Dark theme slate-950 base with blue/navy gradients and gold accents.
- [ ] Mobile drawer menu works with slide-in animation.
- [ ] WhatsApp floating pulse CTA works.
- [ ] Image carousel works on Hero section.
- [ ] Masonry gallery with lightbox.
- [ ] Sticky CTA banner at bottom for mobile.
- [ ] Scroll progress bar at top of page.

### SEO/AIO & Deployment
- [ ] Structured data with `@type SportsClub` in built HTML.
- [ ] robots.txt and sitemap.xml exist.
- [ ] llms.txt and llms-full.txt exist.
- [ ] .github/workflows/deploy.yml exists.
- [ ] 404.html exists in dist/.
