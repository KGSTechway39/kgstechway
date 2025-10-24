import React from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  FaUsers, 
  FaTrophy, 
  FaGlobeAmericas, 
  FaClock,
  FaRocket,
  FaLightbulb,
  FaHandshake,
  FaShieldAlt,
  FaCheckCircle
} from 'react-icons/fa';
import './AboutSection.css';

const AboutSection = () => {
  const { isDarkMode, primaryColor } = useSelector((state: any) => state.theme);

  const stats = [
    {
      icon: <FaUsers />,
      number: '500+',
      label: 'Projects Delivered',
      description: 'Successfully completed projects across various industries',
      color: '#0066cc'
    },
    {
      icon: <FaTrophy />,
      number: '50+',
      label: 'Happy Clients',
      description: 'Satisfied clients who trust our expertise',
      color: '#ff6b35'
    },
    {
      icon: <FaGlobeAmericas />,
      number: '15+',
      label: 'Countries Served',
      description: 'Global reach with localized solutions',
      color: '#28a745'
    },
    {
      icon: <FaClock />,
      number: '5+',
      label: 'Years Experience',
      description: 'Proven track record in technology solutions',
      color: '#6f42c1'
    }
  ];

  const values = [
    {
      icon: <FaRocket />,
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and innovative approaches to solve complex business challenges.',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: <FaLightbulb />,
      title: 'Excellence',
      description: 'We strive for perfection in every project, delivering solutions that exceed expectations.',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: <FaHandshake />,
      title: 'Partnership',
      description: 'We build long-term relationships based on trust, transparency, and mutual success.',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Reliability',
      description: 'We ensure robust, secure, and scalable solutions that you can depend on.',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  const technologies = [
    { name: 'Software Development', level: 95 },
    { name: 'AI Solutions', level: 92 },
    { name: 'CRM/ERP Systems', level: 90 },
    { name: 'Agentic AI', level: 88 },
    { name: 'Cloud Platforms', level: 85 },
    { name: 'Machine Learning', level: 87 }
  ];

  const achievements = [
    '500+ Successful Projects Delivered',
    '99.9% Client Satisfaction Rate',
    'ISO 27001 Certified Security Standards',
    '24/7 Technical Support Coverage',
    'Agile Development Methodology',
    'Continuous Integration & Deployment'
  ];

  return (
    <section id="about" className={`about-section ${isDarkMode ? 'dark' : 'light'}`}>
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-header text-center"
        >
          <div className="section-badge">
            <FaUsers className="me-2" />
            About KGSTechway
          </div>
          <h2 className="section-title">
            Empowering Businesses Through
            <span className="gradient-text"> Technology Excellence</span>
          </h2>
          <p className="section-description">
            We specialize in Software Product Development, AI Solutions, CRM/ERP Services, 
            and Agentic AI Solutions, helping businesses transform through innovative technology.
          </p>
        </motion.div>

        {/* Company Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="company-story"
        >
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="story-content">
                <h3 className="story-title">Our Journey</h3>
                <p className="story-text">
                  KGSTechway specializes in Software Product Development/Services, AI Solutions, 
                  CRM/ERP Services, and cutting-edge Agentic AI Solutions. We bridge the gap between 
                  innovative technology and practical business applications.
                </p>
                <p className="story-text">
                  Our expert team delivers comprehensive solutions from custom software development 
                  to intelligent AI systems that automate and optimize business processes. 
                  We believe in building long-term partnerships that evolve with our clients' growth.
                </p>
                
                <div className="achievements-list">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="achievement-item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <FaCheckCircle className="achievement-icon" style={{ color: primaryColor }} />
                      <span>{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="technologies-section">
                <h4 className="tech-title">Our Technical Expertise</h4>
                <div className="technologies-grid">
                  {technologies.map((tech, index) => (
                    <motion.div
                      key={index}
                      className="tech-item"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="tech-header">
                        <span className="tech-name">{tech.name}</span>
                        <span className="tech-percentage">{tech.level}%</span>
                      </div>
                      <ProgressBar
                        now={tech.level}
                        className="tech-progress"
                        style={{ 
                          '--progress-color': primaryColor,
                          height: '8px',
                          borderRadius: '4px'
                        } as React.CSSProperties}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="stats-section"
        >
          <Row>
            {stats.map((stat, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className={`stat-card h-100 ${isDarkMode ? 'dark' : 'light'}`}>
                    <div 
                      className="stat-icon"
                      style={{ color: stat.color }}
                    >
                      {stat.icon}
                    </div>
                    <div className="stat-content">
                      <div className="stat-number" style={{ color: stat.color }}>
                        {stat.number}
                      </div>
                      <div className="stat-label">{stat.label}</div>
                      <div className="stat-description">{stat.description}</div>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="values-section"
        >
          <div className="section-header text-center">
            <h3 className="values-title">Our Core Values</h3>
            <p className="values-description">
              The principles that guide our work and define our commitment to excellence
            </p>
          </div>

          <Row>
            {values.map((value, index) => (
              <Col lg={6} key={index} className="mb-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className={`value-card h-100 ${isDarkMode ? 'dark' : 'light'}`}>
                    <div 
                      className="value-icon"
                      style={{ background: value.gradient }}
                    >
                      {value.icon}
                    </div>
                    <div className="value-content">
                      <h5 className="value-title">{value.title}</h5>
                      <p className="value-description">{value.description}</p>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="about-cta"
        >
          <div className="cta-content text-center">
            <h3>Ready to Transform Your Business?</h3>
            <p>
              Let's discuss how our expertise can help you achieve your technology goals 
              and drive your business forward.
            </p>
            <motion.button
              className="cta-button"
              style={{ backgroundColor: primaryColor }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
            </motion.button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default AboutSection;