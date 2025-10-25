import React, { memo, useMemo } from 'react';
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

const AboutSection = memo(() => {
  const { isDarkMode, primaryColor } = useSelector((state: any) => state.theme);

  // Memoize expensive data arrays to prevent unnecessary re-renders
  const stats = useMemo(() => [
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
  ], []);

  const values = useMemo(() => [
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
  ], []);

  const technologies = useMemo(() => [
    { 
      name: 'Full-Stack Development', 
      level: 95,
      description: 'React, Angular, Vue.js, Node.js, Python, .NET',
      icon: '💻'
    },
    { 
      name: 'AI & Machine Learning', 
      level: 92,
      description: 'TensorFlow, PyTorch, OpenAI GPT, Computer Vision',
      icon: '🤖'
    },
    { 
      name: 'Cloud Architecture', 
      level: 90,
      description: 'AWS, Azure, GCP, Docker, Kubernetes, Microservices',
      icon: '☁️'
    },
    { 
      name: 'Enterprise Solutions', 
      level: 88,
      description: 'CRM/ERP, Salesforce, SAP, Microsoft Dynamics',
      icon: '🏢'
    },
    { 
      name: 'Agentic AI Systems', 
      level: 89,
      description: 'LangChain, AutoGen, CrewAI, Multi-Agent Systems',
      icon: '🧠'
    },
    { 
      name: 'Database & Analytics', 
      level: 87,
      description: 'PostgreSQL, MongoDB, BigQuery, Data Warehousing',
      icon: '📊'
    },
    { 
      name: 'DevOps & Security', 
      level: 85,
      description: 'CI/CD, GitLab, Jenkins, Cybersecurity, SOC Compliance',
      icon: '🔒'
    },
    { 
      name: 'Mobile Development', 
      level: 84,
      description: 'React Native, Flutter, iOS, Android, Progressive Web Apps',
      icon: '📱'
    }
  ], []);

  const achievements = useMemo(() => [
    '99.9% Client Satisfaction Rate',
    '24/7 Technical Support Coverage', 
    'Agile Development Methodology',
    'Continuous Integration & Deployment',
    'ISO 27001 Security Standards Compliant',
    'AWS & Azure Certified Solutions'
  ], []);

  const certifications = useMemo(() => [
    {
      title: 'AWS Solutions Architect',
      description: 'Professional cloud architecture and deployment',
      icon: '☁️',
      color: '#ff9900'
    },
    {
      title: 'Microsoft Azure Expert',
      description: 'Enterprise cloud solutions and AI services',
      icon: '🔷',
      color: '#0078d4'
    },
    {
      title: 'Google Cloud Professional',
      description: 'ML, AI and data analytics platforms',
      icon: '🌟',
      color: '#4285f4'
    },
    {
      title: 'Certified Scrum Master',
      description: 'Agile project management and delivery',
      icon: '⚡',
      color: '#00a86b'
    },
    {
      title: 'Salesforce Certified',
      description: 'CRM implementation and customization',
      icon: '💼',
      color: '#00a1e0'
    },
    {
      title: 'AI/ML Specialist',
      description: 'TensorFlow and PyTorch expertise',
      icon: '🧠',
      color: '#ff6b6b'
    }
  ], []);



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
                      className="tech-item enhanced"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="tech-header">
                        <div className="tech-icon-name">
                          <span className="tech-emoji">{tech.icon}</span>
                          <span className="tech-name">{tech.name}</span>
                        </div>
                        <span className="tech-percentage">{tech.level}%</span>
                      </div>
                      <p className="tech-description">{tech.description}</p>
                      <ProgressBar
                        now={tech.level}
                        className="tech-progress"
                        style={{ 
                          '--progress-color': primaryColor,
                          height: '6px',
                          borderRadius: '3px'
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
                        {/* {stat.number} */}
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

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="certifications-section"
        >
          <div className="section-header text-center">
            <h3 className="certifications-title">Professional Certifications</h3>
            <p className="certifications-description">
              Our team holds industry-leading certifications ensuring expertise and quality delivery
            </p>
          </div>

          <Row>
            {certifications.map((cert, index) => (
              <Col lg={4} md={6} key={index} className="mb-4">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className={`certification-card h-100 ${isDarkMode ? 'dark' : 'light'}`}>
                    <div 
                      className="cert-icon"
                      style={{ backgroundColor: cert.color }}
                    >
                      <span className="cert-emoji">{cert.icon}</span>
                    </div>
                    <div className="cert-content">
                      <h6 className="cert-title">{cert.title}</h6>
                      <p className="cert-description">{cert.description}</p>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Team Expertise Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="team-expertise-section"
        >
          <div className="section-header text-center">
            <h3 className="team-title">Our Expert Team</h3>
            <p className="team-description">
              Talented professionals dedicated to delivering exceptional technology solutions
            </p>
          </div>

          <Row>
            {teamExpertise.map((team, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className={`team-card h-100 ${isDarkMode ? 'dark' : 'light'}`}>
                    <div className="team-icon">
                      <span className="team-emoji">{team.icon}</span>
                    </div>
                    <div className="team-content">
                      <div className="team-count" style={{ color: primaryColor }}>
                        {team.count}
                      </div>
                      <div className="team-area">{team.area}</div>
                      <div className="team-description">{team.description}</div>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div> */}

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
});

AboutSection.displayName = 'AboutSection';
export default AboutSection;