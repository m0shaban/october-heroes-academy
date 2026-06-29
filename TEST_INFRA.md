# E2E Test Infra: October Heroes Academy

## Test Philosophy
- Opaque-box, requirement-driven. No dependency on implementation design.
- Methodology: Category-Partition + Boundary Value Analysis (BVA) + Pairwise + Real-World Workload Testing.

## Feature Inventory
| # | Feature | Source (requirement) | Tier 1 (Coverage) | Tier 2 (Boundary) | Tier 3 (Cross-Feature) |
|---|---------|---------------------|:------:|:------:|:------:|
| 1 | Locale & URL Sync | ORIGINAL_REQUEST §R4 / §R2 | 5 cases | 5 cases | ✓ (3 combinations) |
| 2 | Navbar & Scroll Navigation | ORIGINAL_REQUEST §R1 | 5 cases | 5 cases | ✓ (2 combinations) |
| 3 | Gallery & Lightbox | ORIGINAL_REQUEST §R1 | 5 cases | 5 cases | ✓ (2 combinations) |
| 4 | Interactive Contact Form | ORIGINAL_REQUEST §R1 | 5 cases | 5 cases | ✓ (1 combination) |
| 5 | WhatsApp & Mobile Sticky CTA | ORIGINAL_REQUEST §R1 | 5 cases | 5 cases | ✓ (2 combinations) |

## Test Architecture
- **Test Runner**: Playwright (TypeScript)
- **Execution Command**: `npx playwright test`
- **Output Directory**: `playwright-report/`
- **Directory Layout**:
  - `playwright.config.ts` — configuration file
  - `tests/academy-e2e.spec.ts` — unified spec file containing all Tier 1-4 test suites

## Coverage Thresholds
- **Tier 1 (Feature Coverage)**: 25 test cases (5 per feature)
- **Tier 2 (Boundary & Corner Cases)**: 25 test cases (5 per feature)
- **Tier 3 (Cross-Feature Combinations)**: 5 test cases
- **Tier 4 (Real-World Application Scenarios)**: 5 test cases
- **Total Minimum**: 60 test cases

---

## Detailed Test Case Registry

### Tier 1: Feature Coverage (Happy Path)
1. **locale-default-arabic**: Verify default page load is in Arabic (`lang="ar"`, RTL, Cairo font).
2. **locale-switch-to-english**: Click English switch in Navbar, verify URL updates to `?lang=en`, document direction becomes LTR.
3. **locale-switch-back-to-arabic**: Switch from English to Arabic, verify URL updates to `?lang=ar`, document direction becomes RTL.
4. **locale-deep-link-english**: Direct navigation to `?lang=en` loads English contents directly.
5. **locale-deep-link-arabic**: Direct navigation to `?lang=ar` loads Arabic contents directly.
6. **navbar-links-exist**: Verify all key navigation links (Hero, Features, Sports, Coaches, Gallery, Contact) exist in the active language.
7. **navbar-appearance-scroll**: Scroll page down, verify navbar background class transitions (transparent to solid glassmorphic background).
8. **navbar-back-to-top**: Scroll down page, verify "back to top" button appears and clicks to scroll window back to top.
9. **navbar-mobile-drawer-toggle**: On mobile viewports (375px), click hamburger menu, verify mobile drawer slides open.
10. **navbar-mobile-drawer-close**: Verify clicking the close button on mobile drawer closes it.
11. **gallery-grid-loaded**: Verify gallery section exists and displays photo grid with images.
12. **gallery-lightbox-open**: Click on a gallery image, verify lightbox overlay opens.
13. **gallery-lightbox-content**: Verify lightbox shows the clicked photo in high quality and applies backdrop blur.
14. **gallery-lightbox-close-btn**: Click close button in lightbox, verify lightbox closes.
15. **gallery-lightbox-scroll-lock**: Verify page scroll is locked when lightbox is open and restored when closed.
16. **contact-fields-visible**: Verify form input fields (name, email, phone, message) are visible.
17. **contact-fields-input**: Verify typing into form fields updates values and floats labels properly.
18. **contact-fields-glow**: Verify form fields apply glow ring on focus.
19. **contact-maps-loaded**: Verify Google Maps iframe integration loads successfully.
20. **contact-submit-success**: Fill contact form correctly, click submit, verify success message appears (or no page reload occurs).
21. **ctas-whatsapp-fixed**: Verify floating WhatsApp CTA is fixed at bottom-right.
22. **ctas-whatsapp-pulse**: Verify WhatsApp CTA has pulse animation.
23. **ctas-whatsapp-expand**: Click WhatsApp CTA, verify chat bubble expands.
24. **ctas-whatsapp-link**: Verify Expanded chat bubble contains WA link pointing to phone `01144050600`.
25. **ctas-mobile-sticky-banner**: On mobile viewports, scroll past Hero, verify sticky mobile contact bar ("Call Now" + "WhatsApp") appears.

