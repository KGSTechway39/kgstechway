import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  FaCode, 
  FaRobot, 
  FaChartLine, 
  FaCogs, 
  FaDatabase,
  FaArrowRight,
  FaCheckCircle,
  FaCloud,
  FaMobile
} from 'react-icons/fa';
import './ServicesSection.css';

const ServicesSection = () => {
  const { isDarkMode, primaryColor } = useSelector((state: any) => state.theme);
  const navigate = useNavigate();

  const services = [
    {
      icon: <FaCode />,
      title: 'Software Product Development/Services',
      description: 'End-to-end software product development from concept to deployment, delivering scalable and robust solutions.',
      features: ['Full-Stack Development', 'Product Architecture', 'Legacy System Modernization', 'Microservices Architecture'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      delay: 0.1,
      route: '/services/software-development'
    },
    {
      icon: <FaRobot />,
      title: 'AI Solutions',
      description: 'Advanced artificial intelligence solutions that automate processes and generate intelligent insights for your business.',
      features: ['Machine Learning Models', 'Predictive Analytics', 'Computer Vision', 'Natural Language Processing'],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      delay: 0.2,
      route: '/services/ai-solutions'
    },
    {
      icon: <FaDatabase />,
      title: 'CRM/ERP Services',
      description: 'Comprehensive Customer Relationship Management and Enterprise Resource Planning solutions to streamline business operations.',
      features: ['Custom CRM Development', 'ERP Implementation', 'Business Process Automation', 'Data Integration'],
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      delay: 0.3,
      route: '/services/crm-erp'
    },
    {
      icon: <FaChartLine />,
      title: 'Agentic AI Solutions',
      description: 'Next-generation autonomous AI agents that can perform complex tasks and make intelligent decisions independently.',
      features: ['Autonomous AI Agents', 'Decision Making Systems', 'Intelligent Automation', 'Multi-Agent Orchestration'],
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      delay: 0.4,
      route: '/services/agentic-ai'
    },
    {
      icon: <FaCloud />,
      title: 'Cloud & DevOps Solutions',
      description: 'Scalable cloud infrastructure and DevOps practices to accelerate development and ensure reliable deployments.',
      features: ['Cloud Migration', 'CI/CD Pipelines', 'Infrastructure as Code', 'Container Orchestration'],
      gradient: 'linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%)',
      delay: 0.5,
      route: '/services/cloud-devops'
    },
    {
      icon: <FaMobile />,
      title: 'Mobile App Development',
      description: 'Cross-platform mobile applications that deliver exceptional user experiences across iOS and Android platforms.',
      features: ['Native iOS/Android', 'React Native', 'Flutter Development', 'Progressive Web Apps'],
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      delay: 0.6,
      route: '/services/mobile-development'
    }
  ];

  const handleLearnMoreClick = (route: string) => {
    // Scroll to top before navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Navigate after a small delay to allow scroll animation
    setTimeout(() => {
      navigate(route);
    }, 300);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as any
      }
    }
  };

  return (
    <section id="services" className={`services-section ${isDarkMode ? 'dark' : 'light'}`}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-header text-center"
        >
          <div className="section-badge">
            <FaCogs className="me-2" />
            Our Services
          </div>
          <h2 className="section-title">
            Comprehensive Technology Solutions for
            <span className="gradient-text"> Your Business</span>
          </h2>
          <p className="section-description">
            We deliver end-to-end technology services that drive innovation, improve efficiency, 
            and accelerate your digital transformation journey.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Row className="services-grid">
            {services.map((service, index) => (
              <Col lg={4} md={6} key={index} className="mb-4">
                <motion.div variants={cardVariants}>
                  <Card className={`service-card h-100 ${isDarkMode ? 'dark' : 'light'}`}>
                    <div 
                      className="service-icon-wrapper"
                      style={{ background: service.gradient }}
                    >
                      <div className="service-icon">
                        {service.icon}
                      </div>
                    </div>
                    
                    <Card.Body className="service-content">
                      <Card.Title className="service-title">
                        {service.title}
                      </Card.Title>
                      <Card.Text className="service-description">
                        {service.description}
                      </Card.Text>
                      
                      <div className="service-features">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="feature-item">
                            <FaCheckCircle 
                              className="feature-icon" 
                              style={{ color: primaryColor }} 
                            />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </Card.Body>

                    <div className="service-footer">
                      <Button
                        variant="outline-primary"
                        className="service-btn"
                        style={{ 
                          borderColor: primaryColor,
                          color: primaryColor 
                        }}
                        onClick={() => handleLearnMoreClick(service.route)}
                      >
                        Learn More
                        <FaArrowRight className="ms-2" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Additional Services CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="additional-services-cta"
        >
          <div className="cta-content">
            <h3>Need a Custom Solution?</h3>
            <p>
              Every business is unique. Let's discuss how we can create a tailored 
              solution that perfectly fits your specific requirements and goals.
            </p>
            <div className="cta-buttons">
              <Button
                size="lg"
                className="primary-cta"
                style={{ 
                  backgroundColor: primaryColor,
                  borderColor: primaryColor 
                }}
              >
                Schedule Consultation
              </Button>
              <Button
                variant="outline-primary"
                size="lg"
                className="secondary-cta"
                style={{ 
                  borderColor: primaryColor,
                  color: primaryColor 
                }}
              >
                View Portfolio
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="process-section"
        >
          <div className="section-header text-center mb-5">
            <h3 className="process-title">Our Development Process</h3>
            <p className="process-description">
              We follow a proven methodology to ensure successful project delivery
            </p>
          </div>

          <Row className="process-steps">
            <Col md={3} className="process-step">
              <div className="step-number" style={{ backgroundColor: primaryColor }}>1</div>
              <div className="step-content">
                <h5>Discovery & Analysis</h5>
                <p>Understanding your requirements and business objectives</p>
              </div>
            </Col>
            <Col md={3} className="process-step">
              <div className="step-number" style={{ backgroundColor: primaryColor }}>2</div>
              <div className="step-content">
                <h5>Design & Planning</h5>
                <p>Creating detailed designs and project roadmaps</p>
              </div>
            </Col>
            <Col md={3} className="process-step">
              <div className="step-number" style={{ backgroundColor: primaryColor }}>3</div>
              <div className="step-content">
                <h5>Development & Testing</h5>
                <p>Building robust solutions with comprehensive testing</p>
              </div>
            </Col>
            <Col md={3} className="process-step">
              <div className="step-number" style={{ backgroundColor: primaryColor }}>4</div>
              <div className="step-content">
                <h5>Deployment & Support</h5>
                <p>Launching your solution with ongoing maintenance</p>
              </div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default ServicesSection;