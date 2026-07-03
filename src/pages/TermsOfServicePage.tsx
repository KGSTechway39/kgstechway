import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import SEO from '../components/SEO';
import { COMPANY } from '../constants/company';
import { generateWebPageStructuredData } from '../utils/seoUtils';
import './LegalPage.css';

const LAST_UPDATED = 'July 3, 2026';

const TermsOfServicePage: React.FC = () => {
  const { isDarkMode } = useSelector((state: any) => state.theme);

  const structuredData = generateWebPageStructuredData({
    name: `Terms of Service - ${COMPANY.name}`,
    description: `Read the terms and conditions governing your use of the ${COMPANY.name} website and services.`,
    url: `${COMPANY.baseUrl}/terms-of-service`,
    breadcrumbs: [
      { name: 'Home', url: COMPANY.baseUrl },
      { name: 'Terms of Service', url: `${COMPANY.baseUrl}/terms-of-service` },
    ],
  });

  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'} style={{ minHeight: '100vh', paddingTop: '80px' }}>
      <SEO
        title={`Terms of Service | ${COMPANY.name}`}
        description={`Review the terms and conditions that govern the use of ${COMPANY.name}'s website and services.`}
        keywords="Terms of Service, Terms and Conditions, KGSTechway Terms, Website Terms, Service Agreement"
        canonicalUrl={`${COMPANY.baseUrl}/terms-of-service`}
        ogTitle={`Terms of Service | ${COMPANY.name}`}
        ogDescription={`The terms and conditions for using ${COMPANY.name}'s website and services.`}
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
                  Terms of <span style={{ color: '#0066cc' }}>Service</span>
                </h1>
                <p className="text-muted mb-5">Last updated: {LAST_UPDATED}</p>

                <div className="legal-content">
                  <p>
                    These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the website{' '}
                    {COMPANY.baseUrl} and the services provided by {COMPANY.legalName} (&ldquo;{COMPANY.name}&rdquo;,
                    &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). By accessing or using our website, you
                    agree to be bound by these Terms. If you do not agree, please do not use our website or services.
                  </p>

                  <h2>1. Use of Our Website</h2>
                  <p>
                    You agree to use our website only for lawful purposes and in a manner that does not infringe the
                    rights of, or restrict or inhibit the use and enjoyment of, this website by any third party. You
                    must not misuse our website by knowingly introducing viruses or other malicious material.
                  </p>

                  <h2>2. Services</h2>
                  <p>
                    {COMPANY.name} provides technology services including software development, AI solutions, CRM/ERP
                    services, cloud &amp; DevOps, QA &amp; testing, and related consulting. The specific scope,
                    deliverables, timelines, and fees for any engagement will be defined in a separate written
                    agreement, proposal, or statement of work.
                  </p>

                  <h2>3. Intellectual Property</h2>
                  <p>
                    All content on this website, including text, graphics, logos, images, and software, is the
                    property of {COMPANY.legalName} or its licensors and is protected by applicable intellectual
                    property laws. You may not reproduce, distribute, or create derivative works without our prior
                    written consent.
                  </p>

                  <h2>4. User Submissions</h2>
                  <p>
                    Any information or materials you submit through our contact forms or other channels must be
                    accurate and lawful. You grant us the right to use such submissions solely for the purpose of
                    responding to your inquiries and providing our services.
                  </p>

                  <h2>5. Third-Party Links</h2>
                  <p>
                    Our website may contain links to third-party websites or services that are not owned or
                    controlled by {COMPANY.name}. We are not responsible for the content, privacy policies, or
                    practices of any third-party websites.
                  </p>

                  <h2>6. Disclaimer of Warranties</h2>
                  <p>
                    Our website and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
                    basis without warranties of any kind, whether express or implied. We do not warrant that the
                    website will be uninterrupted, error-free, or free of harmful components.
                  </p>

                  <h2>7. Limitation of Liability</h2>
                  <p>
                    To the fullest extent permitted by law, {COMPANY.legalName} shall not be liable for any indirect,
                    incidental, special, consequential, or punitive damages arising out of or relating to your use of
                    our website or services.
                  </p>

                  <h2>8. Indemnification</h2>
                  <p>
                    You agree to indemnify and hold harmless {COMPANY.legalName}, its officers, employees, and agents
                    from any claims, damages, or expenses arising from your violation of these Terms or your misuse of
                    our website.
                  </p>

                  <h2>9. Governing Law</h2>
                  <p>
                    These Terms are governed by and construed in accordance with the laws of India, without regard to
                    its conflict of law principles. Any disputes shall be subject to the exclusive jurisdiction of the
                    courts located in Tamil Nadu, India.
                  </p>

                  <h2>10. Changes to These Terms</h2>
                  <p>
                    We reserve the right to modify these Terms at any time. Changes will be effective upon posting to
                    this page with an updated &ldquo;Last updated&rdquo; date. Your continued use of the website
                    constitutes acceptance of the revised Terms.
                  </p>

                  <h2>11. Contact Us</h2>
                  <p>If you have any questions about these Terms, please contact us at:</p>
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

export default TermsOfServicePage;
