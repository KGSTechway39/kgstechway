import { test } from '@playwright/test';

test('production debug full', async ({ page }) => {
  const responses: string[] = [];
  const errors: string[] = [];
  page.on('response', async res => {
    if (res.url().includes('emailjs')) {
      const body = await res.text().catch(() => '');
      responses.push(`${res.status()} ${res.url()} → ${body}`);
    }
  });
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.text().includes('EmailJS') || msg.text().includes('Failed')) {
      errors.push(msg.text());
    }
  });

  await page.goto('https://kgstechway.com/contact', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Check what key is actually loaded
  const key = await page.evaluate(() => {
    const scripts = document.querySelectorAll('script[src]');
    return Array.from(scripts).map(s => (s as HTMLScriptElement).src);
  });
  console.log('Scripts:', key);

  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.selectOption('select[name="service"]', 'AI Solutions');
  await page.fill('textarea[name="message"]', 'Debug test message for production');
  await page.locator('button.submit-btn[type="submit"]').click();
  await page.waitForTimeout(10000);

  console.log('All emailjs responses:', responses);
  console.log('Errors:', errors);
  const alert = await page.locator('.alert-success, .alert-danger').textContent().catch(() => 'no alert visible');
  console.log('Alert text:', alert);
});
