#!/usr/bin/env node
/**
 * End-to-end check of the internship flow against a running site.
 * It WRITES A REAL ROW and SENDS A REAL EMAIL — use your own inbox.
 *
 *   node scripts/test-internship-flow.js you@example.com [baseUrl]
 *
 * baseUrl defaults to http://localhost:3000 (npm run dev). FEE_LINK_SECRET must
 * match the server's, so the script can print the signed fee links.
 * Reads .env if present.
 */
import fs from 'node:fs';
import crypto from 'node:crypto';

if (fs.existsSync('.env')) {
  for (const line of fs.readFileSync('.env', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '');
  }
}

const [email, base = 'http://localhost:3000'] = process.argv.slice(2);
if (!email) {
  console.error('Usage: node scripts/test-internship-flow.js you@example.com [baseUrl]');
  process.exit(1);
}

const res = await fetch(`${base}/api/apply`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Origin: new URL(base).origin },
  body: JSON.stringify({
    name: 'Flow Test',
    email,
    phone: '+91 98765 43210',
    college: 'Test College',
    branch: 'B.E. CSE',
    experience: 'Final Year',
    track: 'Gen AI & Agentic AI',
    message: 'Automated end-to-end check — safe to delete this row.',
    website: '',
  }),
});
const body = await res.json().catch(() => ({}));
console.log(`POST /api/apply → ${res.status}`, body);
if (!body.ok) process.exit(1);

console.log(`\n1. Open the sheet: a row with ${body.applicationId} should exist, Email Status = Sent.`);
console.log(`2. Check ${email} (and spam/promotions) for the greeting email.`);

const secret = process.env.FEE_LINK_SECRET;
if (secret) {
  const token = crypto.createHmac('sha256', secret).update(body.applicationId).digest('hex');
  console.log('3. Tap ₹20,000 in the email, or open this link:');
  console.log(`   ${base}/api/fee-preference?app=${body.applicationId}&amount=20000&token=${token}`);
} else {
  console.log('3. Tap ₹20,000 in the email (set FEE_LINK_SECRET to print the link here).');
}
console.log('4. The same row should show Fee Preference (₹) = 20000, Source = Email button.');
console.log('5. Re-running with the same email returns the same Application ID and adds no row.');
