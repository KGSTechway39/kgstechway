/**
 * POST /api/apply — internship application.
 *
 * Flow: validate → dedupe by email → append sheet row → send greeting email →
 * record Email Status / Email Sent At on the row. The email step runs after the
 * response (waitUntil) so the student isn't kept waiting on SMTP.
 *
 * Duplicate rule: one row per email address (case-insensitive).
 *   - If the email already has a row, no new row is created and the student
 *     still gets { ok: true } with their ORIGINAL Application ID.
 *   - The greeting email is re-sent if the first send failed or never happened,
 *     or if the last send was over an hour ago (so a student who lost the
 *     email can get it again, without the form being usable to flood an inbox).
 *   Two submissions racing within the same second could both append; that is
 *   rare enough to clean up by hand at this volume.
 */
import {
  validateApplication,
  generateApplicationId,
  uniqueApplicationId,
  buildSheetRow,
  buildEmailFields,
  formatIST,
  parseIST,
  shouldResendGreeting,
} from './_lib/internship.js';
import {
  ensureSheet,
  listRecords,
  appendRow,
  updateEmailStatus,
} from './_lib/sheets.js';
import { waitUntil } from '@vercel/functions';
import { sendGreetingEmail } from './_lib/mailer.js';

// In-memory per-IP limit. Each serverless instance keeps its own map and it
// resets on cold start, so this only slows down casual abuse. Move to a shared
// store (e.g. Upstash Redis) if the form is ever targeted.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function allowedOrigins() {
  const origins = new Set(['http://localhost:3000', 'http://localhost:5173']);
  const site = process.env.SITE_URL || 'https://kgstechway.com';
  try {
    const u = new URL(site);
    origins.add(u.origin);
    origins.add(`${u.protocol}//www.${u.host.replace(/^www\./, '')}`);
  } catch {
    /* bad SITE_URL — fall through with localhost only */
  }
  if (process.env.VERCEL_URL) origins.add(`https://${process.env.VERCEL_URL}`);
  if (process.env.VERCEL_BRANCH_URL) origins.add(`https://${process.env.VERCEL_BRANCH_URL}`);
  return origins;
}

function clientIp(req) {
  const fwd = req.headers?.['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

async function sendAndRecord(applicationId, email, fields) {
  try {
    await sendGreetingEmail(email, fields);
    await updateEmailStatus(applicationId, 'Sent', formatIST(new Date()));
  } catch (err) {
    console.error(`[apply] greeting email failed for ${applicationId}:`, err);
    try {
      await updateEmailStatus(applicationId, 'Failed', '');
    } catch (sheetErr) {
      console.error(`[apply] could not mark email Failed for ${applicationId}:`, sheetErr);
    }
  }
}

export default async function handler(req, res) {
  const origin = req.headers?.origin;
  if (origin) {
    if (!allowedOrigins().has(origin)) {
      return res.status(403).json({ ok: false, error: 'Origin not allowed' });
    }
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  if (rateLimited(clientIp(req))) {
    return res
      .status(429)
      .json({ ok: false, error: 'Too many submissions. Please try again in an hour.' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};

  // Honeypot: real users never see or fill this field. Pretend it worked.
  if (typeof body.website === 'string' && body.website.trim()) {
    return res.status(200).json({ ok: true, applicationId: generateApplicationId() });
  }

  const result = validateApplication(body);
  if (!result.ok) {
    return res.status(400).json({ ok: false, error: 'Invalid input', fields: result.errors });
  }
  const { data } = result;
  const siteUrl = process.env.SITE_URL || 'https://kgstechway.com';
  const secret = process.env.FEE_LINK_SECRET;

  try {
    if (!secret) throw new Error('FEE_LINK_SECRET is not set');
    await ensureSheet();

    const records = await listRecords();
    const existing = records.find((r) => r.email.trim().toLowerCase() === data.email);
    if (existing) {
      if (shouldResendGreeting(existing)) {
        const fields = buildEmailFields({
          applicationId: existing.applicationId,
          submittedAt: parseIST(existing.submittedAt) || new Date(),
          data,
          siteUrl,
          secret,
        });
        waitUntil(sendAndRecord(existing.applicationId, data.email, fields));
      }
      return res.status(200).json({ ok: true, applicationId: existing.applicationId });
    }

    const submittedAt = new Date();
    const applicationId = uniqueApplicationId(
      new Set(records.map((r) => r.applicationId)),
      submittedAt
    );
    await appendRow(buildSheetRow({ applicationId, submittedAt, data }));

    const fields = buildEmailFields({ applicationId, submittedAt, data, siteUrl, secret });
    // Reply as soon as the row is saved; the email finishes after the response
    waitUntil(sendAndRecord(applicationId, data.email, fields));

    return res.status(200).json({ ok: true, applicationId });
  } catch (err) {
    console.error('[apply] failed to save application:', err);
    return res
      .status(500)
      .json({ ok: false, error: 'We could not save your application. Please try again.' });
  }
}
