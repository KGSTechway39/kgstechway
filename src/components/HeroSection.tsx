import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { FaArrowRight, FaPlay } from 'react-icons/fa';
import './HeroSection.css';

type RootState = {
  theme: {
    isDarkMode: boolean;
    primaryColor: string;
  };
};

const HeroSection = () => {
  const { isDarkMode, primaryColor } = useSelector((state: RootState) => state.theme);
  const [typedText, setTypedText] = useState('');
  
  const services = [
    'Software Product Development/Services',
    'AI Solutions',
    'CRM/ERP Services',
    'Agentic AI Solutions'
  ];

  useEffect(() => {
    let timeoutId: number;
    let charIndex = 0;
    let isDeleting = false;
    let currentServiceIndex = 0;

    const typeWriter = () => {
      const currentService = services[currentServiceIndex];
      
      if (!isDeleting) {
        // Typing phase
        if (charIndex <= currentService.length) {
          setTypedText(currentService.slice(0, charIndex));
          charIndex++;
          timeoutId = setTimeout(typeWriter, 100);
        } else {
          // Finished typing, wait then start deleting
          isDeleting = true;
          timeoutId = setTimeout(typeWriter, 2000);
        }
      } else {
        // Deleting phase
        if (charIndex > 0) {
          setTypedText(currentService.slice(0, charIndex - 1));
          charIndex--;
          timeoutId = setTimeout(typeWriter, 50);
        } else {
          // Finished deleting, move to next service
          isDeleting = false;
          currentServiceIndex = (currentServiceIndex + 1) % services.length;
          timeoutId = setTimeout(typeWriter, 200);
        }
      }
    };

    // Start the animation
    timeoutId = setTimeout(typeWriter, 500);

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []); // Empty dependency array to run once on mount

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className={`hero-section ${isDarkMode ? 'dark' : 'light'}`}
      aria-label="Hero section - KGSTechway Services introduction"
      role="main"
    >
      {/* Dot-grid ambient background only — no floating icons */}
      <div className="hero-background" />

      <Container className="hero-content">
        <Row className="align-items-center min-vh-100">
          <Col lg={7} className="hero-text-section">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="hero-badge">
                <span className="badge-icon">🚀</span>
                <span>Leading Technology Solutions Provider</span>
              </div>
            </motion.div>

                        <motion.h1 
              className="display-3 fw-bold mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{ color: isDarkMode ? '#ffffff' : '#2c3e50' }}
            >
              <span style={{ color: primaryColor }}>KGS Techway</span> - Transforming Ideas into{' '}
              <span className='gradient-text'>Digital Reality</span>
            </motion.h1>

            <motion.div
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="typed-text-container">
                Expert in{' '}
                <span 
                  className="typed-text" 
                  style={{ color: primaryColor }}
                  aria-live="polite"
                  aria-label={`Specializing in ${typedText || 'technology solutions'}`}
                >
                  {typedText}
                  <span className="cursor" aria-hidden="true">|</span>
                </span>
              </p>
            </motion.div>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              KGS Techway is your trusted technology partner specializing in Software Product Development, AI Solutions, CRM/ERP Services,
              and cutting-edge Agentic AI Solutions. Choose KGS Techway to transform your business
              with innovative digital solutions that drive growth, efficiency, and competitive advantage.
            </motion.p>

            <motion.div
              className="hero-cta-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button
                size="lg"
                className="primary-cta-btn"
                onClick={() => scrollToSection('contact')}
                aria-label="Start your project with KGSTechway - Contact us"
                style={{ 
                  backgroundColor: primaryColor,
                  borderColor: primaryColor 
                }}
              >
                Start Your Project
                <FaArrowRight className="ms-2" aria-hidden="true" />
              </Button>
              
              <Button
                variant="outline-primary"
                size="lg"
                className="secondary-cta-btn"
                onClick={() => scrollToSection('services')}
                aria-label="Learn about our services and solutions"
                style={{ 
                  borderColor: primaryColor,
                  color: primaryColor 
                }}
              >
                <FaPlay className="me-2" aria-hidden="true" />
                View Services
              </Button>
            </motion.div>

            {/* <motion.div
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Happy Clients</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
            </motion.div> */}
          </Col>

          <Col lg={5} className="hero-visual-section">
            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="tech-showcase">
                <motion.div
                  className="tech-card"
                  whileHover={{ scale: 1.05, rotateY: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="tech-card-content">
                    <h3>AI Solutions</h3>
                    <p>Advanced AI & Machine Learning</p>
                  </div>
                </motion.div>
                
                <motion.div
                  className="tech-card"
                  whileHover={{ scale: 1.05, rotateY: -15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="tech-card-content">
                    <h3>CRM/ERP Services</h3>
                    <p>Business Management Solutions</p>
                  </div>
                </motion.div>
                
                <motion.div
                  className="tech-card"
                  whileHover={{ scale: 1.05, rotateY: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="tech-card-content">
                    <h3>Agentic AI Solutions</h3>
                    <p>Intelligent Autonomous Systems</p>
                  </div>
                </motion.div>

                <motion.div
                  className="tech-card"
                  whileHover={{ scale: 1.05, rotateY: -15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="tech-card-content">
                    <h3>QA & Testing Services</h3>
                    <p>End-to-End Quality Assurance</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        onClick={() => scrollToSection('services')}
      >
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;