import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
  FaSearch,
  FaSitemap,
  FaCode,
  FaBug,
  FaRocket,
  FaLifeRing,
  FaHandshake,
} from 'react-icons/fa';
import './HowWeWorkSection.css';

const steps = [
  {
    number: 1,
    title: 'Discovery & Requirements',
    description: 'Understand your goals, users, and constraints before writing a single line of code.',
    icon: <FaSearch />,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    accentColor: '#667eea',
  },
  {
    number: 2,
    title: 'Planning & Architecture',
    description: 'Define the technical roadmap, system design, and sprint plan aligned with your timeline.',
    icon: <FaSitemap />,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    accentColor: '#4facfe',
  },
  {
    number: 3,
    title: 'Development & Sprints',
    description: 'Build iteratively in two-week sprints with daily standups and continuous client visibility.',
    icon: <FaCode />,
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    accentColor: '#43e97b',
  },
  {
    number: 4,
    title: 'QA & Quality Assurance',
    description: 'Automated and manual testing at every sprint gate — nothing ships without a quality sign-off.',
    icon: <FaBug />,
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    accentColor: '#11998e',
  },
  {
    number: 5,
    title: 'Deployment & Launch',
    description: 'Zero-downtime production releases through CI/CD pipelines with full rollback capability.',
    icon: <FaRocket />,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    accentColor: '#f093fb',
  },
  {
    number: 6,
    title: 'Support & Maintenance',
    description: 'Proactive monitoring, bug fixes, and feature enhancements to keep your product healthy.',
    icon: <FaLifeRing />,
    gradient: 'linear-gradient(135deg, #4481eb 0%, #04befe 100%)',
    accentColor: '#4481eb',
  },
];

const HowWeWorkSection = () => {
  const { isDarkMode } = useSelector((state: any) => state.theme);

  return (
    <section id="how-we-work" className={`hww-section ${isDarkMode ? 'dark' : 'light'}`}>
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="hww-header text-center"
        >
          <div className="hww-badge">
            <FaHandshake className="me-2" />
            How We Work
          </div>
          <h2 className="hww-title">
            Our Engagement
            <span className="hww-gradient-text"> Process</span>
          </h2>
          <p className="hww-description">
            A proven six-step process that keeps you in control at every stage — from first conversation to long-term success.
          </p>
        </motion.div>

        {/* Step flow */}
        <div className="hww-steps-wrapper">
          {/* Connecting line — desktop only */}
          <div className="hww-connector" aria-hidden="true" />

          <Row className="hww-steps-row g-0">
            {steps.map((step, index) => (
              <Col lg={2} md={4} sm={6} xs={6} key={step.number} className="hww-step-col">
                <motion.div
                  className="hww-step"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Icon circle + number badge */}
                  <div className="hww-icon-wrap">
                    <motion.div
                      className="hww-icon-circle"
                      style={{ background: step.gradient }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {step.icon}
                    </motion.div>
                    <div
                      className="hww-step-badge"
                      style={{ color: step.accentColor, borderColor: `${step.accentColor}50` }}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Text */}
                  <h5 className="hww-step-title">{step.title}</h5>
                  <p className="hww-step-desc">{step.description}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default HowWeWorkSection;
