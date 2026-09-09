/**
 * EmailJS credentials shared by the contact and internship enquiry forms.
 * The public key is safe to ship in the bundle — it is a browser-side key by design.
 */
export const EMAILJS_SERVICE_ID = 'service_4sqkw34';
export const EMAILJS_TEMPLATE_ID = 'template_2xyur1t';
export const EMAILJS_PUBLIC_KEY = '-ByLMIkbG6ltvGCvY';

/**
 * Dedicated template for internship applications.
 *
 * Until the new template exists in the EmailJS dashboard this points at the shared
 * contact template, so applications keep arriving (with generic field labels).
 * Paste the HTML from docs/emailjs-internship-template.html into a new EmailJS
 * template, then replace the id below with the new template id.
 */
export const EMAILJS_INTERNSHIP_TEMPLATE_ID = EMAILJS_TEMPLATE_ID;
