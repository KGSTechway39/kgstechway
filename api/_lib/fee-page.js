/** Small branded HTML page returned by /api/fee-preference */
import { escapeHtml } from './internship.js';

export function renderFeePage({ title, message, siteUrl }) {
  const home = `${String(siteUrl || 'https://kgstechway.com').replace(/\/+$/, '')}/internship`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${escapeHtml(title)} | KGS Techway</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 16px; background: #0d1117; color: #e6edf3;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; }
  .card { width: 100%; max-width: 440px; background: #161b22; border: 1px solid #30363d;
    border-top: 4px solid #3ecf8e; border-radius: 14px; padding: 32px 28px; text-align: center; }
  .brand { color: #3ecf8e; font-weight: 700; letter-spacing: .08em; font-size: 13px; text-transform: uppercase; }
  h1 { font-size: 22px; margin: 14px 0 10px; }
  p { color: #9da7b3; line-height: 1.6; margin: 0 0 24px; font-size: 15px; }
  a.btn { display: inline-block; background: #3ecf8e; color: #0d1117; font-weight: 700;
    text-decoration: none; padding: 12px 22px; border-radius: 8px; }
  a.btn:focus-visible { outline: 3px solid #e6edf3; outline-offset: 2px; }
</style>
</head>
<body>
  <main class="card">
    <div class="brand">KGS Techway</div>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(message)}</p>
    <a class="btn" href="${escapeHtml(home)}">Back to the Internship Program</a>
  </main>
</body>
</html>`;
}
