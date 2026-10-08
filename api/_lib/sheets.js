/**
 * Google Sheets access for internship applications (service-account auth).
 * Rows are always located by Application ID in column A — never by a cached
 * row number, so manual sorting/inserting in the sheet cannot misdirect writes.
 */
import { google } from 'googleapis';
import { SHEET_COLUMNS, COL, columnLetter } from './internship.js';

export const TAB = 'Internship Applications';
const LAST_COL = columnLetter(SHEET_COLUMNS.length - 1);
const range = (a1) => `'${TAB}'!${a1}`;

/** Vercel stores multi-line secrets with literal "\n" — turn them back into newlines */
export function normalizePrivateKey(key) {
  return String(key || '')
    .replace(/^"|"$/g, '')
    .replace(/\\n/g, '\n');
}

let cached;
function client() {
  if (cached) return cached;
  const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID } = process.env;
  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
    throw new Error('Google Sheets env vars are not configured');
  }
  const auth = new google.auth.JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: normalizePrivateKey(GOOGLE_PRIVATE_KEY),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  cached = { sheets: google.sheets({ version: 'v4', auth }), spreadsheetId: GOOGLE_SHEET_ID };
  return cached;
}

let ensured = false;
/** Create the tab and header row if they don't exist yet */
export async function ensureSheet() {
  if (ensured) return;
  const { sheets, spreadsheetId } = client();

  const meta = await sheets.spreadsheets.get({ spreadsheetId, fields: 'sheets.properties.title' });
  const exists = meta.data.sheets?.some((s) => s.properties?.title === TAB);
  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: TAB } } }] },
    });
  }

  const header = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: range(`A1:${LAST_COL}1`),
  });
  if (!header.data.values?.[0]?.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: range(`A1:${LAST_COL}1`),
      valueInputOption: 'RAW',
      requestBody: { values: [SHEET_COLUMNS] },
    });
  }
  ensured = true;
}

/** Read every data row (A..last column). Fine at internship-form volume. */
async function readAll() {
  const { sheets, spreadsheetId } = client();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: range(`A2:${LAST_COL}`),
  });
  return res.data.values || [];
}

function toRecord(values, rowNumber) {
  const cell = (col) => values[COL[col].index] ?? '';
  return {
    rowNumber,
    applicationId: cell('Application ID'),
    email: cell('Email'),
    submittedAt: cell('Submitted At (IST)'),
    emailStatus: cell('Email Status'),
    emailSentAt: cell('Email Sent At'),
    feePreference: cell('Fee Preference (₹)'),
    feeChangeCount: Number(cell('Fee Survey Change Count')) || 0,
  };
}

/** Every application in the sheet, as lightweight records */
export async function listRecords() {
  const rows = await readAll();
  return rows.map((r, i) => toRecord(r, i + 2)).filter((r) => r.applicationId);
}

export async function findByApplicationId(applicationId) {
  const records = await listRecords();
  return records.find((r) => r.applicationId === applicationId) || null;
}

export async function appendRow(row) {
  const { sheets, spreadsheetId } = client();
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: range('A1'),
    valueInputOption: 'USER_ENTERED',
    // OVERWRITE fills the next empty row; INSERT_ROWS would copy the bold header style
    insertDataOption: 'OVERWRITE',
    requestBody: { values: [row] },
  });
}

/**
 * Write a contiguous block of columns on the row that holds `applicationId`.
 * The row is re-located right before writing.
 */
async function updateColumns(applicationId, fromCol, values) {
  const rec = await findByApplicationId(applicationId);
  if (!rec) throw new Error(`Application ${applicationId} not found in sheet`);
  const { sheets, spreadsheetId } = client();
  const start = COL[fromCol].index;
  const a1 = `${columnLetter(start)}${rec.rowNumber}:${columnLetter(start + values.length - 1)}${rec.rowNumber}`;
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: range(a1),
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [values] },
  });
}

export function updateEmailStatus(applicationId, status, sentAt) {
  // Email Status + Email Sent At are adjacent (K:L)
  return updateColumns(applicationId, 'Email Status', [status, sentAt]);
}

export function updateFeePreference(applicationId, { amount, respondedAt, source, changeCount }) {
  // Fee Preference, Responded At, Source, Change Count are adjacent (M:P)
  return updateColumns(applicationId, 'Fee Preference (₹)', [
    String(amount),
    respondedAt,
    source,
    String(changeCount),
  ]);
}
