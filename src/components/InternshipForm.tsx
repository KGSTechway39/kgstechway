import { useEffect, useRef, useState } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import { FaPaperPlane, FaCheckCircle, FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_INTERNSHIP_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY
} from '../constants/emailjs';

export const TRACKS = [
  'Programming Foundations (Python, JavaScript, TypeScript)',
  'Test Automation (Selenium, Playwright)',
  'Git & GitHub Workflow',
  'Gen AI & Agentic AI',
  'Full Program — all four tracks',
  'Not sure yet, please guide me'
];

export const EXPERIENCE_LEVELS = [
  'Final Year',
  '3rd Year',
  '2nd Year',
  '1st Year',
  'Passed Out / Graduated'
];

const initialForm = {
  // honeypot — hidden from people, bots tend to fill it
  website: '',
  name: '',
  email: '',
  phone: '',
  college: '',
  branch: '',
  experience: '',
  track: '',
  message: ''
};

/**
 * Heads-up to the team inbox via EmailJS. The Google Sheet (written by
 * /api/apply) is the record of truth; this is best-effort and never blocks
 * or fails the student's submission.
 */
function notifyTeam(formData: typeof initialForm) {
  emailjs
    .send(
      EMAILJS_SERVICE_ID,
      EMAILJS_INTERNSHIP_TEMPLATE_ID,
      {
        // Correctly named fields — used by the dedicated internship template
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        college: formData.college,
        branch: formData.branch || 'Not provided',
        experience_level: formData.experience,
        track: formData.track,
        // Legacy slots so the shared contact template still renders until the
        // dedicated one is created. Harmlessly ignored by the new template.
        company: formData.college,
        service: `Internship Application — ${formData.track}`,
        budget: formData.experience,
        timeline: 'Not specified',
        message:
          `INTERNSHIP APPLICATION\n` +
          `College: ${formData.college}\n` +
          `Degree / Branch: ${formData.branch || 'Not provided'}\n` +
          `Current Experience Level: ${formData.experience}\n` +
          `Course / Track Interest: ${formData.track}\n\n` +
          `Message: ${formData.message || 'Not provided'}`,
        date: new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          dateStyle: 'full',
          timeStyle: 'short'
        })
      },
      { publicKey: EMAILJS_PUBLIC_KEY }
    )
    .catch(() => {
      /* the sheet already has the application */
    });
}

interface InternshipFormProps {
  /** Called after a successful submission — used by the popup to auto-close */
  onSuccess?: () => void;
  /** Lets the success panel offer a Close button when shown in the popup */
  onClose?: () => void;
}

