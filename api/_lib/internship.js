/**
 * Pure logic for the internship application flow — no network, no env reads
 * except where a value is passed in. Everything here is unit tested in
 * tests/unit/internship.test.js.
 */
import crypto from 'node:crypto';

export const FEE_AMOUNTS = [15000, 20000, 25000];

export const TRACKS = [
  'Programming Foundations (Python, JavaScript, TypeScript)',
  'Test Automation (Selenium, Playwright)',
  'Git & GitHub Workflow',
  'Gen AI & Agentic AI',
  'Full Program — all four tracks',
  'Not sure yet, please guide me',
];

export const EXPERIENCE_LEVELS = [
  'Final Year',
  '3rd Year',
  '2nd Year',
  '1st Year',
  'Passed Out / Graduated',
];

/** Sheet columns, in order. Column letters are derived from this list. */
export const SHEET_COLUMNS = [
  'Application ID',
  'Submitted At (IST)',
  'Full Name',
  'Email',
  'Phone',
  'College',
  'Degree / Branch',
  'Year of Study',
  'Track of Interest',
  'Message',
  'Email Status',
  'Email Sent At',
  'Fee Preference (₹)',
  'Fee Survey Responded At',
  'Fee Survey Source',
  'Fee Survey Change Count',
  'Fee Preference Notes',
  'Status (New / Contacted / Confirmed / Rejected)',
];

/** 0-based index → A1 column letter (0 → A, 25 → Z, 26 → AA) */
export function columnLetter(index) {
  let n = index + 1;
  let out = '';
  while (n > 0) {
    const rem = (n - 1) % 26;
    out = String.fromCharCode(65 + rem) + out;
    n = Math.floor((n - 1) / 26);
  }
  return out;
}

export const COL = Object.fromEntries(
  SHEET_COLUMNS.map((name, i) => [name, { index: i, letter: columnLetter(i) }])
);

const LIMITS = { name: 100, email: 254, phone: 20, college: 150, branch: 100, message: 1000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s\-()]{10,20}$/;

/**
 * Validate and normalise the form payload.
 * @returns {{ ok: true, data: object } | { ok: false, errors: Record<string,string> }}
 */
