# Scope: E2E Testing Track

This scope covers milestone T1 for the E2E Testing suite of the October Heroes Academy website overhaul.

## Architecture
- Opaque-box requirement-driven testing.
- Uses Playwright or a similar testing framework.
- Creates test cases that run against the served build.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| T1 | Test Suite Setup & Cases | Setup E2E testing framework, create Tier 1 (Feature Coverage), Tier 2 (Boundary), Tier 3 (Cross-Feature), and Tier 4 (Real-World) test cases. Publish `TEST_READY.md`. | none | IN_PROGRESS |

## Interface Contracts
- Tests must interact with the application solely through the public DOM, checking translatable strings, animations, layouts, and CTAs.
- Runs on local port 5173 or a dynamically allocated port.
