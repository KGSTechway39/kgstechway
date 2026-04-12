import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUsers,
  FaArrowLeft,
  FaDesktop,
  FaServer,
  FaCode,
  FaBug,
  FaCogs,
  FaRobot,
  FaTasks,
  FaClock,
  FaShieldAlt,
  FaExpandArrowsAlt,
  FaCheckCircle,
  FaCalendarCheck,
  FaHandshake,
} from 'react-icons/fa';
import {
  SiSlack,
  SiJira,
  SiConfluence,
  SiGithub,
  SiZoom,
} from 'react-icons/si';
import SEO from '../components/SEO';
import { generateServiceStructuredData, generateWebPageStructuredData } from '../utils/seoUtils';
import './ServiceDetailPage.css';
import './StaffAugmentationPage.css';

const STAFF_COLOR = '#f7971e';
const STAFF_GRADIENT = 'linear-gradient(135deg, #fc4a1a 0%, #f7971e 100%)';

const StaffAugmentationPage: React.FC = () => {
  const { isDarkMode, primaryColor } = useSelector((state: any) => state.theme);
  const navigate = useNavigate();

  const handleBookCall = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => navigate('/contact'), 300);
  };

  // ── Key highlights ────────────────────────────────────────────────
  const highlights = [
    {
      icon: <FaClock />,
      color: '#4facfe',
      title: '4–5 Hour Daily Overlap',
      value: 'US EST Aligned',
      description:
        'Our engineers work 9 am – 2 pm EST overlap every day — no async bottlenecks, real-time collaboration.',
    },
    {
      icon: <FaShieldAlt />,
      color: '#43e97b',
      title: 'NDA & IP Protection',
      value: 'Day-One Agreements',
      description:
        'Mutual NDAs and full IP assignment agreements signed before the first line of code is written.',
    },
    {
      icon: <FaExpandArrowsAlt />,
      color: STAFF_COLOR,
      title: 'Flexible Team Scaling',
      value: '1 → 10+ Engineers',
      description:
        'Start with a single specialist. Add roles within days — no long hiring cycles, no lock-in.',
    },
    {
      icon: <FaHandshake />,
      color: '#667eea',
      title: 'Monthly Rolling Contracts',
      value: 'No Long-term Lock-in',
      description:
        'Month-to-month billing with a 30-day notice period. Scale up, down, or pause as your roadmap changes.',
    },
  ];

  // ── Available roles ───────────────────────────────────────────────
  const roles = [
    {
      icon: <FaDesktop />,
      title: 'Frontend Developer',
      description: 'Pixel-perfect UI engineers who build fast, accessible, responsive interfaces.',
      skills: ['React', 'Angular', 'Vue.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
      icon: <FaServer />,
      title: 'Backend Developer',
      description: 'API and data-layer engineers who design scalable, secure server-side systems.',
      skills: ['Node.js', 'Python', 'Java', '.NET', 'Go', 'PostgreSQL / MongoDB'],
    },
    {
      icon: <FaCode />,
      title: 'Full Stack Developer',
      description: 'End-to-end engineers who own features from database schema to user interaction.',
      skills: ['React + Node.js', 'Next.js', 'GraphQL', 'REST APIs', 'Docker', 'CI/CD'],
    },
    {
      icon: <FaBug />,
      title: 'QA Engineer',
      description: 'Quality specialists who build automation frameworks and own release sign-off.',
      skills: ['Selenium', 'Cypress', 'Playwright', 'Postman', 'JMeter', 'GitHub Actions'],
    },
    {
      icon: <FaCogs />,
      title: 'DevOps Engineer',
      description: 'Platform engineers who build and maintain cloud infrastructure and deployment pipelines.',
      skills: ['AWS / Azure / GCP', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Prometheus'],
    },
    {
      icon: <FaRobot />,
      title: 'AI / ML Engineer',
      description: 'ML practitioners who design, train, and deploy models that power intelligent products.',
      skills: ['TensorFlow', 'PyTorch', 'LangChain', 'OpenAI APIs', 'RAG', 'Vector DBs'],
    },
    {
      icon: <FaTasks />,
      title: 'Project Manager',
      description: 'Certified PMs who run Agile sprints, de-risk delivery, and keep stakeholders aligned.',
      skills: ['Agile / Scrum', 'Jira', 'Confluence', 'Risk Management', 'Stakeholder Comms', 'OKRs'],
    },
  ];

  // ── Engagement process ────────────────────────────────────────────
  const process = [
    {
      step: '01',
      title: 'Discovery Call',
      description:
        'Share your team needs, tech stack, and timeline. We map requirements to the right talent profile in the first session.',
      duration: 'Day 1',
    },
    {
      step: '02',
      title: 'Candidate Shortlist',
      description:
        'We present three matched candidate profiles with CVs, assessments, and availability within 48 hours.',
      duration: '48 hours',
    },
    {
      step: '03',
      title: 'Interview & Selection',
      description:
        'Run your own technical interviews. You choose who joins your team — we handle contracts, onboarding, and HR.',
      duration: '3–5 days',
    },
    {
      step: '04',
      title: 'Ramp-up & Delivery',
      description:
        'Engineer joins your standups, tools, and repos on day one. Monthly reviews keep performance and expectations aligned.',
      duration: 'Day 7+',
    },
  ];

  // ── Collaboration tools ───────────────────────────────────────────
  const tools = [
    { name: 'Slack', icon: <SiSlack />, color: '#4a154b' },
    { name: 'Jira', icon: <SiJira />, color: '#0052cc' },
    { name: 'Confluence', icon: <SiConfluence />, color: '#0052cc' },
    { name: 'GitHub', icon: <SiGithub />, color: isDarkMode ? '#ffffff' : '#181717' },
    { name: 'Zoom', icon: <SiZoom />, color: '#2d8cff' },
  ];

  // ── SEO ───────────────────────────────────────────────────────────
  const serviceData = {
    name: 'Staff Augmentation & Dedicated Teams',
    description:
      'Dedicated developers, QA engineers, DevOps, and AI/ML specialists on monthly contracts with US timezone overlap, NDA protection, and flexible team scaling.',
    features: roles.map((r) => r.title),
    technologies: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'Selenium', 'TensorFlow'],
    benefits: ['Fast Hiring', 'Cost Efficiency', 'Timezone Aligned', 'Full IP Protection'],
    priceRange: '$$',
  };

  const structuredData = [
    generateServiceStructuredData(serviceData),
    generateWebPageStructuredData({
      name: 'Staff Augmentation & Dedicated Teams | KGSTechway',
      description:
        'Dedicated developers on monthly contracts: Frontend, Backend, Full Stack, QA, DevOps, AI/ML, and Project Managers with US EST timezone overlap.',
      url: 'https://kgstechway.com/services/staff-augmentation',
      breadcrumbs: [
        { name: 'Home', url: 'https://kgstechway.com' },
        { name: 'Services', url: 'https://kgstechway.com/services' },
        { name: 'Staff Augmentation', url: 'https://kgstechway.com/services/staff-augmentation' },
      ],
    }),
  ];

  return (
    <div className={`service-detail-page ${isDarkMode ? 'dark' : 'light'}`}>
      <SEO structuredData={structuredData} />

      {/* ── Hero ── */}
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

                <div className="service-icon-large mb-4" style={{ background: STAFF_GRADIENT }}>
                  <FaUsers />
                </div>

                <h1 className="hero-title">
                  Staff Augmentation
                  <span className="gradient-text"> &amp; Dedicated Teams</span>
                </h1>

                <p className="hero-description">
                  Extend your team with pre-vetted engineers who join your standups,
                  commit to your repos, and ship on your timeline — on monthly rolling
                  contracts with full NDA and IP protection from day one.
                </p>

                <div className="hero-actions">
                  <Button
                    size="lg"
                    className="primary-btn me-3"
                    onClick={handleBookCall}
                    aria-label="Book a free discovery call"
                  >
                    <FaCalendarCheck className="me-2" />
                    Book a Discovery Call
                  </Button>
                  <Button variant="outline-primary" size="lg" onClick={handleBookCall}>
                    View Engagement Models
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
                  <div className="floating-code-blocks">
                    {[
                      { emoji: '👨‍💻', label: 'Dev Ready' },
                      { emoji: '🕐', label: 'EST Overlap' },
                      { emoji: '🔒', label: 'NDA Signed' },
                      { emoji: '📈', label: 'Scale Fast' },
                    ].map(({ emoji, label }) => (
                      <div
                        key={label}
                        className="code-block"
                        style={{
                          color: STAFF_COLOR,
                          borderColor: `${STAFF_COLOR}40`,
                          background: `${STAFF_COLOR}15`,
                        }}
                      >
                        {emoji} {label}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── Key Highlights ── */}
      <section className="features-section py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Why Teams Choose Us</h2>
            <p className="section-description">
              The operational guarantees that make remote augmentation feel like an in-house hire
            </p>
          </motion.div>

          <Row>
            {highlights.map((h, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`feature-card h-100 staff-highlight-card ${isDarkMode ? 'dark' : 'light'}`}>
                    <Card.Body className="text-center p-4">
                      <div
                        className="staff-highlight-icon mx-auto mb-3"
                        style={{ background: `${h.color}18`, color: h.color }}
                      >
                        {h.icon}
                      </div>
                      <div className="staff-highlight-value" style={{ color: h.color }}>
                        {h.value}
                      </div>
                      <h5 className="staff-highlight-title">{h.title}</h5>
                      <p className="feature-description mb-0" style={{ fontSize: '0.9rem' }}>
                        {h.description}
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── Available Roles ── */}
      <section className="py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Available Roles</h2>
            <p className="section-description">
              Pre-vetted specialists across every layer of the modern software stack
            </p>
          </motion.div>

          <Row>
            {roles.map((role, index) => (
              <Col xl={4} lg={4} md={6} key={index} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`feature-card h-100 ${isDarkMode ? 'dark' : 'light'}`}>
                    <Card.Body>
                      <div className="feature-header">
                        <div className="feature-icon" style={{ color: STAFF_COLOR }}>
                          {role.icon}
                        </div>
                        <h4 className="feature-title">{role.title}</h4>
                      </div>
                      <p className="feature-description">{role.description}</p>
                      <div className="feature-technologies">
                        {role.skills.map((skill, i) => (
                          <Badge key={i} className="me-2 mb-2 staff-skill-badge">
                            {skill}
                          </Badge>
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

      {/* ── Collaboration Tools ── */}
      <section className="features-section py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Collaboration &amp; Communication</h2>
            <p className="section-description">
              Our engineers plug straight into your existing toolchain — zero workflow disruption
            </p>
          </motion.div>

          <Row className="justify-content-center">
            {tools.map((tool, index) => (
              <Col key={tool.name} xs={6} sm={4} md={3} lg={2} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  whileHover={{ y: -5, scale: 1.07 }}
                  viewport={{ once: true }}
                  className={`feature-card py-4 text-center ${isDarkMode ? 'dark' : 'light'}`}
                  style={{ cursor: 'default' }}
                >
                  <div style={{ fontSize: '2.2rem', color: tool.color, marginBottom: '0.5rem' }}>
                    {tool.icon}
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>{tool.name}</div>
                </motion.div>
              </Col>
            ))}
          </Row>

          {/* Timezone visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-4"
          >
            <Card className={`staff-tz-card ${isDarkMode ? 'dark' : 'light'}`}>
              <Card.Body>
                <Row className="align-items-center text-center">
                  <Col md={4} className="mb-3 mb-md-0">
                    <div className="staff-tz-zone">
                      <div className="staff-tz-flag">🇮🇳</div>
                      <div className="staff-tz-label">Our Team (IST)</div>
                      <div className="staff-tz-time" style={{ color: STAFF_COLOR }}>
                        7:30 pm – 12:30 am
                      </div>
                    </div>
                  </Col>
                  <Col md={4} className="mb-3 mb-md-0">
                    <div className="staff-tz-overlap">
                      <div className="staff-tz-overlap-badge" style={{ background: STAFF_GRADIENT }}>
                        <FaClock className="me-2" />
                        4–5 hrs Daily Overlap
                      </div>
                      <div className="staff-tz-overlap-sub">Live standups · Real-time reviews</div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="staff-tz-zone">
                      <div className="staff-tz-flag">🇺🇸</div>
                      <div className="staff-tz-label">Your Team (US EST)</div>
                      <div className="staff-tz-time" style={{ color: primaryColor }}>
                        9:00 am – 2:00 pm
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </motion.div>
        </Container>
      </section>

      {/* ── Engagement Process ── */}
      <section className="process-section py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Engagement Process</h2>
            <p className="section-description">
              From first conversation to productive engineer in under two weeks
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
                  <div className="step-number" style={{ backgroundColor: STAFF_COLOR }}>
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

      {/* ── What's included ── */}
      <section className="py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Every Engagement Includes</h2>
            <p className="section-description">
              No hidden extras — these come standard with every monthly contract
            </p>
          </motion.div>

          <Row className="justify-content-center">
            {[
              ['Dedicated resource — no time-sharing', 'NDA & IP assignment agreements', 'Weekly performance check-ins', 'Dedicated account manager'],
              ['Transparent daily reporting', 'Access to our full talent bench', 'Background-verified engineers', 'Replacement guarantee within 7 days'],
              ['Seamless tool & repo access', 'Agile/Scrum participation', 'Monthly billing with 30-day notice', 'Scale up / down anytime'],
            ].map((col, colIndex) => (
              <Col lg={4} md={6} key={colIndex} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: colIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`feature-card h-100 ${isDarkMode ? 'dark' : 'light'}`}>
                    <Card.Body>
                      {col.map((item, i) => (
                        <div key={i} className="d-flex align-items-start mb-3">
                          <FaCheckCircle
                            className="me-2 mt-1 flex-shrink-0"
                            style={{ color: STAFF_COLOR }}
                          />
                          <span style={{ fontSize: '0.92rem', lineHeight: 1.5 }}>{item}</span>
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── CTA ── */}
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
                <h3 className="cta-title">Ready to Extend Your Team?</h3>
                <p className="cta-description">
                  Book a free 30-minute discovery call. We'll match you with the right
                  engineers and send profiles within 48 hours — no commitment required.
                </p>
                <div className="cta-actions">
                  <Button
                    size="lg"
                    className="primary-btn me-3"
                    onClick={handleBookCall}
                  >
                    <FaCalendarCheck className="me-2" />
                    Book a Discovery Call
                  </Button>
                  <Button variant="outline-primary" size="lg" onClick={handleBookCall}>
                    Talk to Our Team
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

export default StaffAugmentationPage;
