/**
 * @file tests/e2e/services.spec.ts
 * @description Tests for the Services section and all service detail pages.
 *
 * WHAT WE TEST:
 * - Services listing page shows all service cards
 * - Each service card links to its detail page
 * - Service detail pages render key content
 * - CTA buttons on service pages navigate to contact
 * - Playwright spotlight section visible on QA page
 *
 * HOW TO RUN:
 *   npx playwright test services.spec.ts
 */

import { test, expect } from '@playwright/test';

// ── Services Listing ──────────────────────────────────────────

test.describe('Services Listing Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/services');
    await page.waitForLoadState('networkidle');
  });

  test('page title is correct', async ({ page }) => {
    await expect(page).toHaveTitle(/Services/i);
  });

  const serviceCards = [
    'Software Product Development',
    'AI Solutions',
    'CRM/ERP Services',
    'Agentic AI Solutions',
    'Cloud & DevOps',
    'Mobile App Development',
    'QA & Testing Services',
    'Staff Augmentation',
  ];

  for (const service of serviceCards) {
    test(`shows "${service}" card`, async ({ page }) => {
      await expect(page.getByText(service).first()).toBeVisible();
    });
  }

});

// ── Service Detail Pages ───────────────────────────────────────

test.describe('QA & Testing Services Detail Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/services/qa-testing');
    await page.waitForLoadState('networkidle');
  });

  test('renders hero heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('QA & Testing');
  });

  test('Playwright spotlight section is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Powered by Playwright/i })).toBeVisible();
    await expect(page.getByText('Playwright').first()).toBeVisible();
  });

  test('"Start QA Engagement" CTA leads to contact', async ({ page }) => {
    await page.click('button:has-text("Start QA Engagement")');
    await page.waitForTimeout(500);
    const url = page.url();
    const contactSection = page.locator('#contact');
    const sectionVisible = await contactSection.isVisible();
    expect(url.includes('contact') || sectionVisible).toBeTruthy();
  });

  test('shows all 8 QA service categories', async ({ page }) => {
    const categories = [
      'Manual Testing',
      'Automation Testing',
      'API Testing',
      'Performance Testing',
      'Security Testing',
      'Mobile App Testing',
      'Regression & Smoke Testing',
      'CI/CD Pipeline Testing',
    ];
    for (const cat of categories) {
      await expect(page.getByText(cat).first()).toBeVisible();
    }
  });

  test('Playwright badge appears in Automation Testing card', async ({ page }) => {
    // The featured Playwright badge should be visible
    await expect(page.locator('text=⚡ Playwright').first()).toBeVisible();
  });

});

// ── AI Solutions Page ─────────────────────────────────────────

test.describe('AI Solutions Detail Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/services/ai-solutions');
    await page.waitForLoadState('networkidle');
  });

  test('renders hero heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('AI Solutions');
  });

  test('CTA buttons lead to contact', async ({ page }) => {
    await page.click('button:has-text("Explore AI Solutions")');
    await page.waitForTimeout(500);
    const url = page.url();
    const contactSection = page.locator('#contact');
    const sectionVisible = await contactSection.isVisible();
    expect(url.includes('contact') || sectionVisible).toBeTruthy();
  });

});

// ── Software Development Page ─────────────────────────────────

test.describe('Software Development Detail Page', () => {

  test('loads and shows hero', async ({ page }) => {
    await page.goto('/services/software-development');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText('Software');
  });

});

// ── CTA Buttons on All Service Pages ──────────────────────────

const servicePages = [
  { path: '/services/ai-solutions',         cta: 'Explore AI Solutions' },
  { path: '/services/crm-erp',              cta: 'Get ERP Solution' },
  { path: '/services/cloud-devops',         cta: 'Start Cloud Journey' },
  { path: '/services/mobile-development',   cta: 'Start Project' },
];

for (const { path, cta } of servicePages) {
  test(`"${cta}" on ${path} leads to contact`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    await page.click(`button:has-text("${cta}")`);
    // CTA buttons either navigate to /contact or scroll to the #contact section on the page
    await page.waitForTimeout(500);
    const url = page.url();
    const isContactPage = url.includes('contact');
    const contactSection = page.locator('#contact');
    const sectionVisible = await contactSection.isVisible();
    expect(isContactPage || sectionVisible).toBeTruthy();
  });
}
