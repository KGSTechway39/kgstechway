# Internship applications: Google Sheet, greeting email, fee survey

When a student submits the form on `/internship`:

1. `POST /api/apply` validates the input and adds a row to the **Internship Applications** tab of the Google Sheet.
2. It sends the student a greeting email from `kgstechwayservices@gmail.com` using `email-templates/internship-confirmation.html`.
3. The email has three fee buttons (₹15,000 / ₹20,000 / ₹25,000). Each links to `GET /api/fee-preference` with a signed token, which writes the amount to that student's row and shows a thank-you page.
4. The EmailJS heads-up to the team inbox still fires as before (best-effort only). The sheet is the source of truth.

| File | Purpose |
| --- | --- |
| `api/apply.js` | Form endpoint: validation, honeypot, rate limit, dedupe, sheet append, email |
| `api/fee-preference.js` | Fee button endpoint: token check, sheet update, thank-you page |
| `api/_lib/internship.js` | Pure logic: IDs, tokens, escaping, template merge, sheet values |
| `api/_lib/sheets.js` | Google Sheets reads and writes |
| `api/_lib/mailer.js` | Gmail SMTP sending |
| `email-templates/internship-confirmation.html` | Greeting email template |
| `tests/unit/internship.test.js` | Unit tests (`npm run test:unit`) |
| `scripts/test-internship-flow.js` | Live end-to-end check (`npm run test:internship-flow -- you@example.com`) |

## One-time setup

### 1. Google Cloud: service account and Sheets API

1. Go to <https://console.cloud.google.com/> and create or select a project (for example `kgstechway-website`).
2. **APIs & Services → Library**: search for **Google Sheets API** and click **Enable**.
3. **IAM & Admin → Service Accounts → Create service account**. Name it `internship-sheet-writer`. It does not need any project roles, so skip that step.
4. Open the new service account, go to **Keys → Add key → Create new key → JSON**, and download the file. Keep it private and never commit it.
5. From the JSON file, note:
   - `client_email`: this is `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key`: this is `GOOGLE_PRIVATE_KEY` (the whole value, including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----\n`)

### 2. The Google Sheet

1. Create a new Google Sheet, for example "KGS Internship Applications".
2. Click **Share**, paste the service account email, choose **Editor**, untick "Notify", and share.
3. Copy the sheet ID from the URL: `https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit`. This is `GOOGLE_SHEET_ID`.
4. You don't need to create the tab or the headers. On the first submission the code creates the `Internship Applications` tab and its header row.

Columns: Application ID · Submitted At (IST) · Full Name · Email · Phone · College · Degree / Branch · Year of Study · Track of Interest · Message · Email Status · Email Sent At · Fee Preference (₹) · Fee Survey Responded At · Fee Survey Source · Fee Survey Change Count · Fee Preference Notes · Status (New / Contacted / Confirmed / Rejected)

- **Fee Preference Notes** and **Status** are for the team to edit by hand. Use Notes for anything a student tells you by reply or phone, such as a different fee amount.
- Don't reorder, insert, or delete **columns**: the code writes by column position. Sorting, filtering, and adding rows are fine, because rows are found by Application ID.
- Tip: add a data-validation dropdown (New / Contacted / Confirmed / Rejected) to the Status column.

### 3. Gmail App Password for kgstechwayservices@gmail.com

1. Sign in to the Gmail account and open <https://myaccount.google.com/security>.
2. Turn on **2-Step Verification**. App Passwords require it.
3. Open <https://myaccount.google.com/apppasswords>, create one named `kgstechway-website`, and copy the 16-character password. This is `GMAIL_APP_PASSWORD` (spaces are fine).
4. If you later change the account password, Google revokes all App Passwords. Create a new one and update Vercel.

### 4. Fee link secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Use the output as `FEE_LINK_SECRET`. Set it once and leave it: changing it breaks the fee buttons in every email already sent.

### 5. Vercel environment variables

In Vercel, go to **Project → Settings → Environment Variables** and add these for **Production** and **Preview**:

| Name | Value |
| --- | --- |
| `GMAIL_USER` | `kgstechwayservices@gmail.com` |
| `GMAIL_APP_PASSWORD` | the App Password |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `client_email` from the JSON key |
| `GOOGLE_PRIVATE_KEY` | `private_key` from the JSON key. Paste it as is; either real newlines or literal `\n` work |
| `GOOGLE_SHEET_ID` | the sheet ID |
| `FEE_LINK_SECRET` | the random secret |
| `SITE_URL` | `https://kgstechway.com` for Production. For Preview, use the preview URL if you want fee links to hit the preview deployment |

Or with the CLI: `vercel env add GOOGLE_PRIVATE_KEY production` (and the same for each variable). Environment variables only take effect on the **next deployment**.

## How to test

**Unit tests** (no credentials needed):

```bash
npm run test:unit
```

**Locally, end to end:**

1. Copy `.env.example` to `.env`, fill in the values, and set `SITE_URL=http://localhost:3000`.
2. Run `npm run dev`. The Vite dev server runs `/api/apply` and `/api/fee-preference` through the dev shim in `vite.config.ts`.
3. Either open <http://localhost:3000/internship>, click Apply, and submit using **your own** email, or run:
   ```bash
   npm run test:internship-flow -- you@example.com
   ```
4. Check that:
   - a new row appears in the sheet with `Email Status = Sent`
   - the email arrives (check spam and promotions too)
   - tapping ₹20,000 shows the thank-you page and the **same row** now shows `20000`, a timestamp, and `Email button`
   - tapping ₹25,000 overwrites it with `25000`, and `Fee Survey Change Count` becomes `1`
   - submitting again with the same email adds no row and returns the same Application ID

**On a preview deployment:** run `npm run test:internship-flow -- you@example.com https://<preview-url>`. If Vercel Deployment Protection is on, open the site in a logged-in browser instead.

Delete the test rows afterwards.

## Behaviour and limits

- **Duplicate rule.** There is one row per email address (case-insensitive). A repeat submission returns success with the original Application ID and does not add a row. The greeting email is re-sent only if the earlier send did not succeed (`Email Status` is not `Sent`).
- **Email failures** don't lose the application. The row stays, `Email Status` is set to `Failed`, the error is logged in Vercel function logs, and the student still sees success. Filter the sheet by `Failed` to follow up manually.
- **If the sheet write fails**, the student sees an error with a "Try again" button, and nothing is emailed.
- **Rate limit.** Each IP gets 5 submissions per hour. This is kept in memory per serverless instance and resets on cold starts, so it only slows down casual abuse. Move it to Upstash Redis (Vercel Marketplace) if the form gets targeted.
- **Link pre-fetch.** Some mail security scanners open links before the student does. The write is idempotent, but a scanner that opens all three buttons would leave ₹25,000 recorded. If answers show up seconds after the email was sent, add a one-tap confirm step to `/api/fee-preference`.
- **Gmail sending limit.** A free Gmail account can send about **500 emails per day**. That is fine for launch. If volume grows, move to a transactional provider (Resend, Amazon SES) or Google Workspace; only `api/_lib/mailer.js` needs to change.
