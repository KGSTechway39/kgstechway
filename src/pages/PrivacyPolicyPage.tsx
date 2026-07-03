import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import SEO from '../components/SEO';
import { COMPANY } from '../constants/company';
import { generateWebPageStructuredData } from '../utils/seoUtils';
import './LegalPage.css';

const LAST_UPDATED = 'July 3, 2026';

const PrivacyPolicyPage: React.FC = () => {
  const { isDarkMode } = useSelector((state: any) => state.theme);

  const structuredData = generateWebPageStructuredData({
    name: `Privacy Policy - ${COMPANY.name}`,
    description: `Read the ${COMPANY.name} privacy policy to understand how we collect, use, and protect your personal information.`,
    url: `${COMPANY.baseUrl}/privacy-policy`,
    breadcrumbs: [
      { name: 'Home', url: COMPANY.baseUrl },
      { name: 'Privacy Policy', url: `${COMPANY.baseUrl}/privacy-policy` },
    ],
  });

  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'} style={{ minHeight: '100vh', paddingTop: '80px' }}>
      <SEO
        title={`Privacy Policy | ${COMPANY.name}`}
        description={`Learn how ${COMPANY.name} collects, uses, discloses, and safeguards your information when you use our website and services.`}
        keywords="Privacy Policy, Data Protection, Personal Information, KGSTechway Privacy, GDPR, Data Security"
        canonicalUrl={`${COMPANY.baseUrl}/privacy-policy`}
        ogTitle={`Privacy Policy | ${COMPANY.name}`}
        ogDescription={`Understand how ${COMPANY.name} handles and protects your personal data.`}
        structuredData={structuredData}
      />

      <section style={{ padding: '60px 0 40px 0' }}>
        <Container>
          <Row>
            <Col lg={9} className="mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="display-5 fw-bold mb-3">
                  Privacy <span style={{ color: '#0066cc' }}>Policy</span>
                </h1>
                <p className="text-muted mb-5">Last updated: {LAST_UPDATED}</p>

                <div className="legal-content">
                  <p>
                    {COMPANY.legalName} (&ldquo;{COMPANY.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
                    &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we
                    collect, use, disclose, and safeguard your information when you visit our website{' '}
                    {COMPANY.baseUrl} and use our services. By using our website, you consent to the practices
                    described in this policy.
                  </p>

                  <h2>1. Information We Collect</h2>
                  <p>We may collect the following types of information:</p>
                  <ul>
                    <li>
                      <strong>Personal Information:</strong> Name, email address, phone number, company name, and any
                      other details you provide when contacting us, requesting a quote, or subscribing to our
                      newsletter.
                    </li>
                    <li>
                      <strong>Usage Data:</strong> Information about how you interact with our website, such as pages
                      visited, time spent, referring URLs, browser type, and device information.
                    </li>
                    <li>
                      <strong>Cookies &amp; Tracking Technologies:</strong> We use cookies and similar technologies to
                      analyze traffic and improve your experience.
                    </li>
                  </ul>

                  <h2>2. How We Use Your Information</h2>
                  <p>We use the information we collect to:</p>
                  <ul>
                    <li>Respond to your inquiries and provide requested services.</li>
                    <li>Send you quotes, proposals, and project-related communications.</li>
                    <li>Improve our website, products, and services.</li>
                    <li>Send newsletters and marketing communications (where you have opted in).</li>
                    <li>Comply with legal obligations and protect our rights.</li>
                  </ul>

                  <h2>3. How We Share Your Information</h2>
                  <p>
                    We do not sell your personal information. We may share your information with trusted third-party
                    service providers who assist us in operating our website and delivering services (such as
                    analytics, email, and hosting providers), all of whom are obligated to keep your information
                    confidential. We may also disclose information when required by law.
                  </p>

                  <h2>4. Data Security</h2>
                  <p>
                    We implement reasonable administrative, technical, and physical safeguards to protect your
                    personal information. However, no method of transmission over the Internet is completely secure,
                    and we cannot guarantee absolute security.
                  </p>

                  <h2>5. Your Rights</h2>
                  <p>
                    Depending on your jurisdiction, you may have the right to access, correct, update, or request
                    deletion of your personal information, as well as to opt out of marketing communications. To
                    exercise these rights, please contact us using the details below.
                  </p>

                  <h2>6. Third-Party Links</h2>
                  <p>
                    Our website may contain links to third-party websites. We are not responsible for the privacy
                    practices or content of those websites. We encourage you to review their privacy policies.
                  </p>

                  <h2>7. Children&rsquo;s Privacy</h2>
                  <p>
                    Our services are not directed to individuals under the age of 16. We do not knowingly collect
                    personal information from children.
                  </p>

                  <h2>8. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with
                    an updated &ldquo;Last updated&rdquo; date.
                  </p>

                  <h2>9. Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <ul>
                    <li>
                      <strong>Email:</strong>{' '}
                      <a href={`mailto:${COMPANY.contact.email}`}>{COMPANY.contact.email}</a>
                    </li>
                    <li>
                      <strong>Phone:</strong> {COMPANY.contact.phone}
                    </li>
                    <li>
                      <strong>Address:</strong> {COMPANY.contact.address}
                    </li>
                  </ul>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
