import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaMobile, 
  FaArrowLeft,
  FaApple,
  FaReact,
  FaRocket,
  FaCode
} from 'react-icons/fa';
import './ServiceDetailPage.css';

const MobileDevelopmentPage: React.FC = () => {
  const { isDarkMode } = useSelector((state: any) => state.theme);
  const navigate = useNavigate();
  const goToContact = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => navigate('/contact'), 300); };

  const features = [
    {
      title: 'Cross-Platform Development',
      description: 'Build once, deploy everywhere with React Native and Flutter for consistent performance across iOS and Android.',
      icon: <FaReact />,
      technologies: ['React Native', 'Flutter', 'Xamarin', 'Ionic']
    },
    {
      title: 'Native App Development',
      description: 'Platform-specific applications leveraging native iOS and Android capabilities for optimal performance.',
      icon: <FaApple />,
      technologies: ['Swift', 'Kotlin', 'Xcode', 'Android Studio']
    },
    {
      title: 'Progressive Web Apps',
      description: 'Modern web applications that work offline and provide app-like experiences across all devices.',
      icon: <FaCode />,
      technologies: ['Service Workers', 'PWA', 'Offline Storage']
    },
    {
      title: 'Mobile Backend Services',
      description: 'Scalable backend infrastructure with APIs, real-time features, and cloud integration.',
      icon: <FaRocket />,
      technologies: ['Firebase', 'Node.js', 'GraphQL', 'REST APIs']
    }
  ];

//   const stats = [
//     { label: 'Apps Delivered', value: '150+', icon: <FaMobile /> },
//     { label: 'Development Time', value: '50%↓', icon: <FaClock /> },
//     { label: 'User Satisfaction', value: '96%', icon: <FaUsers /> },
//     { label: 'Performance', value: '3x', icon: <FaRocket /> }
//   ];

  return (
    <div className={`service-detail-page ${isDarkMode ? 'dark' : 'light'}`}>
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
                
                <div className="service-icon-large mb-4" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                  <FaMobile />
                </div>
                
                <h1 className="hero-title">
                  Mobile App
                  <span className="gradient-text"> Development</span>
                </h1>
                
                <p className="hero-description">
                  Create powerful, engaging mobile applications that deliver exceptional user experiences. 
                  From native iOS and Android apps to cross-platform solutions, we build mobile apps 
                  that drive business growth and user engagement.
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
                    Start Project
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
                        <FaMobile className="dashboard-header-icon" style={{ color: '#a8edea' }} />
                        Mobile Development Studio
                      </div>
                      <div className="dashboard-live-badge">
                        <span className="live-dot" /> BUILDING
                      </div>
                    </div>
                    <div className="dashboard-metrics">
                      <div className="metric-tile">
                        <div className="metric-icon-box" style={{ background: 'rgba(168,237,234,0.18)', color: '#a8edea' }}><FaApple /></div>
                        <span className="metric-value">iOS</span>
                        <span className="metric-label">Native Development</span>
                        <span className="metric-sub">Swift & SwiftUI</span>
                      </div>
                      <div className="metric-tile">
                        <div className="metric-icon-box" style={{ background: 'rgba(67,233,123,0.18)', color: '#43e97b' }}><FaCode /></div>
                        <span className="metric-value">Android</span>
                        <span className="metric-label">Native Development</span>
                        <span className="metric-sub">Kotlin & Jetpack</span>
                      </div>
                      <div className="metric-tile">
                        <div className="metric-icon-box" style={{ background: 'rgba(79,172,254,0.18)', color: '#4facfe' }}><FaReact /></div>
                        <span className="metric-value">RN</span>
                        <span className="metric-label">React Native</span>
                        <span className="metric-sub">Cross-platform apps</span>
                      </div>
                      <div className="metric-tile">
                        <div className="metric-icon-box" style={{ background: 'rgba(250,112,154,0.18)', color: '#fa709a' }}><FaRocket /></div>
                        <span className="metric-value">4.9★</span>
                        <span className="metric-label">App Store Rating</span>
                        <span className="metric-sub">Average client rating</span>
                      </div>
                    </div>
                    <div className="dashboard-footer">
                      <span className="footer-label">Stack:</span>
                      {['Swift', 'Kotlin', 'React Native', 'Flutter', 'Expo', 'Firebase'].map(t => (
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
            <h2 className="section-title">Mobile Development Capabilities</h2>
            <p className="section-description">
              Comprehensive mobile app development services across all platforms
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
                        <div className="feature-icon" style={{ color: '#f5576c' }}>
                          {feature.icon}
                        </div>
                        <h4 className="feature-title">{feature.title}</h4>
                      </div>
                      <p className="feature-description">{feature.description}</p>
                      <div className="feature-technologies">
                        {feature.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} bg="danger" className="me-2 mb-2">
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
                <h3 className="cta-title">Ready to Build Your Mobile App?</h3>
                <p className="cta-description">
                  Transform your ideas into powerful mobile applications that engage users and drive business growth.
                </p>
                <div className="cta-actions">
                  <Button size="lg" className="primary-btn me-3" onClick={goToContact}>
                    Start Project
                  </Button>
                  <Button variant="outline-primary" size="lg" onClick={goToContact}>
                    Get Quote
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

export default MobileDevelopmentPage;