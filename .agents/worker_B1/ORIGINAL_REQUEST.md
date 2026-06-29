## 2026-06-29T19:49:50Z
You are the teamwork_preview_worker for Milestone B1: Setup & Core Layout.
Your working directory is d:\apps\أكاديمية-أبطال-أكتوبر\.agents\worker_B1.

### Objective
Implement the changes for Milestone B1:
1. i18n query parameters:
   - Update `src/i18n.ts` to parse URL query parameter `?lang=ar|en` during initialization. If present and valid, initialize the language to it. Otherwise, fallback to localStorage value, and then fallback to `'ar'`.
   - Update `src/components/Navbar.tsx` so that `toggleLanguage` dynamically pushes the new language to the browser's URL query parameters (e.g. using `window.history.pushState`). It must also change `i18n.language` to synchronize UI updates.
2. Sticky navbar with mobile drawer:
   - Add glassmorphic utility class `glass-nav` or direct classes to `src/index.css`:
     `background-color: rgba(0, 71, 171, 0.75); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);`
     Use it in the navbar wrapper.
   - Refactor `Navbar.tsx` to add a responsive hamburger menu toggle button.
   - When clicked, open a full screen or slide-down navigation drawer overlay using Framer Motion (or `motion` package) and `AnimatePresence`.
   - The drawer must contain the translated links, language toggle, and "Join Now" CTA button. Clicking links should close the drawer.
   - Update the logo img tag in `Navbar.tsx` to use `{t('alt_logo')}`. Add translation key `"alt_logo"` under resources.ar and resources.en in `src/i18n.ts`.
3. Footer:
   - Update the logo img tag in `Footer.tsx` to use `{t('alt_logo')}`.
4. Scroll progress indicator:
   - Implement a top progress bar at the very top of `src/App.tsx`.
   - Use `motion.div` with scroll-linked animation (`useScroll`, `useSpring`, `scaleX`).
   - The progress bar must dynamically switch its `transformOrigin` depending on translation direction: `transformOrigin: i18n.language === 'ar' ? 'right' : 'left'`.

Verify the build and lint output:
- Run `npm run lint` to check for type errors.
- Run `npm run build` to verify the build succeeds.

### MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

When completed, write your handoff report to `d:\apps\أكاديمية-أبطال-أكتوبر\.agents\worker_B1\handoff.md` and send a message back with the status.
