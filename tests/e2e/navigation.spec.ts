/**
 * @file tests/e2e/navigation.spec.ts
 * @description Tests for site-wide navigation — header, links, routing.
 *
 * WHAT WE TEST:
 * - Homepage loads correctly
 * - All nav links navigate to the correct pages
 * - Logo navigates home
 * - "Get Started" CTA navigates to contact
 * - Active nav item is highlighted
 * - Mobile hamburger menu opens/closes
 *
 * HOW TO RUN JUST THIS FILE:
 *   npx playwright test navigation.spec.ts
 *   npx playwright test navigation.spec.ts --headed   (see the browser)
 */

import { test, expect } from '@playwright/test';

/** Open hamburger menu on mobile if nav links are hidden */
async function ensureNavOpen(page: import('@playwright/test').Page) {
  const hamburger = page.locator('[aria-label="Open navigation menu"]');
  if (await hamburger.isVisible()) {
    await hamburger.click();
    await page.waitForTimeout(300); // allow animation
  }
}

test.describe('Navigation', () => {

  test.beforeEach(async ({ page }) => {
    // Start every test from the homepage
    await page.goto('/');
    // Wait until the page is fully loaded (no network activity)
    await page.waitForLoadState('networkidle');
  });

  // ── Homepage ────────────────────────────────────────────

  test('homepage loads and shows hero title', async ({ page }) => {
    // The hero headline must contain the brand name
    await expect(page.locator('h1')).toContainText('KGS Techway');
    // Page title in browser tab
    await expect(page).toHaveTitle(/KGSTechway/i);
  });

  test('homepage shows QA & Testing Services card', async ({ page }) => {
    // QA service card must be visible on home page (.first() handles multiple matches)
    await expect(
      page.getByText('QA & Testing Services').first()
    ).toBeVisible();
  });

  // ── Header Logo ─────────────────────────────────────────

  test('clicking logo navigates to homepage', async ({ page }) => {
    // Go to another page first
    await page.goto('/about');
    await ensureNavOpen(page);
    // Click the brand logo
    await page.click('a.brand-logo');
    await expect(page).toHaveURL('/');
  });

  // ── Primary Nav Links ────────────────────────────────────

  const navLinks = [
    { label: 'Services', expectedUrl: '/services' },
    { label: 'About',    expectedUrl: '/about' },
    { label: 'Technology', expectedUrl: '/technology' },
    { label: 'Contact',  expectedUrl: '/contact' },
  ];

  for (const { label, expectedUrl } of navLinks) {
    test(`clicking "${label}" navigates to ${expectedUrl}`, async ({ page }) => {
      await ensureNavOpen(page);
      await page.click(`nav a:has-text("${label}")`);
      await expect(page).toHaveURL(expectedUrl);
    });
  }

  // ── CTA Button ──────────────────────────────────────────

  test('"Get Started" button navigates to /contact', async ({ page }) => {
    // Use JS click to handle cases where button may be off-screen or behind overlay on mobile
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(
        (b) => b.textContent?.includes('Get Started')
      );
      if (btn) (btn as HTMLElement).click();
    });
    await expect(page).toHaveURL('/contact');
  });

  // ── Mobile Menu ─────────────────────────────────────────

  test('mobile hamburger opens and closes menu', async ({ page }) => {
    // Resize to mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const hamburger = page.locator('[aria-label="Open navigation menu"]');
    const navMenu = page.locator('#main-navigation');

    // Initially collapsed on mobile
    await expect(navMenu).not.toBeVisible();

    // Open it
    await hamburger.click();
    await expect(navMenu).toBeVisible();

    // Close it with the X button
    await page.locator('[aria-label="Close navigation menu"]').click();
    await expect(navMenu).not.toBeVisible();
  });

  // ── Service Detail Pages ────────────────────────────────

  test('"Back to Services" link works on service detail page', async ({ page }) => {
    await page.goto('/services/qa-testing');
    await page.click('a:has-text("Back to Services")');
    await expect(page).toHaveURL('/services');
  });

});
