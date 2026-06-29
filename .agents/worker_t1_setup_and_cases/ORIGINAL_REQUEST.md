## 2026-06-29T19:44:40Z

Please set up the Playwright E2E testing framework and write the E2E test suite for the October Heroes Academy website overhaul.

Your working directory is: d:\apps\أكاديمية-أبطال-أكتوبر\.agents\worker_t1_setup_and_cases
You must write a handoff report at d:\apps\أكاديمية-أبطال-أكتوبر\.agents\worker_t1_setup_and_cases\handoff.md when done.

### Instructions:
1. Check if `@playwright/test` is present in devDependencies of package.json. If not, install it: `npm install -D @playwright/test`.
2. Configure Playwright by creating `playwright.config.ts` at the root. Configure it to run the Vite dev server (`npm run dev` on port 3000) using the `webServer` option in Playwright config, and target `http://localhost:3000`. Set headless mode to true. Make sure timeouts and retries are robust.
3. Write the 60 test cases detailed in `d:\apps\أكاديمية-أبطال-أكتوبر\TEST_INFRA.md` inside `tests/academy-e2e.spec.ts` (create the `tests` directory if it does not exist).
4. Since you cannot modify the application source code (that is done by the implementation track), your tests should check for elements that match the design and requirements in `ORIGINAL_REQUEST.md`. Ensure selectors are resilient (use text contents, accessibility roles, or generic class names). If there are missing elements or placeholders, check for what is expected based on the standard components.
5. Run the test suite using `npx playwright test` to verify all tests pass or to document failures. (Note: Since we are in the testing track, the implementation sub-orchestrator is building the features. If some tests fail because features are not fully implemented yet, that is expected, but make sure the test runner executes and the test cases are syntactically and logically correct. If you can, test against whatever is currently in the codebase).
6. Provide a detailed summary of tests written, commands run, and results in your handoff report.

MANDATORY INTEGRITY WARNING:
> DO NOT CHEAT. All implementations must be genuine. DO NOT
> hardcode test results, create dummy/facade implementations, or
> circumvent the intended task. A Forensic Auditor will independently
> verify your work. Integrity violations WILL be detected and your
> work WILL be rejected.
