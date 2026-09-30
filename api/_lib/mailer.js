/**
 * Greeting email for internship applicants, sent via Gmail SMTP with an App
 * Password. Free Gmail allows ~500 sends/day — see docs/internship-setup.md.
 */
import fs from 'node:fs';
import path from 'node:path';
import nodemailer from 'nodemailer';
import { mergeTemplate, buildPlainTextEmail } from './internship.js';

const TEMPLATE_PATH = path.join(process.cwd(), 'email-templates', 'internship-confirmation.html');

let template;
function loadTemplate() {
  if (!template) template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  return template;
}

let transporter;
function getTransporter() {
  if (transporter) return transporter;
  const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) throw new Error('Gmail env vars are not configured');
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD.replace(/\s+/g, '') },
  });
  return transporter;
}

/** @param fields merge fields from buildEmailFields() */
export async function sendGreetingEmail(to, fields) {
  const from = process.env.GMAIL_USER;
  await getTransporter().sendMail({
    from: `"KGS Techway Internship Team" <${from}>`,
    to,
    replyTo: from,
    // nodemailer encodes headers, so the raw name is safe here
    subject: `We received your application, ${fields.student_name} | KGS Techway Internship`,
    html: mergeTemplate(loadTemplate(), fields),
    text: buildPlainTextEmail(fields),
  });
}