### Tier 2: Boundary & Edge Cases
26. **locale-invalid-param**: Load page with `?lang=invalid`, verify page defaults to Arabic.
27. **locale-rapid-toggle**: Toggle language switch 5 times rapidly, verify no layout crash.
28. **locale-anchor-url-sync**: Click navbar anchors with `?lang=en` active, verify locale parameter is preserved.
29. **locale-meta-tags-sync**: Verify canonical link and hreflang alternate tags update based on active language.
30. **locale-html-dir-update**: Verify HTML `dir` attribute matches language direction dynamically.
31. **navbar-drawer-nav-close**: Mobile drawer closes automatically when clicking a navigation anchor inside it.
32. **navbar-drawer-resize-hide**: Resize window from 375px to 1024px while drawer is open, verify drawer is hidden.
33. **navbar-active-scroll-highlight**: Verify navbar links highlight active section as page scrolls.
34. **navbar-top-scroll-btn-hidden**: Verify scroll-to-top button is completely hidden at scroll position (y=0).
35. **navbar-mobile-drawer-touch-size**: Verify mobile drawer close & toggle targets are >= 44x44px.
36. **gallery-images-resolved**: Verify all images in gallery load successfully without HTTP errors.
37. **gallery-lightbox-close-escape**: Verify lightbox closes when pressing the 'Escape' keyboard key.
38. **gallery-lightbox-close-backdrop**: Verify lightbox closes when clicking on the blurred backdrop area outside the image.
39. **gallery-lightbox-layout-shift**: Verify opening and closing lightbox does not cause layout shifts.
40. **gallery-lightbox-mobile-fit**: Verify lightbox image fits within mobile viewport (375px) without cutoffs.
41. **contact-validation-empty**: Submit empty contact form, verify validation error states appear.
42. **contact-validation-email**: Type invalid email address, verify submit triggers email validation error.
43. **contact-validation-length**: Verify message field handles maximum character boundary inputs.
44. **contact-validation-phone**: Verify phone number validation handles invalid characters/patterns.
45. **contact-form-lang-preservation**: Type into form fields, switch language, verify inputs remain preserved.
46. **ctas-mobile-banner-desktop-hidden**: Verify sticky mobile contact bar is hidden on desktop viewports.
47. **ctas-mobile-banner-hero-hidden**: Verify sticky mobile contact bar is hidden when scrolled at top of mobile viewport (on Hero).
48. **ctas-whatsapp-bubble-close**: Verify expanded WhatsApp chat bubble closes via close button.
49. **ctas-mobile-banner-links**: Verify sticky mobile banner contains correct dial link `tel:01144050600` and WA link.
50. **ctas-whatsapp-scrolling**: Verify floating WhatsApp CTA remains responsive and visible while scrolling.

### Tier 3: Cross-Feature Combinations
51. **cross-lightbox-locale-switch**: Open gallery lightbox, switch language, verify lightbox remains open and text shifts to new language.
52. **cross-mobile-drawer-locale-switch**: Open mobile drawer, switch language in drawer, verify drawer stays open and translates dynamically.
53. **cross-form-state-locale-switch**: Partially fill contact form, switch language, verify input contents are preserved while labels/placeholders translate.
54. **cross-mobile-banner-whatsapp-overlap**: Verify no visual overlap or z-index layout conflict between WhatsApp floating CTA and sticky mobile contact bar.
55. **cross-scroll-highlight-locale**: Switch language, scroll down, verify navbar highlights active section matches translated anchors.

### Tier 4: Real-World User Workflow Scenarios
56. **scenario-arabic-prospect-registration**: Complete Arabic workflow: Load page -> Review hero counters -> Scroll to features -> View sports program -> Fill out contact form -> Submit.
57. **scenario-english-visitor-whatsapp**: Complete English workflow: Load page -> Switch to English -> Review coaches -> Open gallery lightbox -> Close lightbox -> Click WhatsApp CTA -> Open chat link.
58. **scenario-mobile-quick-call**: Complete Mobile workflow: Load 375px viewport -> Scroll past Hero -> Sticky mobile banner appears -> Click "Call Now" button -> Check link href.
59. **scenario-media-heavy-browsing**: Browse media: Load page -> Open gallery -> Scroll through grid -> Open lightbox -> Close -> Scroll to Sports -> Hover elements -> Responsive checks.
60. **scenario-deep-link-scroll-anchor**: Direct navigation to `?lang=en#contact`, verify user lands directly at Contact section in English, ready to input text.
