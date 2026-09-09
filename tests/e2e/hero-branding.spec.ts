/**
 * @file hero-branding.spec.ts
 * @description Covers the clickable hero cards, the brand logo / favicon assets,
 * and the rule that internship content must appear ONLY on /internship.
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

/**
 * The hero visual mounts behind a framer-motion entrance animation, so the cards
 * are absent for the first few hundred ms. Wait for them before measuring or
 * clicking — a real user cannot interact before they appear either.
 */
async function waitForHeroCards(page: Page) {
  await expect(page.locator('.tech-card')).toHaveCount(4);
  await expect(page.locator('.tech-card').last()).toBeVisible();
  await page.waitForTimeout(900); // let the entrance transform finish
}

/** Match a card by its exact heading — "AI Solutions" is a substring of "Agentic AI Solutions" */
function cardByTitle(page: Page, title: string) {
  const exact = new RegExp(`^${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`);
  return page.locator('.tech-card').filter({ has: page.locator('h3', { hasText: exact }) });
}

const HERO_CARDS = [
  ['Agentic AI Solutions', '/services/agentic-ai'],
  ['AI Solutions', '/services/ai-solutions'],
  ['QA & Testing Services', '/services/qa-testing'],
  ['Internship Program', '/internship'],
] as const;

test.describe('Hero cards', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await closeChatbot(page);
    await waitForHeroCards(page);
  });

  test('appear in the requested order', async ({ page }) => {
    await expect(page.locator('.tech-card h3')).toHaveText([
      'Agentic AI Solutions',
      'AI Solutions',
      'QA & Testing Services',
      'Internship Program',
    ]);
  });

  test('are all identical in size and left alignment', async ({ page }) => {
    const boxes = await page.locator('.tech-card').evaluateAll((els) =>
      els.map((el) => {
        const r = el.getBoundingClientRect();
        return `${Math.round(r.x)}|${Math.round(r.width)}|${Math.round(r.height)}`;
      })
    );
    expect(boxes).toHaveLength(4);
    expect(new Set(boxes).size).toBe(1);
  });

  for (const [title, path] of HERO_CARDS) {
    test(`"${title}" card navigates to ${path}`, async ({ page }) => {
      await cardByTitle(page, title).click();
      await page.waitForURL(`**${path}`);
      expect(new URL(page.url()).pathname).toBe(path);
    });
  }

  test('are keyboard accessible', async ({ page }) => {
    const card = cardByTitle(page, 'Internship Program');
    await expect(card).toHaveAttribute('role', 'link');
    await expect(card).toHaveAttribute('tabindex', '0');
    await card.focus();
    await page.keyboard.press('Enter');
    await page.waitForURL('**/internship');
    expect(new URL(page.url()).pathname).toBe('/internship');
  });
});

test.describe('Internship content is scoped to its own page', () => {
  const otherPages = ['/', '/technology', '/products', '/about', '/services', '/contact'];

  for (const path of otherPages) {
    test(`${path} does not render the internship block`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('#internship')).toHaveCount(0);
    });
  }

  test('/internship does render it', async ({ page }) => {
    await page.goto('/internship');
    await expect(page.locator('#internship')).toHaveCount(1);
  });

  test('the header exposes an Internship link', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('a', { hasText: /^Internship$/ }).first();
    await expect(link).toBeVisible();
    await link.click();
    await page.waitForURL('**/internship');
  });

  test('the sitemap lists the internship page', async ({ request }) => {
    const res = await request.get('/sitemap-pages.xml');
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain('https://kgstechway.com/internship');
  });
});

test.describe('Brand logo and icons', () => {
  const icons = [
    '/logo.svg',
    '/favicon-16x16.png',
    '/favicon-32x32.png',
    '/apple-touch-icon.png',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
  ];

  for (const icon of icons) {
    test(`${icon} is served (no 404)`, async ({ request }) => {
      const res = await request.get(icon);
      expect(res.status()).toBe(200);
      expect(Number(res.headers()['content-length'] ?? 1)).toBeGreaterThan(0);
    });
  }

  test('header logo renders the pathway mark', async ({ page }) => {
    await page.goto('/');
    const mark = page.locator('.brand-logo-mark').first();
    await expect(mark).toBeVisible();
    // three anchor dots + the convergence arrow
    await expect(mark.locator('circle')).toHaveCount(4); // 3 dots + background circle
    await expect(mark.locator('polygon')).toHaveCount(1);
  });

  test('logo gradient ids are unique across instances', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const duplicates = await page.evaluate(() => {
      const ids = [...document.querySelectorAll('[id]')].map((e) => e.id);
      return ids.filter((v, i) => ids.indexOf(v) !== i);
    });
    expect(duplicates).toEqual([]);
  });
});
