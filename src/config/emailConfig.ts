// Zoho SMTP Configuration
// The actual SMTP connection is handled server-side in /api/send-email.js
// Set the following environment variables in Vercel Dashboard > Project Settings > Environment Variables:
//
//   ZOHO_EMAIL    = sales@kgstechwayservices.com
//   ZOHO_PASSWORD = <your Zoho account password or App Password if 2FA is on>
//
// Zoho Free SMTP Settings:
//   Host : smtp.zoho.in  (India) or smtp.zoho.com (global)
//   Port : 587  (STARTTLS)
//   Auth : Login (username + password)

export const emailConfig = {
  smtpHost: 'smtp.zoho.in',
  smtpPort: 587,
  fromEmail: 'sales@kgstechwayservices.com',
  toEmail: 'sales@kgstechwayservices.com',
};
