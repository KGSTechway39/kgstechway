/**
 * @file tests/e2e/contact-form.spec.ts
 * @description Tests for the contact form — validation, submission, UX.
 *
 * WHAT WE TEST:
 * - Form renders all required fields
 * - Validation blocks empty submission
 * - Inline error messages appear correctly
 * - Valid form enables the submit button
 * - Success / failure states render correctly
 *
 * IMPORTANT NOTE ON API MOCKING:
 * We intercept (mock) the Web3Forms API call so tests:
 *   a) Work without internet access
 *   b) Don't send real emails during test runs
 *   c) Run fast (no network round trip)
 *
 * HOW TO RUN:
 *   npx playwright test contact-form.spec.ts
 *   npx playwright test contact-form.spec.ts --headed
 */

import { test, expect } from '@playwright/test';

// ── Helpers ──────────────────────────────────────────────────

/** Fill in the minimum required fields to pass validation */
async function fillValidForm(page: import('@playwright/test').Page) {
  await page.fill('input[name="name"]',    'John Doe');
  await page.fill('input[name="email"]',   'john@example.com');
  await page.selectOption('select[name="service"]', 'QA & Testing Services');
  await page.fill('textarea[name="message"]', 'I need a QA audit for my product. Please contact me.');
}

// ── Tests ─────────────────────────────────────────────────────

test.describe('Contact Form', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
  });

  // ── Rendering ────────────────────────────────────────────

  test('form renders all expected fields', async ({ page }) => {
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('input[name="company"]')).toBeVisible();
    await expect(page.locator('select[name="service"]')).toBeVisible();
    await expect(page.locator('select[name="budget"]')).toBeVisible();
    await expect(page.locator('select[name="timeline"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('form heading says "Tell Us About Your Project"', async ({ page }) => {
    await expect(page.getByText('Tell Us About Your Project')).toBeVisible();
  });

  // ── Validation — empty submission ─────────────────────────

  test('shows validation errors when submitting empty form', async ({ page }) => {
    await page.click('button[type="submit"]');

    // All required field errors must appear
    await expect(page.getByText('Full name is required')).toBeVisible();
    await expect(page.getByText('Email address is required')).toBeVisible();
    await expect(page.getByText('Please select a service')).toBeVisible();
    await expect(page.getByText('Project details are required')).toBeVisible();
  });

  // ── Validation — invalid email ────────────────────────────

  test('shows error for invalid email format', async ({ page }) => {
    await page.fill('input[name="email"]', 'not-an-email');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
  });

  // ── Validation — short name ───────────────────────────────

  test('shows error when name is too short', async ({ page }) => {
    await page.fill('input[name="name"]', 'A');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Name must be at least 2 characters long')).toBeVisible();
  });

  // ── Validation — short message ────────────────────────────

  test('shows error when message is too short', async ({ page }) => {
    await page.fill('textarea[name="message"]', 'Hi');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Please provide more details')).toBeVisible();
  });

  // ── Error clearing ────────────────────────────────────────

  test('clears validation error when user starts typing', async ({ page }) => {
    // Trigger empty submission to show errors
    await page.click('button[type="submit"]');
    await expect(page.getByText('Full name is required')).toBeVisible();

    // Start typing in the name field
    await page.fill('input[name="name"]', 'Jane');
    // Error for name should disappear
    await expect(page.getByText('Full name is required')).not.toBeVisible();
  });

  // ── Successful submission ─────────────────────────────────

  test('shows success alert after valid form submission', async ({ page }) => {
    // Intercept the Web3Forms API call and return a mock success
    await page.route('https://api.web3forms.com/submit', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await fillValidForm(page);
    await page.click('button[type="submit"]');

    // Success alert must appear
    await expect(page.locator('.alert-success')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('.alert-success')).toContainText('sales@kgstechway.com');
  });

  // ── Form resets after success ─────────────────────────────

  test('form fields clear after successful submission', async ({ page }) => {
    await page.route('https://api.web3forms.com/submit', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await fillValidForm(page);
    await page.click('button[type="submit"]');

    // Wait for success
    await expect(page.locator('.alert-success')).toBeVisible({ timeout: 10_000 });

    // All fields should be empty after reset
    await expect(page.locator('input[name="name"]')).toHaveValue('');
    await expect(page.locator('input[name="email"]')).toHaveValue('');
    await expect(page.locator('textarea[name="message"]')).toHaveValue('');
  });

  // ── API error handling ────────────────────────────────────

  test('shows error alert when API returns failure', async ({ page }) => {
    await page.route('https://api.web3forms.com/submit', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, message: 'Invalid access key' }),
      });
    });

    await fillValidForm(page);
    await page.click('button[type="submit"]');

    await expect(page.locator('.alert-danger')).toBeVisible({ timeout: 10_000 });
  });

  // ── Submit button state ───────────────────────────────────

  test('submit button shows loading state during submission', async ({ page }) => {
    // Slow API response so we can catch the loading state
    await page.route('https://api.web3forms.com/submit', async (route) => {
      await new Promise((r) => setTimeout(r, 1500));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await fillValidForm(page);
    await page.click('button[type="submit"]');

    // Button should show "Sending..." during the API call
    await expect(page.locator('button[type="submit"]')).toContainText('Sending...');
  });

});
