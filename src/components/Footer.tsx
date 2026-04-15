import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaGithub, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import BrandLogo from './BrandLogo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);

  const handleNavClick = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(path);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterDone(true);
      setNewsletterEmail('');
    }
  };

  const services = [
    { label: 'Software Development', path: '/services/software-development' },
    { label: 'AI Solutions', path: '/services/ai-solutions' },
    { label: 'CRM/ERP Services', path: '/services/crm-erp' },
    { label: 'Agentic AI Solutions', path: '/services/agentic-ai' },
    { label: 'QA & Testing', path: '/services/qa-testing' },
    { label: 'Cloud & DevOps', path: '/services/cloud-devops' },
  ];

  const company = [
    { label: 'About Us', path: '/about' },
    { label: 'Technology', path: '/technology' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <footer style={{ background: '#0d1117', color: '#c9d1d9', paddingTop: '3.5rem', paddingBottom: '1.5rem', marginTop: '2rem' }}>
      <Container>
        <Row className="mb-5">
          {/* Brand column */}
          <Col lg={3} md={6} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-3" onClick={() => handleNavClick('/')} style={{ cursor: 'pointer' }}>
                <BrandLogo size="lg" showTagline={true} onDark={true} />
              </div>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#8b949e', marginTop: '1rem' }}>
                Leading provider of innovative technology solutions — software development,
                AI, QA, and enterprise services that drive business growth.
              </p>
              <div className="d-flex gap-3 mt-3">
                {[
                  { Icon: FaLinkedin, url: 'https://linkedin.com/company/kgstechway', label: 'LinkedIn' },
                  { Icon: FaTwitter, url: 'https://twitter.com/kgstechway', label: 'Twitter' },
                  { Icon: FaFacebook, url: 'https://facebook.com/kgstechway', label: 'Facebook' },
                  { Icon: FaInstagram, url: 'https://instagram.com/kgstechway', label: 'Instagram' },
                  { Icon: FaGithub, url: 'https://github.com/kgstechway', label: 'GitHub' },
                ].map(({ Icon, url, label }) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                    aria-label={label}
                    style={{ color: '#8b949e', fontSize: '1.2rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#00C896')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8b949e')}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </motion.div>
          </Col>

          {/* Services */}
          <Col lg={2} md={6} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h6 style={{ color: '#00C896', fontWeight: 700, marginBottom: '1rem', letterSpacing: '0.05em' }}>Services</h6>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {services.map(({ label, path }) => (
                  <li key={label} style={{ marginBottom: '0.55rem' }}>
                    <Link to={path} onClick={() => handleNavClick(path)}
                      style={{ color: '#8b949e', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#e6edf3')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#8b949e')}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </Col>

          {/* Company */}
          <Col lg={2} md={6} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h6 style={{ color: '#00C896', fontWeight: 700, marginBottom: '1rem', letterSpacing: '0.05em' }}>Company</h6>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {company.map(({ label, path }) => (
                  <li key={label} style={{ marginBottom: '0.55rem' }}>
                    <Link to={path} onClick={() => handleNavClick(path)}
                      style={{ color: '#8b949e', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#e6edf3')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#8b949e')}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </Col>

          {/* Contact Info */}
          <Col lg={2} md={6} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h6 style={{ color: '#00C896', fontWeight: 700, marginBottom: '1rem', letterSpacing: '0.05em' }}>Contact</h6>
              <div style={{ fontSize: '0.875rem', color: '#8b949e' }}>
                <div className="d-flex align-items-center mb-2 gap-2">
                  <FaPhone style={{ color: '#00C896', flexShrink: 0 }} />
                  <span>+91 8248718780</span>
                </div>
                <div className="d-flex align-items-center mb-2 gap-2">
                  <FaEnvelope style={{ color: '#00C896', flexShrink: 0 }} />
                  <a href="mailto:sales@kgstechway.com" style={{ color: '#8b949e', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#00C896')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8b949e')}
                  >
                    sales@kgstechway.com
                  </a>
                </div>
                <div className="d-flex align-items-start gap-2">
                  <FaMapMarkerAlt style={{ color: '#00C896', flexShrink: 0, marginTop: '3px' }} />
                  <span>Krishnagiri, Tamil Nadu, India</span>
                </div>
              </div>
            </motion.div>
          </Col>

          {/* Newsletter */}
          <Col lg={3} md={12} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h6 style={{ color: '#00C896', fontWeight: 700, marginBottom: '1rem', letterSpacing: '0.05em' }}>Stay Updated</h6>
              <p style={{ fontSize: '0.85rem', color: '#8b949e', marginBottom: '0.75rem' }}>
                Get insights on tech trends and solutions from our team.
              </p>
              {newsletterDone ? (
                <div style={{ color: '#00C896', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaCheckCircle /> Thanks for subscribing!
                </div>
              ) : (
                <Form onSubmit={handleNewsletterSubmit}>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    required
                    style={{
                      background: '#161b22',
                      border: '1px solid #30363d',
                      color: '#e6edf3',
                      fontSize: '0.85rem',
                      marginBottom: '0.5rem',
                    }}
                  />
                  <Button type="submit" size="sm" className="w-100"
                    style={{ background: '#00C896', border: 'none', fontWeight: 600 }}>
                    Subscribe
                  </Button>
                </Form>
              )}
            </motion.div>
          </Col>
        </Row>

        <hr style={{ borderColor: '#21262d', margin: '0 0 1.25rem' }} />

        <Row className="align-items-center">
          <Col md={6}>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#6e7681' }}>
              © {currentYear} KGS Techway. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <small style={{ color: '#6e7681', fontSize: '0.82rem' }}>
              Built with ❤️ using React &amp; TypeScript
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
