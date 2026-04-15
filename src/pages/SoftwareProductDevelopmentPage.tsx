import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaCode, 
  FaArrowLeft, 
  FaCogs, 
  FaRocket,
  FaChartLine,
  FaClock
} from 'react-icons/fa';
import SEO from '../components/SEO';
import { generateServiceStructuredData, generateWebPageStructuredData } from '../utils/seoUtils';
import './ServiceDetailPage.css';

const SoftwareProductDevelopmentPage: React.FC = () => {
  const { isDarkMode, primaryColor } = useSelector((state: any) => state.theme);
  const navigate = useNavigate();
  const goToContact = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => navigate('/contact'), 300); };

  const features = [
    {
      title: 'Full-Stack Development',
      description: 'Complete front-end and back-end development using modern technologies like React, Node.js, Python, and .NET.',
      icon: <FaCode />,
      technologies: ['React', 'Angular', 'Vue.js', 'Node.js', 'Python', '.NET', 'Django', 'Express.js']
    },
    {
      title: 'Product Architecture',
      description: 'Scalable and maintainable architecture design that grows with your business needs.',
      icon: <FaCogs />,
      technologies: ['Microservices', 'API Design', 'Database Design', 'System Architecture', 'Cloud Architecture']
    },
    {
      title: 'Legacy System Modernization',
      description: 'Transform outdated systems into modern, efficient solutions without disrupting business operations.',
      icon: <FaRocket />,
      technologies: ['System Migration', 'API Integration', 'Database Migration', 'Code Refactoring']
    },
    {
      title: 'Microservices Architecture',
      description: 'Design and implement distributed systems that are scalable, resilient, and maintainable.',
      icon: <FaChartLine />,
      technologies: ['Docker', 'Kubernetes', 'API Gateway', 'Service Mesh', 'Event-Driven Architecture']
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'Understanding your business requirements, goals, and technical constraints.',
      duration: '1-2 weeks'
    },
    {
      step: '02',
      title: 'Design & Architecture',
      description: 'Creating detailed system architecture, UI/UX designs, and technical specifications.',
      duration: '2-3 weeks'
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'Agile development with continuous testing, code reviews, and quality assurance.',
      duration: '8-16 weeks'
    },
    {
      step: '04',
      title: 'Deployment & Support',
      description: 'Production deployment with monitoring, maintenance, and ongoing support.',
      duration: 'Ongoing'
    }
  ];

