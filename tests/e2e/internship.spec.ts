/**
 * @file internship.spec.ts
 * @description End-to-end coverage for the Internship Program page and its
 * application popup.
 *
 * IMPORTANT: every test that submits the form stubs the EmailJS endpoint, so a
 * test run never sends a real application to the KGS inbox.
 */

import { test, expect, type Page } from '@playwright/test';

/**
 * The chat widget opens by default and overlaps content in the lower-right.
 * Close it the way a visitor would — never rip its nodes out of the DOM, which
 * detaches them from React and triggers "Maximum update depth exceeded".
 */
async function closeChatbot(page: Page) {
  const close = page.locator('.chatbot-close');
  if (await close.count()) {
    await close.click();
    await expect(page.locator('.chatbot-window')).toBeHidden();
  }
}

/** Intercept EmailJS so no real email leaves the machine */
async function stubEmailJs(page: Page, sent: string[]) {
  await page.route('**/api.emailjs.com/**', async (route) => {
    sent.push(route.request().postData() ?? '');
    await route.fulfill({ status: 200, body: 'OK' });
  });
}

async function openApplyPopup(page: Page) {
  await page.goto('/internship');
  await closeChatbot(page);
  await expect(page.locator('.track-card')).toHaveCount(4);

  // the CTA sits inside a whileInView block — scroll it in and let it settle
  const cta = page.locator('.internship-cta-button');
  await cta.scrollIntoViewIfNeeded();
  await expect(cta).toBeVisible();
  await page.waitForTimeout(700);

  await cta.click();
  await expect(page.locator('.apply-modal-content')).toBeVisible();
}

test.describe('Internship page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/internship');
    await closeChatbot(page);
    // the section mounts behind a motion animation — wait before measuring
    await expect(page.locator('.track-card')).toHaveCount(4);
  });

  test('loads with the program heading as the page h1', async ({ page }) => {
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('Learn the Tools');
  });

  test('has an internship-specific page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Internship Program/i);
  });

  test('shows all four tracks with their durations', async ({ page }) => {
    const tracks = [
      ['Programming Foundations', '4 Weeks'],
      ['Test Automation', '4 Weeks'],
      ['Git & GitHub Workflow', '2 Weeks'],
      ['Gen AI & Agentic AI', '4 Weeks'],
    ];
    await expect(page.locator('.track-card')).toHaveCount(4);
    for (const [name, duration] of tracks) {
      const card = page.locator('.track-card').filter({ hasText: name });
      await expect(card).toBeVisible();
      await expect(card).toContainText(duration);
    }
  });

  test('every track names the project the student builds', async ({ page }) => {
    for (const project of [
      'Student Placement Tracker',
      'E-Commerce Automation Suite',
      'Team Collaboration Simulation',
      'College Query AI Agent',
    ]) {
      await expect(page.getByText(project)).toBeVisible();
    }
  });

  test('Gen AI track lists the full AI stack', async ({ page }) => {
    const card = page.locator('.track-card').filter({ hasText: 'Gen AI & Agentic AI' });
    const chips = await card.locator('.track-tool').allTextContents();
    for (const tool of [
      'OpenAI',
      'Claude API',
      'Gemini',
      'LangChain',
      'LangGraph',
      'RAG + Vector DB',
      'Hugging Face',
      'MCP',
    ]) {
      expect(chips).toContain(tool);
    }
  });

  test('highlights strip makes no unverified project-count claim', async ({ page }) => {
    const labels = await page.locator('.highlight-label').allTextContents();
    expect(labels).toEqual([
      'Technologies',
      'Real-Time Projects',
      'Hands-On Training',
      'Verified Certificate',
    ]);
    // "4 Live Projects" was removed deliberately — it must not come back
    await expect(page.locator('.internship-highlights')).not.toContainText('Live Projects');
  });

  test('states eligibility for final and third year students', async ({ page }) => {
    await expect(page.locator('.internship-eligibility')).toContainText('Final Year');
    await expect(page.locator('.internship-eligibility')).toContainText('3rd Year');
  });

  test('lists what students walk away with', async ({ page }) => {
    await expect(page.locator('.outcome-list li')).toHaveCount(6);
  });

  test('does NOT render the business contact section', async ({ page }) => {
    await expect(page.locator('#contact')).toHaveCount(0);
    await expect(page.getByText('Ready to Start Your')).toHaveCount(0);
  });

  test('does NOT render an inline enquiry form — the popup is the only entry point', async ({
    page,
  }) => {
    await expect(page.locator('#internship-apply')).toHaveCount(0);
  });

  test('renders without console page errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.reload();
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });
});

