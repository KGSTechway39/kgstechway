/**
 * @file chatbot.spec.ts
 * @description Covers the KGS Assistant widget: the /api/chat endpoint, the
 * internship quick replies, and the markdown rendering of bot replies.
 *
 * Replies are stubbed so the suite does not spend Groq tokens or depend on the
 * model's wording. One separately-tagged test hits the real endpoint.
 */

import { test, expect, type Page } from '@playwright/test';

const BOT_REPLY = [
  'Here is the **Internship Program**.',
  '',
  '- Apply at [kgstechway.com/internship](https://kgstechway.com/internship)',
  '- Or email sales@kgstechway.com',
  '- Docs: https://kgstechway.com/technology',
].join('\n');

async function stubChatApi(page: Page, reply = BOT_REPLY) {
  await page.route('**/api/chat', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ reply }),
    });
  });
}

test.describe('Chatbot widget', () => {
  test('offers internship quick replies first', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.suggestion-chip')).toHaveText([
      'Tell me about the internship program',
      'Which internship track should I choose?',
      'What products do you offer?',
      'What services do you offer?',
      'How can I contact KGS Techway?',
    ]);
  });

  test('renders a reply instead of the error message', async ({ page }) => {
    await stubChatApi(page);
    await page.goto('/');
    await page.locator('.suggestion-chip').first().click();

    const reply = page.locator('.bot-formatted').last();
    await expect(reply).toBeVisible();
    await expect(reply).not.toContainText('something went wrong');
  });

  test('renders markdown links as real anchors, not raw syntax', async ({ page }) => {
    await stubChatApi(page);
    await page.goto('/');
    await page.locator('.suggestion-chip').first().click();

    const reply = page.locator('.bot-formatted').last();
    await expect(reply).toBeVisible();

    // the raw "[text](url)" form must never reach the user
    await expect(reply).not.toContainText('](http');

    const hrefs = await reply.locator('a').evaluateAll((as) =>
      as.map((a) => a.getAttribute('href'))
    );
    expect(hrefs).toContain('https://kgstechway.com/internship');
    expect(hrefs).toContain('mailto:sales@kgstechway.com');
    expect(hrefs).toContain('https://kgstechway.com/technology');
  });

  test('still renders bold text', async ({ page }) => {
    await stubChatApi(page);
    await page.goto('/');
    await page.locator('.suggestion-chip').first().click();
    await expect(page.locator('.bot-formatted').last().locator('strong').first()).toContainText(
      'Internship Program'
    );
  });

  test('surfaces a friendly message when the API fails', async ({ page }) => {
    await page.route('**/api/chat', (route) => route.fulfill({ status: 500, body: '{}' }));
    await page.goto('/');
    await page.locator('.suggestion-chip').first().click();
    await expect(page.locator('.chatbot-window')).toContainText(/something went wrong/i);
  });
});

test.describe('Chat API (live)', () => {
  test('POST /api/chat answers an internship question', async ({ request }) => {
    test.slow(); // the model needs a few seconds
    const res = await request.post('/api/chat', {
      data: { message: 'Tell me about the internship program' },
    });

    expect(res.status()).toBe(200);
    const { reply } = await res.json();
    expect(reply).toBeTruthy();
    expect(reply.length).toBeGreaterThan(60);
    // it should know the program exists rather than falling back to services
    expect(reply.toLowerCase()).toContain('internship');
  });

  test('does not invent a fee or a batch date', async ({ request }) => {
    test.slow();
    const res = await request.post('/api/chat', {
      data: { message: 'How much does the internship cost and when is the next batch?' },
    });

    expect(res.status()).toBe(200);
    const { reply } = await res.json();
    // no rupee/dollar amounts should appear
    expect(reply).not.toMatch(/(₹|Rs\.?\s?|INR\s?|\$)\s?\d/i);
    expect(reply.toLowerCase()).toMatch(/contact|apply|team|sales@kgstechway\.com/);
  });
});