const InternshipForm = ({ onSuccess, onClose }: InternshipFormProps) => {
  const [formData, setFormData] = useState(initialForm);
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
    const [applicationId, setApplicationId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // The popup body scrolls, so bring the success / error message into view
  useEffect(() => {
    if (showAlert || submitted) {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showAlert, submitted]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Please enter your full name';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email': {
        if (!value.trim()) return 'Email address is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      }
      case 'phone': {
        if (!value.trim()) return 'Phone / WhatsApp number is required';
        if (value.replace(/\D/g, '').length < 10) return 'Please enter a valid 10-digit number';
        return '';
      }
      case 'college':
        if (!value.trim()) return 'Please enter your college name';
        return '';
      case 'experience':
        if (!value) return 'Please select your current experience level';
        return '';
      case 'track':
        if (!value) return 'Please select a course / track';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const required = ['name', 'email', 'phone', 'college', 'experience', 'track'];
    const nextErrors: Record<string, string> = {};
    required.forEach((field) => {
      const msg = validateField(field, formData[field as keyof typeof formData]);
      if (msg) nextErrors[field] = msg;
    });

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setShowAlert(false);
    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        if (response.status === 400 && result.fields) setErrors(result.fields);
        throw new Error(
          response.status === 429
            ? result.error
            : response.status === 400
              ? 'Please check the highlighted fields and try again.'
              : 'We could not submit your application.'
        );
      }

      notifyTeam(formData);
      setApplicationId(result.applicationId);
      setShowAlert(false);
      setSubmitted(true);
      setFormData(initialForm);
      setErrors({});
      onSuccess?.();
    } catch (err) {
      setErrorMessage(err instanceof Error && err.message ? err.message : '');
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div ref={topRef} className="apply-success" role="status" aria-live="polite">
        <FaCheckCircle className="apply-success-icon" />
        <h3>Application received</h3>
        {applicationId && (
          <p>
            Your application ID: <strong>{applicationId}</strong>
          </p>
        )}
        <p>
          Check your email for the confirmation, including the spam and promotions folders.
          Our team will contact you within 24 hours with the batch details.
        </p>
        {onClose && (
          <Button className="apply-submit" onClick={onClose}>
            Close
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      <div ref={topRef} />
      {showAlert && (
        <Alert
          variant="danger"
          onClose={() => setShowAlert(false)}
          dismissible
          className="apply-alert"
        >
          {errorMessage || 'We could not submit your application.'}{' '}
          <Button
            variant="link"
            className="apply-retry p-0 align-baseline"
            onClick={() => formRef.current?.requestSubmit()}
            disabled={isSubmitting}
          >
            Try again
          </Button>{' '}
          or WhatsApp us on +91 8248718780.
        </Alert>
      )}

      <Form ref={formRef} onSubmit={handleSubmit} noValidate>
        <div className="apply-hp" aria-hidden="true">
          <label htmlFor="ip-website">Leave this field empty</label>
          <input
            id="ip-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="ip-name">Full Name *</Form.Label>
              <Form.Control
                id="ip-name"
                name="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="ip-email">Email Address *</Form.Label>
              <Form.Control
                id="ip-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="ip-phone">Phone / WhatsApp *</Form.Label>
              <Form.Control
                id="ip-phone"
                name="phone"
                type="tel"
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="ip-college">College Name *</Form.Label>
              <Form.Control
                id="ip-college"
                name="college"
                type="text"
                placeholder="Your college / university"
                value={formData.college}
                onChange={handleChange}
                isInvalid={!!errors.college}
              />
              <Form.Control.Feedback type="invalid">{errors.college}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="ip-branch">Degree &amp; Branch</Form.Label>
              <Form.Control
                id="ip-branch"
                name="branch"
                type="text"
                placeholder="e.g. B.E. CSE / B.Sc IT / MCA"
                value={formData.branch}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="ip-experience">Current Experience Level *</Form.Label>
              <Form.Select
                id="ip-experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                isInvalid={!!errors.experience}
              >
                <option value="">Select your current year</option>
                {EXPERIENCE_LEVELS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.experience}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="ip-track">Course / Track Interest *</Form.Label>
              <Form.Select
                id="ip-track"
                name="track"
                value={formData.track}
                onChange={handleChange}
                isInvalid={!!errors.track}
              >
                <option value="">Select a course / track</option>
                {TRACKS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.track}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12}>
            <Form.Group className="mb-4">
              <Form.Label htmlFor="ip-message">Anything you want to tell us?</Form.Label>
              <Form.Control
                id="ip-message"
                name="message"
                as="textarea"
                rows={3}
                placeholder="Your goals, current skill level, or questions about the program"
                value={formData.message}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" className="apply-submit" disabled={isSubmitting}>
          {isSubmitting ? (
            'Sending your application…'
          ) : (
            <>
              <FaPaperPlane className="me-2" />
              Submit Application
            </>
          )}
        </Button>

        <p className="apply-note">
          Priority for Final Year and 3rd Year students · Online &amp; offline batches ·
          Beginner friendly
        </p>
      </Form>

      <div className="apply-direct">
        <span>Prefer to talk directly?</span>
        <a href="https://wa.me/918248718780" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp /> WhatsApp
        </a>
        <a href="tel:+918248718780">
          <FaPhone /> +91 8248718780
        </a>
        <a href="mailto:sales@kgstechway.com">
          <FaEnvelope /> sales@kgstechway.com
        </a>
      </div>
    </>
  );
};

export default InternshipForm;