test.describe('Internship application popup', () => {
  test('opens from the Apply CTA without leaving the page', async ({ page }) => {
    await openApplyPopup(page);
    expect(new URL(page.url()).pathname).toBe('/internship');
  });

  test('shows the renamed fields and no Preferred Mode', async ({ page }) => {
    await openApplyPopup(page);
    const labels = await page.locator('.apply-modal-content .form-label').allTextContents();
    expect(labels).toEqual([
      'Full Name *',
      'Email Address *',
      'Phone / WhatsApp *',
      'College Name *',
      'Degree & Branch',
      'Current Experience Level *',
      'Course / Track Interest *',
      'Anything you want to tell us?',
    ]);
    await expect(page.locator('#ip-mode')).toHaveCount(0);
  });

  test('keeps the direct-contact options in the popup', async ({ page }) => {
    await openApplyPopup(page);
    const row = page.locator('.apply-modal-content .apply-direct');
    await expect(row).toBeVisible();
    await expect(row.locator('a[href*="wa.me"]')).toBeVisible();
    await expect(row.locator('a[href="tel:+918248718780"]')).toBeVisible();
    await expect(row.locator('a[href="mailto:sales@kgstechway.com"]')).toBeVisible();
  });

  test('blocks an empty submit and sends no email', async ({ page }) => {
    const sent: string[] = [];
    await stubEmailJs(page, sent);
    await openApplyPopup(page);

    await page.locator('.apply-modal-content .apply-submit').click();

    await expect(page.locator('.apply-modal-content .invalid-feedback:visible')).toHaveCount(6);
    expect(sent).toHaveLength(0);
  });

  test('rejects a malformed email and a short phone number', async ({ page }) => {
    const sent: string[] = [];
    await stubEmailJs(page, sent);
    await openApplyPopup(page);

    await page.fill('#ip-email', 'not-an-email');
    await page.fill('#ip-phone', '12345');
    await page.locator('.apply-modal-content .apply-submit').click();

    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
    await expect(page.getByText('Please enter a valid 10-digit number')).toBeVisible();
    expect(sent).toHaveLength(0);
  });

  test('submits a valid application and reports success', async ({ page }) => {
    const sent: string[] = [];
    await stubEmailJs(page, sent);
    await openApplyPopup(page);

    await page.fill('#ip-name', 'Priya R');
    await page.fill('#ip-email', 'priya@example.com');
    await page.fill('#ip-phone', '9876543210');
    await page.fill('#ip-college', 'Government College of Engineering');
    await page.fill('#ip-branch', 'B.E. CSE');
    await page.selectOption('#ip-experience', 'Final Year');
    await page.selectOption('#ip-track', 'Gen AI & Agentic AI');
    await page.fill('#ip-message', 'Interested in the AI track.');
    await page.locator('.apply-modal-content .apply-submit').click();

    await expect(page.locator('.apply-modal-content .alert-success')).toBeVisible();
    expect(sent).toHaveLength(1);

    // the payload must carry correctly-named fields, not just legacy slots
    const params = JSON.parse(sent[0]).template_params;
    expect(params.from_name).toBe('Priya R');
    expect(params.college).toBe('Government College of Engineering');
    expect(params.experience_level).toBe('Final Year');
    expect(params.track).toBe('Gen AI & Agentic AI');
    expect(params.message).not.toContain('Preferred Mode');
  });

  test('clears the form after a successful submit', async ({ page }) => {
    const sent: string[] = [];
    await stubEmailJs(page, sent);
    await openApplyPopup(page);

    await page.fill('#ip-name', 'Priya R');
    await page.fill('#ip-email', 'priya@example.com');
    await page.fill('#ip-phone', '9876543210');
    await page.fill('#ip-college', 'ABC College');
    await page.selectOption('#ip-experience', '3rd Year');
    await page.selectOption('#ip-track', 'Test Automation (Selenium, Playwright)');
    await page.locator('.apply-modal-content .apply-submit').click();

    await expect(page.locator('.apply-modal-content .alert-success')).toBeVisible();
    await expect(page.locator('#ip-name')).toHaveValue('');
  });
});
