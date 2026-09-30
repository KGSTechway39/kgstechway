/**
 * GET /api/fee-preference?app=<id>&amount=<15000|20000|25000>&token=<hmac>
 *
 * Records the fee a student tapped in the greeting email. Survey only — not a
 * payment or commitment. Latest answer wins; Fee Survey Change Count counts how
 * many times an earlier answer was replaced.
 *
 * Link pre-fetch risk: Gmail/Outlook safety scanners may GET links in an email
 * before the student clicks. Only the three button links exist, so a scanner
 * that opens all three would leave the LAST one (₹25,000) recorded. The write is
 * idempotent (same amount twice = no change), but it cannot tell a scanner from
 * a human. If sheet data shows suspicious answers right after send time, add a
 * one-tap confirm step (GET shows a button, POST saves). Not built yet on purpose.
 */
import { FEE_AMOUNTS, APPLICATION_ID_RE, verifyFeeToken, formatIST, formatRupees } from './_lib/internship.js';
import { findByApplicationId, updateFeePreference } from './_lib/sheets.js';
import { renderFeePage } from './_lib/fee-page.js';

function send(res, status, title, message) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');
  // the token is in the URL — don't leak it to kgstechway.com analytics via Referer
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.status(status).send(renderFeePage({ title, message, siteUrl: process.env.SITE_URL }));
}

const INVALID = [
  'This link is not valid',
  'The link may be incomplete or changed. Please open the button again from your email, or reply to the email with your preferred fee.',
];

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET');
    return send(res, 405, 'Not allowed', 'Please use the button in your email.');
  }

  const q = req.query || {};
  const app = typeof q.app === 'string' ? q.app : '';
  const token = typeof q.token === 'string' ? q.token : '';
  const amount = Number(q.amount);

  if (!APPLICATION_ID_RE.test(app) || !FEE_AMOUNTS.includes(amount)) {
    return send(res, 400, ...INVALID);
  }
  if (!verifyFeeToken(app, token, process.env.FEE_LINK_SECRET)) {
    return send(res, 403, ...INVALID);
  }

  try {
    const rec = await findByApplicationId(app);
    if (!rec) return send(res, 404, ...INVALID);

    // Idempotent: repeating the same answer (or a scanner re-fetch) changes nothing
    if (rec.feePreference !== String(amount)) {
      await updateFeePreference(app, {
        amount,
        respondedAt: formatIST(new Date()),
        source: 'Email button',
        changeCount: rec.feePreference ? rec.feeChangeCount + 1 : 0,
      });
    }

    return send(
      res,
      200,
      'Thank you, your answer is saved',
      `We have noted ${formatRupees(amount)} as your comfortable fee. The final fee will be confirmed at onboarding.`
    );
  } catch (err) {
    console.error(`[fee-preference] failed for ${app}:`, err);
    return send(
      res,
      500,
      'Something went wrong',
      'We could not save your answer right now. Please try the button again in a few minutes, or reply to the email.'
    );
  }
}
