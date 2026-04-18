import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const {
    name,
    email,
    phone,
    company,
    service,
    budget,
    timeline,
    message,
    date,
  } = req.body;

  // Basic validation
  if (!name || !email || !service || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });

  const mailOptions = {
    from: `"KGS Techway Website" <${process.env.ZOHO_EMAIL}>`,
    to: process.env.ZOHO_EMAIL,
    replyTo: email,
    subject: `New Enquiry from ${name} — ${service}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
        <div style="background: #0066cc; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0;">New Project Enquiry — KGS Techway</h2>
        </div>
        <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;"><strong>Full Name</strong></td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr style="background: #f5f5f5;">
              <td style="padding: 8px 0; color: #666;"><strong>Email</strong></td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Phone</strong></td>
              <td style="padding: 8px 0;">${phone || 'Not provided'}</td>
            </tr>
            <tr style="background: #f5f5f5;">
              <td style="padding: 8px 0; color: #666;"><strong>Company</strong></td>
              <td style="padding: 8px 0;">${company || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Service Needed</strong></td>
              <td style="padding: 8px 0;">${service}</td>
            </tr>
            <tr style="background: #f5f5f5;">
              <td style="padding: 8px 0; color: #666;"><strong>Budget Range</strong></td>
              <td style="padding: 8px 0;">${budget || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Timeline</strong></td>
              <td style="padding: 8px 0;">${timeline || 'Not specified'}</td>
            </tr>
            <tr style="background: #f5f5f5;">
              <td style="padding: 8px 0; color: #666;"><strong>Submitted On</strong></td>
              <td style="padding: 8px 0;">${date || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 16px; background: #f0f7ff; border-left: 4px solid #0066cc; border-radius: 4px;">
            <strong style="color: #0066cc;">Project Details:</strong>
            <p style="margin: 8px 0 0; white-space: pre-wrap; color: #333;">${message}</p>
          </div>

          <p style="margin-top: 20px; color: #999; font-size: 12px;">
            This email was sent from the KGS Techway website contact form. Reply directly to respond to ${name}.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Zoho SMTP Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
  }
}
