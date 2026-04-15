/**
 * @file tests/e2e/homepage.spec.ts
 * @description Tests for the homepage — hero, tech stack, footer, branding.
 */

import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  // ── Branding ──────────────────────────────────────────────

  test('logo shows "KGS Techway" in the header', async ({ page }) => {
    // Header has the logo — use .first() because footer also has one
    const headerLogo = page.locator('header .brand-logo-kgs').first();
    await expect(headerLogo).toContainText('KGS');
    await expect(page.locator('header .brand-logo-techway').first()).toContainText('Techway');
  });

  test('logo tagline is visible in header', async ({ page }) => {
    // Tagline appears in header AND footer — check header specifically
    await expect(
      page.locator('header').getByText('The Intelligent Pathway to Business Success')
    ).toBeVisible();
  });

  // ── Hero Section ──────────────────────────────────────────

  test('hero contains "Transforming Ideas into Digital Reality"', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Transforming Ideas into');
  });

  test('"Start Your Project" scrolls to the contact section on homepage', async ({ page }) => {
    // On the homepage, the button scrolls to the #contact section (not navigate to /contact)
    await page.click('button:has-text("Start Your Project")');
    // The contact section becomes visible after scroll
    await expect(page.locator('#contact')).toBeInViewport({ timeout: 5000 });
  });

  // ── Tech Stack Section ────────────────────────────────────

  test('tech stack section is visible', async ({ page }) => {
    await page.locator('#tech-stack').scrollIntoViewIfNeeded();
    await expect(page.locator('#tech-stack')).toBeVisible();
  });

  test('Playwright appears as featured tool in QA Tools row', async ({ page }) => {
    await page.locator('#tech-stack').scrollIntoViewIfNeeded();
    const playwrightPill = page.locator('.techstack-pill--featured').first();
    await expect(playwrightPill).toBeVisible();
    await expect(playwrightPill).toContainText('Playwright');
  });

  test('QA Tools row shows Selenium, Cypress, JMeter, Postman', async ({ page }) => {
    await page.locator('#tech-stack').scrollIntoViewIfNeeded();
    for (const tool of ['Selenium', 'Cypress', 'JMeter', 'Postman']) {
      await expect(page.getByText(tool).first()).toBeVisible();
    }
  });

  // ── Footer ────────────────────────────────────────────────

  test('footer shows correct email', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    // Use the mailto link in the footer specifically
    await expect(
      page.locator('footer a[href="mailto:sales@kgstechway.com"]')
    ).toBeVisible();
  });

  test('footer copyright line shows "KGS Techway"', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    // Copyright is in the footer bottom row — very specific selector
    await expect(
      page.locator('footer').getByText(/© \d{4} KGS Techway/)
    ).toBeVisible();
  });

  test('footer service links navigate correctly', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.click('footer a:has-text("QA & Testing")');
    await expect(page).toHaveURL('/services/qa-testing');
  });

  // ── Responsive (Mobile) ───────────────────────────────────

  test('homepage hero is visible on iPhone 13', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // h1 must be visible on mobile
    await expect(page.locator('h1')).toBeVisible();
    // Header logo appears once on mobile
    await expect(page.locator('header .brand-logo-kgs').first()).toBeVisible();
  });

  // ── No Critical Console Errors ────────────────────────────

  test('no CRITICAL console errors on homepage load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out known non-critical noise from browser extensions and vendors
    const criticalErrors = errors.filter(
      (e) =>
        !e.includes('extension') &&
        !e.includes('favicon') &&
        !e.includes('baseline-browser-mapping') &&
        !e.includes('Web3Forms') &&      // expected — no key in dev
        !e.includes('ERR_BLOCKED') &&    // browser extensions
        !e.includes('vercel-scripts') && // Vercel Analytics CSP — not an app error
        !e.includes('Content Security Policy') // CSP violations from third-party scripts
    );
    expect(criticalErrors).toHaveLength(0);
  });

});
