// EmailJS Configuration
// To set up EmailJS:
// 1. Sign up at https://www.emailjs.com/
// 2. Create a new service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Replace the values below with your actual EmailJS credentials

export const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_kgstechway',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_contact',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key_here'
};

// Example email template for EmailJS:
// Subject: New Contact Form Submission from {{from_name}}
// 
// You have received a new contact form submission:
// 
// Name: {{from_name}}
// Email: {{from_email}}
// Phone: {{phone}}
// Company: {{company}}
// Service Needed: {{service}}
// Budget Range: {{budget}}
// Timeline: {{timeline}}
// 
// Message:
// {{message}}
// 
// Please respond to this inquiry as soon as possible.