//   const stats = [
//     { label: 'Projects Delivered', value: '200+', icon: <FaRocket /> },
//     { label: 'Happy Clients', value: '150+', icon: <FaUsers /> },
//     { label: 'Years Experience', value: '5+', icon: <FaClock /> },
//     { label: 'Success Rate', value: '98%', icon: <FaChartLine /> }
//   ];

  const serviceData = {
    name: 'Software Product Development',
    description: 'End-to-end software product development from concept to deployment using modern technologies and best practices.',
    features: features.map(f => f.title),
    technologies: ['React', 'Node.js', 'Python', '.NET', 'Django', 'Express.js', 'Microservices', 'Docker', 'Kubernetes'],
    benefits: ['Scalable Architecture', 'Modern Technologies', 'Agile Development', 'Quality Assurance', 'Ongoing Support'],
    priceRange: '$$$'
  };

  const structuredData = [
    generateServiceStructuredData(serviceData),
    generateWebPageStructuredData({
      name: 'Software Product Development Services',
      description: 'Professional software product development services including full-stack development, architecture design, and legacy system modernization.',
      url: 'https://kgstechway.com/services/software-development',
      breadcrumbs: [
        { name: 'Home', url: 'https://kgstechway.com' },
        { name: 'Services', url: 'https://kgstechway.com/services' },
        { name: 'Software Development', url: 'https://kgstechway.com/services/software-development' }
      ]
    })
  ];

  return (
    <div className={`service-detail-page ${isDarkMode ? 'dark' : 'light'}`}>
      <SEO structuredData={structuredData} />
      {/* Hero Section */}
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
                
                <div className="service-icon-large mb-4">
                  <FaCode />
                </div>
                
                <h1 className="hero-title">
                  Software Product Development
                  <span className="gradient-text"> & Services</span>
                </h1>
                
                <p className="hero-description">
                  Transform your ideas into powerful, scalable software products with our comprehensive 
                  development services. From concept to deployment, we deliver robust solutions that 
                  drive business growth and user engagement.
                </p>

                {/* <div className="hero-stats">
                  {stats.map((stat, index) => (
                    <div key={index} className="stat-item">
                      <div className="stat-icon">{stat.icon}</div>
                      <div className="stat-content">
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div> */}

                <div className="hero-actions">
                  <Button size="lg" className="primary-btn me-3" onClick={goToContact}>
                    Get Started
                  </Button>
                  <Button variant="outline-primary" size="lg" onClick={goToContact}>
                    View Portfolio
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
                        <FaCode className="dashboard-header-icon" style={{ color: '#667eea' }} />
                        Full-Stack Development
                      </div>
                      <div className="dashboard-live-badge">
                        <span className="live-dot" /> ACTIVE
                      </div>
                    </div>
                    <div className="dashboard-metrics">
                      <div className="metric-tile">
                        <div className="metric-icon-box" style={{ background: 'rgba(102,126,234,0.18)', color: '#667eea' }}><FaRocket /></div>
                        <span className="metric-value">50+</span>
                        <span className="metric-label">Projects Shipped</span>
                        <span className="metric-sub">On time & on budget</span>
                      </div>
                      <div className="metric-tile">
                        <div className="metric-icon-box" style={{ background: 'rgba(67,233,123,0.18)', color: '#43e97b' }}><FaChartLine /></div>
                        <span className="metric-value">99.9%</span>
                        <span className="metric-label">Uptime SLA</span>
                        <span className="metric-sub">Production reliability</span>
                      </div>
                      <div className="metric-tile">
                        <div className="metric-icon-box" style={{ background: 'rgba(250,112,154,0.18)', color: '#fa709a' }}><FaCogs /></div>
                        <span className="metric-value">2×</span>
                        <span className="metric-label">Faster Delivery</span>
                        <span className="metric-sub">Agile methodology</span>
                      </div>
                      <div className="metric-tile">
                        <div className="metric-icon-box" style={{ background: 'rgba(79,172,254,0.18)', color: '#4facfe' }}><FaClock /></div>
                        <span className="metric-value">5+</span>
                        <span className="metric-label">Years Experience</span>
                        <span className="metric-sub">Enterprise-grade</span>
                      </div>
                    </div>
                    <div className="dashboard-footer">
                      <span className="footer-label">Stack:</span>
                      {['React', 'Node.js', 'Python', '.NET', 'Vue.js', 'PostgreSQL'].map(t => (
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

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Our Core Capabilities</h2>
            <p className="section-description">
              Comprehensive software development services to bring your vision to life
            </p>
          </motion.div>

          <Row>
            {features.map((feature, index) => (
              <Col lg={6} key={index} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`feature-card h-100 ${isDarkMode ? 'dark' : 'light'}`}>
                    <Card.Body>
                      <div className="feature-header">
                        <div className="feature-icon" style={{ color: primaryColor }}>
                          {feature.icon}
                        </div>
                        <h4 className="feature-title">{feature.title}</h4>
                      </div>
                      <p className="feature-description">{feature.description}</p>
                      <div className="feature-technologies">
                        {feature.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} bg="primary" className="me-2 mb-2">
                            {tech}
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

      {/* Process Section */}
      <section className="process-section py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Our Development Process</h2>
            <p className="section-description">
              A proven methodology that ensures successful project delivery
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
                  <div className="step-number" style={{ backgroundColor: primaryColor }}>
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

      {/* CTA Section */}
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
                <h3 className="cta-title">Ready to Build Your Software Product?</h3>
                <p className="cta-description">
                  Let's discuss your project requirements and create a solution that drives your business forward.
                </p>
                <div className="cta-actions">
                  <Button size="lg" className="primary-btn me-3" onClick={goToContact}>
                    Start Your Project
                  </Button>
                  <Button variant="outline-primary" size="lg" onClick={goToContact}>
                    Schedule Consultation
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

export default SoftwareProductDevelopmentPage;