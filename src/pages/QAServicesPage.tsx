import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaBug,
  FaArrowLeft,
  FaClipboardCheck,
  FaCogs,
  FaPlug,
  FaTachometerAlt,
  FaShieldAlt,
  FaMobileAlt,
  FaRedo,
  FaCodeBranch,
  FaClock,
  FaCheckCircle,
} from 'react-icons/fa';
import SEO from '../components/SEO';
import { generateServiceStructuredData, generateWebPageStructuredData } from '../utils/seoUtils';
import './ServiceDetailPage.css';

const QA_COLOR = '#11998e';
const QA_GRADIENT = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';

const QAServicesPage: React.FC = () => {
  const { isDarkMode, primaryColor } = useSelector((state: any) => state.theme);
  const navigate = useNavigate();
  const goToContact = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => navigate('/contact'), 300); };

  const features = [
    {
      title: 'Manual Testing',
      description:
        'Thorough exploratory and scripted manual testing to catch usability issues, edge cases, and defects that automated scripts can miss.',
      icon: <FaClipboardCheck />,
      technologies: ['Test Cases', 'Exploratory Testing', 'UAT', 'Usability Testing', 'Smoke Testing', 'Sanity Testing'],
    },
    {
      title: 'Automation Testing',
      description:
        'Scalable, maintainable test automation frameworks using industry-leading tools to accelerate release cycles and increase coverage.',
      icon: <FaCogs />,
      technologies: ['Selenium', 'Cypress', 'Playwright', 'TestNG', 'JUnit', 'pytest'],
    },
    {
      title: 'API Testing',
      description:
        'Comprehensive validation of REST, SOAP, and GraphQL APIs — covering functional correctness, schema validation, and security.',
      icon: <FaPlug />,
      technologies: ['Postman', 'REST Assured', 'Karate', 'Newman', 'SoapUI', 'GraphQL Testing'],
    },
    {
      title: 'Performance Testing',
      description:
        'Load, stress, and endurance testing to ensure your application performs reliably under peak and sustained traffic conditions.',
      icon: <FaTachometerAlt />,
      technologies: ['JMeter', 'k6', 'Gatling', 'Locust', 'BlazeMeter', 'Grafana'],
    },
    {
      title: 'Security Testing',
      description:
        'Vulnerability assessments and penetration testing to identify and remediate security risks before they reach production.',
      icon: <FaShieldAlt />,
      technologies: ['OWASP ZAP', 'Burp Suite', 'SQL Injection', 'XSS Testing', 'SAST', 'DAST'],
    },
    {
      title: 'Mobile App Testing',
      description:
        'End-to-end testing of iOS and Android applications across real devices and emulators for functionality, performance, and UX.',
      icon: <FaMobileAlt />,
      technologies: ['Appium', 'XCUITest', 'Espresso', 'BrowserStack', 'AWS Device Farm', 'TestFlight'],
    },
    {
      title: 'Regression & Smoke Testing',
      description:
        'Rapid regression suites and smoke test packs that verify core functionality and catch regressions with every release.',
      icon: <FaRedo />,
      technologies: ['Regression Suites', 'Smoke Packs', 'Build Verification', 'Delta Testing', 'Risk-Based Testing'],
    },
    {
      title: 'CI/CD Pipeline Testing',
      description:
        'Seamless integration of automated quality gates into your CI/CD pipelines to shift testing left and deliver with confidence.',
      icon: <FaCodeBranch />,
      technologies: ['GitHub Actions', 'Jenkins', 'GitLab CI', 'Azure DevOps', 'CircleCI', 'ArgoCD'],
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Test Planning',
      description:
        'Analysing requirements, defining scope, risk-based prioritisation, and building the overall test strategy.',
      duration: '1–2 weeks',
    },
    {
      step: '02',
      title: 'Test Design',
      description:
        'Authoring test cases, automation scripts, and data sets aligned to acceptance criteria and user stories.',
      duration: '2–4 weeks',
    },
    {
      step: '03',
      title: 'Test Execution',
      description:
        'Running manual and automated tests across environments, logging defects, and tracking metrics in real time.',
      duration: 'Sprint-based',
    },
    {
      step: '04',
      title: 'Reporting & Sign-off',
      description:
        'Detailed quality reports, coverage dashboards, and a formal go/no-go recommendation before every release.',
      duration: 'Per release',
    },
  ];

  const offerings = [
    {
      title: 'Functional Quality Assurance',
      description: 'Complete functional testing coverage from unit level through to end-to-end system validation.',
      features: [
        'Requirements traceability',
        'Black-box & white-box testing',
        'Cross-browser compatibility',
        'Accessibility (WCAG) testing',
      ],
    },
    {
      title: 'Non-Functional Testing',
      description:
        'Performance, security, and reliability testing to validate the quality attributes that matter most to your users.',
      features: [
        'Load & stress benchmarks',
        'Security vulnerability scans',
        'Scalability analysis',
        'Reliability & failover testing',
      ],
    },
    {
      title: 'Test Automation Setup',
      description:
        'Full framework setup, CI integration, and knowledge transfer so your team can scale test automation independently.',
      features: [
        'Framework architecture',
        'Page Object Model patterns',
        'CI/CD integration',
        'Reporting & dashboards',
      ],
    },
  ];

  const serviceData = {
    name: 'QA & Testing Services',
    description:
      'End-to-end quality assurance services covering manual testing, automation, API, performance, security, mobile, and CI/CD pipeline testing.',
    features: features.map((f) => f.title),
    technologies: ['Selenium', 'Cypress', 'Playwright', 'Postman', 'JMeter', 'k6', 'Appium', 'OWASP ZAP'],
    benefits: ['Faster Release Cycles', 'Reduced Defect Leakage', 'Higher Code Coverage', 'Confident Deployments'],
    priceRange: '$$',
  };

  const structuredData = [
    generateServiceStructuredData(serviceData),
    generateWebPageStructuredData({
      name: 'QA & Software Testing Services | KGSTechway',
      description:
        'Professional QA and software testing services including manual, automation, API, performance, security, and mobile app testing.',
      url: 'https://kgstechway.com/services/qa-testing',
      breadcrumbs: [
        { name: 'Home', url: 'https://kgstechway.com' },
        { name: 'Services', url: 'https://kgstechway.com/services' },
        { name: 'QA & Testing', url: 'https://kgstechway.com/services/qa-testing' },
      ],
    }),
  ];

  return (
    <div className={`service-detail-page ${isDarkMode ? 'dark' : 'light'}`}>
      <SEO structuredData={structuredData} />

      {/* Hero */}
      <section className="service-hero">
        <Container>
          <Row className="align-items-center py-5">
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Link to="/services" className="back-link mb-3 d-inline-flex align-items-center">
                  <FaArrowLeft className="me-2" />
                  Back to Services
                </Link>

                <div className="service-icon-large mb-4" style={{ background: QA_GRADIENT }}>
                  <FaBug />
                </div>

                <h1 className="hero-title">
                  QA &amp; Testing
                  <span className="gradient-text"> Services</span>
                </h1>

                <p className="hero-description">
                  Ship with confidence. Our end-to-end quality assurance services — from manual
                  exploratory testing to fully automated CI/CD pipelines — ensure every release
                  meets the highest standards of functionality, performance, and security.
                </p>

                <div className="hero-actions">
                  <Button size="lg" className="primary-btn me-3" onClick={goToContact}>
                    Start QA Engagement
                  </Button>
                  <Button variant="outline-primary" size="lg" onClick={goToContact}>
                    Request a Test Audit
                  </Button>
                </div>
              </motion.div>
            </Col>

            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hero-visual"
              >
                <div className="tech-showcase">
                  <div className="hero-dashboard">
                    <div className="dashboard-header">
                      <div className="dashboard-header-left">
                        <FaBug className="dashboard-header-icon" style={{ color: QA_COLOR }} />
                        QA & Testing Command Centre
                      </div>
                      <div className="dashboard-live-badge">
                        <span className="live-dot" /> TESTING
                      </div>
                    </div>
                    <div className="dashboard-metrics">
                      <div className="metric-tile">
                        <div className="metric-icon-box" style={{ background: `${QA_COLOR}22`, color: QA_COLOR }}><FaClipboardCheck /></div>
                        <span className="metric-value">98%</span>
                        <span className="metric-label">Bug Detection Rate</span>
                        <span className="metric-sub">Before production</span>
                      </div>
                      <div className="metric-tile">
                        <div className="metric-icon-box" style={{ background: 'rgba(102,126,234,0.18)', color: '#667eea' }}><FaCogs /></div>
                        <span className="metric-value">Auto</span>
                        <span className="metric-label">CI/CD Pipelines</span>
                        <span className="metric-sub">Selenium, Playwright</span>
                      </div>
                      <div className="metric-tile">
                        <div className="metric-icon-box" style={{ background: 'rgba(79,172,254,0.18)', color: '#4facfe' }}><FaPlug /></div>
                        <span className="metric-value">API</span>
                        <span className="metric-label">Contract Testing</span>
                        <span className="metric-sub">Postman, RestAssured</span>
                      </div>
                      <div className="metric-tile">
                        <div className="metric-icon-box" style={{ background: 'rgba(250,112,154,0.18)', color: '#fa709a' }}><FaTachometerAlt /></div>
                        <span className="metric-value">Perf</span>
                        <span className="metric-label">Load Testing</span>
                        <span className="metric-sub">JMeter, k6, Gatling</span>
                      </div>
                    </div>
                    <div className="dashboard-footer">
                      <span className="footer-label">Stack:</span>
                      {['Selenium', 'Playwright', 'Cypress', 'JMeter', 'Postman', 'k6'].map(t => (
                        <span key={t} className="tech-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Service Categories */}
      <section className="features-section py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">QA Service Categories</h2>
            <p className="section-description">
              A complete spectrum of testing disciplines to protect quality at every layer of your stack
            </p>
          </motion.div>

          <Row>
            {features.map((feature, index) => (
              <Col lg={6} key={index} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`feature-card h-100 ${isDarkMode ? 'dark' : 'light'}`}>
                    <Card.Body>
                      <div className="feature-header">
                        <div className="feature-icon" style={{ color: QA_COLOR }}>
                          {feature.icon}
                        </div>
                        <h4 className="feature-title">{feature.title}</h4>
                      </div>
                      <p className="feature-description">{feature.description}</p>
                      <div className="feature-technologies">
                        {feature.technologies.map((tech, techIndex) => (
                          tech === 'Playwright' ? (
                            <span
                              key={techIndex}
                              className="me-2 mb-2 d-inline-flex align-items-center gap-1"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                background: 'linear-gradient(135deg, #00C896, #007A5E)',
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: '0.78rem',
                                padding: '0.3rem 0.75rem',
                                borderRadius: '8px',
                                letterSpacing: '0.04em',
                                boxShadow: '0 0 10px rgba(0,200,150,0.4)',
                                border: '1.5px solid rgba(0,200,150,0.6)',
                              }}
                            >
                              ⚡ Playwright
                            </span>
                          ) : (
                            <Badge key={techIndex} bg="success" className="me-2 mb-2">
                              {tech}
                            </Badge>
                          )
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Playwright Spotlight */}
      <section className="py-5" style={{ background: isDarkMode ? 'linear-gradient(135deg, rgba(0,40,30,0.95) 0%, rgba(0,60,45,0.9) 100%)' : 'linear-gradient(135deg, #e8fff8 0%, #d0f5ea 100%)', borderTop: '2px solid rgba(0,200,150,0.3)', borderBottom: '2px solid rgba(0,200,150,0.3)' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Row className="align-items-center g-4">
              <Col lg={5} className="text-center text-lg-start">
                <div className="mb-3" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'linear-gradient(135deg, #00C896, #007A5E)', borderRadius: '16px', padding: '0.5rem 1.25rem', boxShadow: '0 0 24px rgba(0,200,150,0.5)' }}>
                  <span style={{ fontSize: '1.4rem' }}>⚡</span>
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.08em' }}>OUR PRIMARY AUTOMATION TOOL</span>
                </div>
                <h2 style={{ color: isDarkMode ? '#eef7f4' : '#1a3a2e', fontWeight: 800, fontSize: '2.5rem', lineHeight: 1.15, marginTop: '1rem' }}>
                  Powered by <span style={{ background: 'linear-gradient(135deg, #00C896, #00e6b0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Playwright</span>
                </h2>
                <p style={{ color: isDarkMode ? '#b8d0ca' : '#2d5a47', fontSize: '1.05rem', marginTop: '1rem', lineHeight: 1.7 }}>
                  We've standardized on Playwright as our primary end-to-end testing framework —
                  the gold standard for modern web automation. Faster, more reliable, and built
                  for the complexity of today's web apps.
                </p>
                <div className="mt-4 d-flex flex-wrap gap-2">
                  {['Cross-browser', 'Auto-wait', 'Parallel Execution', 'Visual Testing', 'API Testing', 'CI/CD Ready'].map(tag => (
                    <span key={tag} style={{ background: 'rgba(0,200,150,0.15)', color: isDarkMode ? '#00e6b0' : '#007A5E', border: '1px solid rgba(0,200,150,0.4)', borderRadius: '20px', padding: '0.25rem 0.75rem', fontSize: '0.82rem', fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              </Col>
              <Col lg={7}>
                <Row className="g-3">
                  {[
                    { icon: '🌐', title: 'All Browsers, One Tool', desc: 'Chromium, Firefox, and WebKit covered natively — no plugin mess, no flaky cross-browser gaps.' },
                    { icon: '⚡', title: 'Auto-Wait & Retry', desc: 'Playwright waits for elements intelligently, eliminating brittle sleep/delay hacks in test scripts.' },
                    { icon: '🔁', title: 'Parallel Test Execution', desc: 'Run full test suites in parallel across multiple workers and shards — ship faster with confidence.' },
                    { icon: '📸', title: 'Visual Regression', desc: 'Pixel-perfect screenshot comparison to catch unintended UI changes before users do.' },
                    { icon: '🔌', title: 'API + UI in One', desc: 'Test REST/GraphQL APIs and UI flows in the same test — real end-to-end coverage.' },
                    { icon: '🚀', title: 'CI/CD First', desc: 'First-class Docker, GitHub Actions, and Jenkins support. Runs headless anywhere, zero config.' },
                  ].map((item, i) => (
                    <Col xs={12} sm={6} key={i}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        viewport={{ once: true }}
                        style={{
                          background: isDarkMode ? 'rgba(0,200,150,0.08)' : 'rgba(255,255,255,0.8)',
                          border: '1px solid rgba(0,200,150,0.25)',
                          borderRadius: '12px',
                          padding: '1rem 1.1rem',
                          height: '100%',
                          boxShadow: isDarkMode ? '0 2px 12px rgba(0,200,150,0.1)' : '0 2px 12px rgba(0,0,0,0.06)',
                        }}
                      >
                        <div style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>{item.icon}</div>
                        <div style={{ color: isDarkMode ? '#00e6b0' : '#007A5E', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{item.title}</div>
                        <div style={{ color: isDarkMode ? '#b8d0ca' : '#2d5a47', fontSize: '0.82rem', lineHeight: 1.5 }}>{item.desc}</div>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Service Offerings */}
      <section className="py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Service Offerings</h2>
            <p className="section-description">
              Structured QA packages tailored to your team's size, tech stack, and release cadence
            </p>
          </motion.div>

          <Row>
            {offerings.map((offering, index) => (
              <Col lg={4} key={index} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`feature-card h-100 ${isDarkMode ? 'dark' : 'light'}`}>
                    <Card.Body>
                      <h5 className="mb-3">{offering.title}</h5>
                      <p className="mb-3">{offering.description}</p>
                      <div>
                        {offering.features.map((item, itemIndex) => (
                          <div key={itemIndex} className="d-flex align-items-center mb-2">
                            <FaCheckCircle className="me-2 flex-shrink-0" style={{ color: primaryColor }} />
                            <small>{item}</small>
                          </div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testing Process */}
      <section className="process-section py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Our Testing Process</h2>
            <p className="section-description">
              A repeatable, metrics-driven methodology that fits inside any agile or waterfall workflow
            </p>
          </motion.div>

          <Row>
            {process.map((step, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="process-step"
                >
                  <div className="step-number" style={{ backgroundColor: QA_COLOR }}>
                    {step.step}
                  </div>
                  <div className="step-content">
                    <h5 className="step-title">{step.title}</h5>
                    <p className="step-description">{step.description}</p>
                    <div className="step-duration">
                      <FaClock className="me-1" />
                      {step.duration}
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="cta-section py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className={`cta-card ${isDarkMode ? 'dark' : 'light'}`}>
              <Card.Body className="py-5">
                <h3 className="cta-title">Ready to Elevate Your Quality?</h3>
                <p className="cta-description">
                  Let's build a QA strategy that catches more bugs, ships faster, and scales with your team.
                </p>
                <div className="cta-actions">
                  <Button size="lg" className="primary-btn me-3" onClick={goToContact}>
                    Start QA Engagement
                  </Button>
                  <Button variant="outline-primary" size="lg" onClick={goToContact}>
                    Request a Test Audit
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default QAServicesPage;