export function validateApplication(body) {
  const src = body && typeof body === 'object' ? body : {};
  const str = (key) => (typeof src[key] === 'string' ? src[key].trim() : '');

  const data = {
    name: str('name'),
    email: str('email').toLowerCase(),
    phone: str('phone'),
    college: str('college'),
    branch: str('branch'),
    experience: str('experience'),
    track: str('track'),
    message: str('message'),
  };
  const errors = {};

  if (data.name.length < 2) errors.name = 'Please enter your full name';
  if (!EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid email address';
  const digits = data.phone.replace(/\D/g, '');
  if (!PHONE_RE.test(data.phone) || digits.length < 10 || digits.length > 15) {
    errors.phone = 'Please enter a valid phone number';
  }
  if (!data.college) errors.college = 'Please enter your college name';
  if (!EXPERIENCE_LEVELS.includes(data.experience)) {
    errors.experience = 'Please select your current experience level';
  }
  if (!TRACKS.includes(data.track)) errors.track = 'Please select a course / track';

  for (const [key, max] of Object.entries(LIMITS)) {
    if (data[key].length > max) errors[key] = `Must be ${max} characters or fewer`;
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

// Crockford-style alphabet: no 0/O/1/I/L so IDs are easy to read out on a call
const ID_ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

/**
 * Readable random ID: KGS-INT-YYYYMMDD-XXXXXX (IST date).
 * 6 chars from a 31-letter alphabet ≈ 887M combinations per day, drawn with
 * crypto.randomInt. Use uniqueApplicationId() to also rule out the (tiny)
 * chance of a clash with an ID already in the sheet.
 */
export function generateApplicationId(date = new Date(), randomInt = crypto.randomInt) {
  const ymd = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .replace(/-/g, '');
  let suffix = '';
  for (let i = 0; i < 6; i++) suffix += ID_ALPHABET[randomInt(ID_ALPHABET.length)];
  return `KGS-INT-${ymd}-${suffix}`;
}

/** Generate an ID that is not in `existingIds` (a Set) */
export function uniqueApplicationId(existingIds, date = new Date(), generate = generateApplicationId) {
  for (let i = 0; i < 20; i++) {
    const id = generate(date);
    if (!existingIds.has(id)) return id;
  }
  throw new Error('Could not generate a unique application ID');
}

export const APPLICATION_ID_RE = /^KGS-INT-\d{8}-[23456789A-HJKMNP-Z]{6}$/;

export function signFeeToken(applicationId, secret) {
  if (!secret) throw new Error('FEE_LINK_SECRET is not set');
  return crypto.createHmac('sha256', secret).update(applicationId).digest('hex');
}

export function verifyFeeToken(applicationId, token, secret) {
  if (!secret || typeof token !== 'string' || !/^[0-9a-f]{64}$/.test(token)) return false;
  const expected = Buffer.from(signFeeToken(applicationId, secret), 'hex');
  const given = Buffer.from(token, 'hex');
  return given.length === expected.length && crypto.timingSafeEqual(given, expected);
}

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Replace every {{key}} with the HTML-escaped value. Unknown keys are left intact. */
export function mergeTemplate(template, fields) {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(fields, key) ? escapeHtml(fields[key]) : match
  );
}

/**
 * Make a value safe for USER_ENTERED writes: anything that Sheets could read as
 * a formula gets a leading apostrophe (shown as plain text, apostrophe hidden).
 */
export function sanitizeCell(value) {
  const s = String(value ?? '');
  return /^[=+\-@]/.test(s) ? `'${s}` : s;
}

/** Force text (keeps leading zeros and the + in phone numbers) */
export function asText(value) {
  const s = String(value ?? '');
  return s ? `'${s}` : s;
}

export function formatIST(date = new Date()) {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date);
}

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/** Parse a timestamp written by formatIST() ("08 Oct 2026, 12:12:21 pm"); null if unreadable */
export function parseIST(text) {
  const m = String(text || '')
    .trim()
    .match(/^(\d{1,2})\s+([A-Za-z]{3})[a-z]*\.?\s+(\d{4}),?\s+(\d{1,2}):(\d{2}):(\d{2})\s*([ap])m$/i);
  if (!m) return null;
  const month = MONTHS.indexOf(m[2].toLowerCase());
  if (month < 0) return null;
  let hour = Number(m[4]) % 12;
  if (m[7].toLowerCase() === 'p') hour += 12;
  // IST is UTC+05:30 with no daylight saving
  const ms = Date.UTC(Number(m[3]), month, Number(m[1]), hour, Number(m[5]), Number(m[6]));
  return new Date(ms - (5 * 60 + 30) * 60 * 1000);
}

/** A repeat applicant gets the greeting again, but at most once per hour */
export const RESEND_COOLDOWN_MS = 60 * 60 * 1000;

export function shouldResendGreeting({ emailStatus, emailSentAt }, now = new Date()) {
  if (emailStatus !== 'Sent') return true;
  const sent = parseIST(emailSentAt);
  if (!sent) return true;
  return now.getTime() - sent.getTime() >= RESEND_COOLDOWN_MS;
}

export function formatISTDate(date = new Date()) {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatRupees(amount) {
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}

/** The row written to the sheet for a new application */
export function buildSheetRow({ applicationId, submittedAt, data }) {
  const row = new Array(SHEET_COLUMNS.length).fill('');
  const set = (col, v) => (row[COL[col].index] = v);
  set('Application ID', applicationId);
  set('Submitted At (IST)', formatIST(submittedAt));
  set('Full Name', sanitizeCell(data.name));
  set('Email', sanitizeCell(data.email));
  set('Phone', asText(data.phone));
  set('College', sanitizeCell(data.college));
  set('Degree / Branch', sanitizeCell(data.branch));
  set('Year of Study', sanitizeCell(data.experience));
  set('Track of Interest', sanitizeCell(data.track));
  set('Message', sanitizeCell(data.message));
  set('Email Status', 'Pending');
  set('Fee Survey Change Count', '0');
  set('Status (New / Contacted / Confirmed / Rejected)', 'New');
  return row;
}

/** Merge fields for the greeting email (HTML and text versions share these) */
export function buildEmailFields({ applicationId, submittedAt, data, siteUrl, secret }) {
  return {
    student_name: data.name,
    application_id: applicationId,
    selected_track: data.track,
    college: data.college,
    year: data.experience,
    submitted_date: formatISTDate(submittedAt),
    fee_token: signFeeToken(applicationId, secret),
    site_url: siteUrl.replace(/\/+$/, ''),
  };
}

export function feeLink(fields, amount) {
  const q = new URLSearchParams({
    app: fields.application_id,
    amount: String(amount),
    token: fields.fee_token,
  });
  return `${fields.site_url}/api/fee-preference?${q}`;
}

export function buildPlainTextEmail(fields) {
  return [
    'KGS Techway | Internship Program',
    '',
    `Welcome aboard, ${fields.student_name}.`,
    'Your journey from student to builder starts here.',
    '',
    `Dear ${fields.student_name},`,
    '',
    'Thank you for applying to the KGS Techway Internship Program. We are glad you chose to learn by building rather than by memorising.',
    '',
    'YOUR APPLICATION',
    `Application ID: ${fields.application_id}`,
    `Track of interest: ${fields.selected_track}`,
    `College / Year: ${fields.college} · ${fields.year}`,
    `Submitted on: ${fields.submitted_date}`,
    '',
    'HOW THE PROGRAM WORKS',
    'Format: Paid, hands-on learning program with your own projects build',
    'Start date: We will inform you by email once your batch is confirmed',
    'Fee details: Final fee shared at onboarding. Tell us your comfortable range in the survey below',
    'Learning style: Write code, break things, fix them, ship real projects',
    'You receive: Internship certificate with a verifiable Certificate ID, plus projects for your portfolio',
    '',
    'WHAT YOU WILL LEARN',
    '1. Full-Stack Development',
    '2. Generative AI (GenAI)',
    '3. Agentic AI',
    '4. Testing: Traditional and Agentic AI',
    '',
    '10-SECOND SURVEY: What fee are you comfortable with?',
    'Open the link closest to your budget. This is only a survey, not a commitment or a payment.',
    ...FEE_AMOUNTS.map((a) => `  Up to ${formatRupees(a)}: ${feeLink(fields, a)}`),
    'One tap is enough. The final fee is confirmed to you at onboarding.',
    '',
    'WHAT HAPPENS NEXT',
    '1. Application review: our team goes through your profile.',
    '2. We contact you: you will receive an email or call from us. Beginners are welcome.',
    '3. Start date confirmed: we will let you know your batch start date, fee details and joining instructions.',
    '',
    'Questions? Simply reply to this email and our team will get back to you.',
    '',
    'Warm regards,',
    'Internship Team',
    'KGS Techway Services Private Limited',
    'No 47/256, Govinda Chetty St, Kaveripattinam, Krishnagiri, Tamil Nadu 635112',
    'sales@kgstechway.com · kgstechway.com',
  ].join('\n');
}
