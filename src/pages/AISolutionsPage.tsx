import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  FaRobot, 
  FaArrowLeft, 
  FaBrain,
  FaEye,
  FaChartBar,
  FaLanguage,
  FaClock,
} from 'react-icons/fa';
import './ServiceDetailPage.css';

const AISolutionsPage: React.FC = () => {
  const { isDarkMode } = useSelector((state: any) => state.theme);

  const features = [
    {
      title: 'Machine Learning Models',
      description: 'Custom ML models for predictive analytics, recommendation systems, and intelligent automation.',
      icon: <FaBrain />,
      technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'XGBoost', 'Keras', 'MLflow']
    },
    {
      title: 'Computer Vision',
      description: 'Advanced image and video analysis for object detection, facial recognition, and quality control.',
      icon: <FaEye />,
      technologies: ['OpenCV', 'YOLO', 'ResNet', 'CNN', 'Image Classification', 'Object Detection']
    },
    {
      title: 'Predictive Analytics',
      description: 'Data-driven insights and forecasting to optimize business operations and decision-making.',
      icon: <FaChartBar />,
      technologies: ['Time Series', 'Forecasting', 'Statistical Models', 'Business Intelligence', 'Data Mining']
    },
    {
      title: 'Natural Language Processing',
      description: 'Text analysis, sentiment analysis, chatbots, and language understanding systems.',
      icon: <FaLanguage />,
      technologies: ['NLTK', 'spaCy', 'Transformers', 'BERT', 'GPT', 'Sentiment Analysis']
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Data Assessment',
      description: 'Analyzing your data quality, volume, and identifying AI opportunities.',
      duration: '1-2 weeks'
    },
    {
      step: '02',
      title: 'Model Development',
      description: 'Creating and training custom AI models tailored to your specific needs.',
      duration: '4-8 weeks'
    },
    {
      step: '03',
      title: 'Testing & Validation',
      description: 'Rigorous testing to ensure model accuracy and reliability in real-world scenarios.',
      duration: '2-3 weeks'
    },
    {
      step: '04',
      title: 'Integration & Monitoring',
      description: 'Seamless integration with your systems and continuous performance monitoring.',
      duration: 'Ongoing'
    }
  ];

//   const stats = [
//     { label: 'AI Models Deployed', value: '50+', icon: <FaRobot /> },
//     { label: 'Accuracy Rate', value: '95%+', icon: <FaCheckCircle /> },
//     { label: 'Processing Speed', value: '10x', icon: <FaRocket /> },
//     { label: 'Client Satisfaction', value: '100%', icon: <FaUsers /> }
//   ];

  return (
    <div className={`service-detail-page ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Hero Section */}
      <section className="service-hero">
        <Container>
          <Row className="align-items-center min-vh-100 py-5">
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Link to="/" className="back-link mb-3 d-inline-flex align-items-center">
                  <FaArrowLeft className="me-2" />
                  Back to Services
                </Link>
                
                <div className="service-icon-large mb-4" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                  <FaRobot />
                </div>
                
                <h1 className="hero-title">
                  AI Solutions
                  <span className="gradient-text"> & Intelligence</span>
                </h1>
                
                <p className="hero-description">
                  Harness the power of artificial intelligence to automate processes, gain intelligent 
                  insights, and create competitive advantages. Our AI solutions transform data into 
                  actionable intelligence that drives business growth.
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
                  <Button size="lg" className="primary-btn me-3">
                    Explore AI Solutions
                  </Button>
                  <Button variant="outline-primary" size="lg">
                    View AI Portfolio
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
                    <div className="code-block ai-block">🧠 ML</div>
                    <div className="code-block ai-block">👁️ CV</div>
                    <div className="code-block ai-block">📊 Analytics</div>
                    <div className="code-block ai-block">🤖 NLP</div>
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
            <h2 className="section-title">AI Capabilities</h2>
            <p className="section-description">
              Advanced artificial intelligence solutions to transform your business operations
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
                        <div className="feature-icon" style={{ color: '#00f2fe' }}>
                          {feature.icon}
                        </div>
                        <h4 className="feature-title">{feature.title}</h4>
                      </div>
                      <p className="feature-description">{feature.description}</p>
                      <div className="feature-technologies">
                        {feature.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} bg="info" className="me-2 mb-2">
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
            <h2 className="section-title">AI Development Process</h2>
            <p className="section-description">
              Our systematic approach to delivering intelligent AI solutions
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
                  <div className="step-number" style={{ backgroundColor: '#00f2fe' }}>
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
                <h3 className="cta-title">Ready to Implement AI Solutions?</h3>
                <p className="cta-description">
                  Transform your business with intelligent automation and data-driven insights.
                </p>
                <div className="cta-actions">
                  <Button size="lg" className="primary-btn me-3">
                    Start AI Project
                  </Button>
                  <Button variant="outline-primary" size="lg">
                    AI Consultation
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

export default AISolutionsPage;