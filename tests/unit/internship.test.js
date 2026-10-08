/**
 * Unit tests for the pure internship logic. Run: npm run test:unit
 * (node:test — no extra dependencies, no network, no env vars needed)
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  generateApplicationId,
  uniqueApplicationId,
  APPLICATION_ID_RE,
  signFeeToken,
  verifyFeeToken,
  escapeHtml,
  mergeTemplate,
  sanitizeCell,
  asText,
  validateApplication,
  buildSheetRow,
  buildEmailFields,
  formatIST,
  parseIST,
  shouldResendGreeting,
  RESEND_COOLDOWN_MS,
  buildPlainTextEmail,
  feeLink,
  columnLetter,
  COL,
  SHEET_COLUMNS,
  TRACKS,
  EXPERIENCE_LEVELS,
} from '../../api/_lib/internship.js';
import { normalizePrivateKey } from '../../api/_lib/sheets.js';
import { renderFeePage } from '../../api/_lib/fee-page.js';

const SECRET = 'test-secret';
const validBody = {
  name: '  Priya R ',
  email: 'Priya@Example.com',
  phone: '+91 98765 43210',
  college: 'Government College of Engineering',
  branch: 'B.E. CSE',
  experience: 'Final Year',
  track: 'Gen AI & Agentic AI',
  message: 'Interested in AI.',
};

describe('generateApplicationId', () => {
  test('uses the IST date and the readable format', () => {
    // 2026-09-30 20:00 UTC is already 1 Oct in IST
    const id = generateApplicationId(new Date('2026-09-30T20:00:00Z'));
    assert.match(id, /^KGS-INT-20261001-/);
    assert.match(id, APPLICATION_ID_RE);
  });

  test('draws characters from the unambiguous alphabet (no 0/1/O/I/L)', () => {
    let n = 0;
    const id = generateApplicationId(new Date(), (max) => n++ % max);
    assert.ok(id.endsWith('-234567'));
    assert.match(id, APPLICATION_ID_RE);
  });

  test('uniqueApplicationId skips IDs already in the sheet', () => {
    const queue = ['KGS-INT-20260930-AAAAAA', 'KGS-INT-20260930-AAAAAA', 'KGS-INT-20260930-BBBBBB'];
    const id = uniqueApplicationId(new Set(['KGS-INT-20260930-AAAAAA']), new Date(), () => queue.shift());
    assert.equal(id, 'KGS-INT-20260930-BBBBBB');
  });

  test('uniqueApplicationId gives up instead of looping forever', () => {
    const taken = new Set(['X']);
    assert.throws(() => uniqueApplicationId(taken, new Date(), () => 'X'));
  });

  test('1,000 real draws are distinct', () => {
    // expected collisions ≈ 1000² / (2 × 31⁶) ≈ 0.0006 — a failure here means broken randomness
    const ids = new Set(Array.from({ length: 1000 }, () => generateApplicationId()));
    assert.equal(ids.size, 1000);
  });
});

describe('fee token', () => {
  const id = 'KGS-INT-20260930-ABCDEF';

  test('verifies a token it signed', () => {
    assert.equal(verifyFeeToken(id, signFeeToken(id, SECRET), SECRET), true);
  });

  test('rejects a token for another application', () => {
    const other = signFeeToken('KGS-INT-20260930-ZZZZZZ', SECRET);
    assert.equal(verifyFeeToken(id, other, SECRET), false);
  });

  test('rejects a token signed with another secret', () => {
    assert.equal(verifyFeeToken(id, signFeeToken(id, 'other'), SECRET), false);
  });

  test('rejects malformed or missing tokens without throwing', () => {
    for (const t of ['', 'abc', undefined, null, 'z'.repeat(64), signFeeToken(id, SECRET) + '00']) {
      assert.equal(verifyFeeToken(id, t, SECRET), false);
    }
  });

  test('rejects everything when the secret is missing', () => {
    assert.equal(verifyFeeToken(id, signFeeToken(id, SECRET), ''), false);
    assert.throws(() => signFeeToken(id, ''));
  });
});

describe('template merge', () => {
  test('HTML-escapes every value', () => {
    const out = mergeTemplate('<p>Hi {{student_name}}</p>', {
      student_name: '<script>alert("x")</script> & \'co\'',
    });
    assert.equal(
      out,
      '<p>Hi &lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;co&#39;</p>'
    );
  });

  test('replaces repeated fields and tolerates spaces', () => {
    assert.equal(mergeTemplate('{{a}}-{{ a }}', { a: 1 }), '1-1');
  });

  test('leaves unknown fields intact', () => {
    assert.equal(mergeTemplate('{{missing}}', {}), '{{missing}}');
  });

  test('the real template has no unfilled fields and carries tokens on every fee link', () => {
    const html = fs.readFileSync('email-templates/internship-confirmation.html', 'utf8');
    const data = validateApplication(validBody).data;
    const fields = buildEmailFields({
      applicationId: 'KGS-INT-20260930-ABCDEF',
      submittedAt: new Date('2026-09-30T06:00:00Z'),
      data,
      siteUrl: 'https://preview.example.com/',
      secret: SECRET,
    });
    const out = mergeTemplate(html, fields);
    assert.doesNotMatch(out, /\{\{\s*\w+\s*\}\}/);
    const links = out.match(/href="[^"]*\/api\/fee-preference[^"]*"/g);
    assert.equal(links.length, 3);
    for (const l of links) {
      assert.ok(l.startsWith('href="https://preview.example.com/api/fee-preference?'));
      assert.ok(l.includes(`token=${fields.fee_token}`));
    }
    assert.ok(out.includes('Gen AI &amp; Agentic AI'));
  });

  test('plain-text version has the ID and all three signed links', () => {
    const fields = buildEmailFields({
      applicationId: 'KGS-INT-20260930-ABCDEF',
      submittedAt: new Date(),
      data: validateApplication(validBody).data,
      siteUrl: 'https://kgstechway.com',
      secret: SECRET,
    });
    const text = buildPlainTextEmail(fields);
    assert.ok(text.includes('KGS-INT-20260930-ABCDEF'));
    for (const a of [15000, 20000, 25000]) assert.ok(text.includes(feeLink(fields, a)));
  });
});

describe('sheet value sanitising', () => {
  test('neutralises formula-like values', () => {
    for (const v of ['=HYPERLINK("x")', '+1', '-1', '@SUM(A1)']) {
      assert.equal(sanitizeCell(v), `'${v}`);
    }
  });

  test('leaves normal values alone', () => {
    assert.equal(sanitizeCell('Priya R'), 'Priya R');
    assert.equal(sanitizeCell(''), '');
    assert.equal(sanitizeCell(undefined), '');
  });

  test('forces phone numbers to text', () => {
    assert.equal(asText('+919876543210'), "'+919876543210");
    assert.equal(asText('09876543210'), "'09876543210");
  });

  test('builds a row in column order with safe values', () => {
    const data = validateApplication({ ...validBody, name: '=cmd()' }).data;
    const row = buildSheetRow({
      applicationId: 'KGS-INT-20260930-ABCDEF',
      submittedAt: new Date(),
      data,
    });
    assert.equal(row.length, SHEET_COLUMNS.length);
    assert.equal(row[0], 'KGS-INT-20260930-ABCDEF');
    assert.equal(row[COL['Full Name'].index], "'=cmd()");
    assert.equal(row[COL.Phone.index], "'+91 98765 43210");
    assert.equal(row[COL['Email Status'].index], 'Pending');
    assert.equal(row[COL['Status (New / Contacted / Confirmed / Rejected)'].index], 'New');
  });

  test('update ranges rely on adjacent columns', () => {
    assert.equal(COL['Email Sent At'].index, COL['Email Status'].index + 1);
    const fee = COL['Fee Preference (₹)'].index;
    assert.equal(COL['Fee Survey Responded At'].index, fee + 1);
    assert.equal(COL['Fee Survey Source'].index, fee + 2);
    assert.equal(COL['Fee Survey Change Count'].index, fee + 3);
  });

  test('column letters', () => {
    assert.equal(columnLetter(0), 'A');
    assert.equal(columnLetter(25), 'Z');
    assert.equal(columnLetter(26), 'AA');
  });
});

describe('validateApplication', () => {
  test('accepts and normalises a valid payload', () => {
    const r = validateApplication(validBody);
    assert.equal(r.ok, true);
    assert.equal(r.data.name, 'Priya R');
    assert.equal(r.data.email, 'priya@example.com');
  });

  test('reports every missing required field', () => {
    const r = validateApplication({});
    assert.equal(r.ok, false);
    assert.deepEqual(Object.keys(r.errors).sort(), [
      'college',
      'email',
      'experience',
      'name',
      'phone',
      'track',
    ]);
  });

  test('rejects bad email, short phone, letters in phone, unknown track, overlong text', () => {
    const r = validateApplication({
      ...validBody,
      email: 'not-an-email',
      phone: '12345',
      track: 'Hacking',
      message: 'x'.repeat(1001),
    });
    assert.deepEqual(Object.keys(r.errors).sort(), ['email', 'message', 'phone', 'track']);
    assert.equal(validateApplication({ ...validBody, phone: '98765abc43210' }).ok, false);
  });

  test('ignores non-string values', () => {
    assert.equal(validateApplication({ ...validBody, name: { $gt: '' } }).ok, false);
  });

  test('server option lists match the form', () => {
    const tsx = fs.readFileSync('src/components/InternshipForm.tsx', 'utf8');
    for (const v of [...TRACKS, ...EXPERIENCE_LEVELS]) {
      assert.ok(tsx.includes(`'${v}'`), `form is missing option: ${v}`);
    }
  });
});

describe('misc', () => {
  test('private key newlines from Vercel env are restored', () => {
    assert.equal(
      normalizePrivateKey('"-----BEGIN-----\\nabc\\n-----END-----\\n"'),
      '-----BEGIN-----\nabc\n-----END-----\n'
    );
  });

  test('thank-you page escapes its content', () => {
    const html = renderFeePage({ title: '<b>x</b>', message: '"m"', siteUrl: 'https://kgstechway.com/' });
    assert.ok(html.includes('&lt;b&gt;x&lt;/b&gt;'));
    assert.ok(html.includes('&quot;m&quot;'));
    assert.ok(html.includes('href="https://kgstechway.com/internship"'));
  });
});

describe('repeat applications', () => {
  const now = new Date('2026-10-08T07:00:00Z'); // 12:30 pm IST

  test('parseIST reads what formatIST writes', () => {
    const d = new Date('2026-10-08T06:42:21Z');
    assert.equal(parseIST(formatIST(d)).getTime(), d.getTime());
    assert.equal(parseIST('08 Oct 2026, 12:12:21 PM').toISOString(), '2026-10-08T06:42:21.000Z');
    assert.equal(parseIST('30 Sept 2026, 10:01:47 pm').toISOString(), '2026-09-30T16:31:47.000Z');
    assert.equal(parseIST('12:00:00 AM'), null);
    assert.equal(parseIST(''), null);
  });

  test('midnight and noon convert correctly', () => {
    assert.equal(parseIST('01 Jan 2026, 12:00:00 AM').toISOString(), '2025-12-31T18:30:00.000Z');
    assert.equal(parseIST('01 Jan 2026, 12:00:00 PM').toISOString(), '2026-01-01T06:30:00.000Z');
  });

  test('resends when the first send failed or is unreadable', () => {
    assert.equal(shouldResendGreeting({ emailStatus: 'Failed', emailSentAt: '' }, now), true);
    assert.equal(shouldResendGreeting({ emailStatus: 'Pending', emailSentAt: '' }, now), true);
    assert.equal(shouldResendGreeting({ emailStatus: 'Sent', emailSentAt: 'garbage' }, now), true);
  });

  test('does not resend within the hour, does after it', () => {
    const recent = formatIST(new Date(now.getTime() - 10 * 60 * 1000));
    const old = formatIST(new Date(now.getTime() - RESEND_COOLDOWN_MS - 1000));
    assert.equal(shouldResendGreeting({ emailStatus: 'Sent', emailSentAt: recent }, now), false);
    assert.equal(shouldResendGreeting({ emailStatus: 'Sent', emailSentAt: old }, now), true);
  });
});
