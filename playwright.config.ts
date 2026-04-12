/**
 * @file playwright.config.ts
 * @description Playwright configuration for end-to-end tests.
 *
 * WHAT IS PLAYWRIGHT?
 * Playwright is a browser automation framework developed by Microsoft.
 * It lets you write tests that open a real browser, click buttons,
 * fill forms, and assert what the user would actually see.
 *
 * WHY E2E TESTS?
 * Unit tests verify individual functions in isolation.
 * E2E tests verify that the WHOLE application works together —
 * routing, API calls, UI rendering, animations, forms.
 *
 * HOW TO RUN:
 *   npx playwright test              → run all tests headlessly
 *   npx playwright test --ui         → interactive UI mode (great for debugging)
 *   npx playwright test --headed     → see the browser open and run
 *   npx playwright show-report       → HTML test report after a run
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  /** Directory that contains all test files */
  testDir: './tests/e2e',

  /**
   * Pattern to match test files.
   * Files must end with .spec.ts or .test.ts to be picked up.
   */
  testMatch: '**/*.spec.ts',

  /**
   * Run all tests in parallel for speed.
   * Each test file gets its own worker process.
   */
  fullyParallel: true,

  /**
   * Fail the build on CI if a test.only() is accidentally committed.
   * This prevents a single focused test from silently skipping the suite.
   */
  forbidOnly: !!process.env.CI,

  /** Number of retries for flaky tests (2 on CI, 0 locally) */
  retries: process.env.CI ? 2 : 0,

  /** Number of parallel workers (1 on CI to avoid resource issues) */
  workers: process.env.CI ? 1 : undefined,

  /** HTML report — open with: npx playwright show-report */
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'], // Console output for each test
  ],

  /** Global test settings applied to every test */
  use: {
    /** Base URL — tests use page.goto('/') instead of full URL */
    baseURL: 'http://localhost:3000',

    /**
     * Traces capture screenshots, network requests, and DOM snapshots.
     * Only saved on first retry so you don't fill disk on passing runs.
     */
    trace: 'on-first-retry',

    /** Screenshot on failure — helps diagnose CI failures */
    screenshot: 'only-on-failure',

    /** Video on first retry — see exactly what happened */
    video: 'on-first-retry',
  },

  /** Browser matrix — test on real browser engines */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
  ],

  /**
   * Start the dev server automatically before tests run.
   * Tests don't need to manually start the server.
   */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
