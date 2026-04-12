import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaChartLine, 
  FaArrowLeft, 
  FaRobot,
  FaBrain,
  FaNetworkWired,
  FaAutoprefixer,
  FaClock,
  FaCheckCircle,
} from 'react-icons/fa';
import './ServiceDetailPage.css';

const AgenticAIPage: React.FC = () => {
  const { isDarkMode, primaryColor } = useSelector((state: any) => state.theme);
  const navigate = useNavigate();
  const goToContact = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => navigate('/contact'), 300); };

  const features = [
    {
      title: 'Autonomous AI Agents',
      description: 'Self-operating AI systems that can plan, execute, and adapt to achieve complex business objectives without human intervention.',
      icon: <FaRobot />,
      technologies: ['LangChain', 'AutoGPT', 'CrewAI', 'Multi-Agent Systems', 'OpenAI GPT-4']
    },
    {
      title: 'Decision Making Systems',
      description: 'Intelligent decision engines that analyze data, evaluate options, and make optimal choices based on business rules and objectives.',
      icon: <FaBrain />,
      technologies: ['Reinforcement Learning', 'Decision Trees', 'Monte Carlo', 'Game Theory', 'Optimization']
    },
    {
      title: 'Multi-Agent Orchestration',
      description: 'Coordinated networks of specialized AI agents working together to solve complex, multi-faceted business challenges.',
      icon: <FaNetworkWired />,
      technologies: ['Agent Communication', 'Task Distribution', 'Consensus Algorithms', 'Swarm Intelligence']
    },
    {
      title: 'Intelligent Automation',
      description: 'Advanced automation that goes beyond rule-based systems to handle dynamic, context-aware business processes.',
      icon: <FaAutoprefixer />,
      technologies: ['Process Mining', 'Workflow AI', 'Adaptive Automation', 'Context Awareness', 'Real-time Learning']
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Agent Design',
      description: 'Define agent capabilities, objectives, and interaction patterns based on your business requirements.',
      duration: '2-3 weeks'
    },
    {
      step: '02',
      title: 'Development & Training',
      description: 'Build and train specialized AI agents with domain-specific knowledge and decision-making capabilities.',
      duration: '6-10 weeks'
    },
    {
      step: '03',
      title: 'Integration & Testing',
      description: 'Deploy agents in controlled environments and test multi-agent interactions and performance.',
      duration: '3-4 weeks'
    },
    {
      step: '04',
      title: 'Monitoring & Evolution',
      description: 'Continuous monitoring and improvement of agent performance with adaptive learning mechanisms.',
      duration: 'Ongoing'
    }
  ];

//   const stats = [
//     { label: 'Agent Systems', value: '25+', icon: <FaRobot /> },
//     { label: 'Efficiency Gain', value: '60%+', icon: <FaRocket /> },
//     { label: 'Decision Accuracy', value: '92%', icon: <FaCheckCircle /> },
//     { label: 'Cost Reduction', value: '45%', icon: <FaChartLine /> }
//   ];

  const useCases = [
    {
      title: 'Customer Service Agents',
      description: 'Autonomous agents that handle customer inquiries, resolve issues, and escalate complex cases intelligently.',
      benefits: ['24/7 availability', 'Consistent service quality', 'Multi-language support']
    },
    {
      title: 'Supply Chain Optimization',
      description: 'AI agents that monitor supply chains, predict disruptions, and automatically adjust procurement and logistics.',
      benefits: ['Predictive planning', 'Risk mitigation', 'Cost optimization']
    },
    {
      title: 'Financial Trading Agents',
      description: 'Sophisticated trading agents that analyze markets, execute trades, and manage portfolios with minimal human oversight.',
      benefits: ['Real-time analysis', 'Risk management', 'Automated execution']
    }
  ];

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
                
                <div className="service-icon-large mb-4" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                  <FaChartLine />
                </div>
                
                <h1 className="hero-title">
                  Agentic AI Solutions
                  <span className="gradient-text"> & Automation</span>
                </h1>
                
                <p className="hero-description">
                  Revolutionary autonomous AI agents that think, plan, and act independently to solve 
                  complex business challenges. Transform your operations with intelligent agents that 
                  continuously learn and adapt to optimize performance.
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
                    Deploy AI Agents
                  </Button>
                  <Button variant="outline-primary" size="lg" onClick={goToContact}>
                    View Demonstrations
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
                        <FaRobot className="dashboard-header-icon" style={{ color: '#fa709a' }} />
                        Agentic AI Orchestration
                      </div>
                      <div className="dashboard-live-badge">
                        <span className="live-dot" /> ACTIVE
                      </div>
                    </div>
                    <div className="dashboard-metrics">
                      <div className="metric-tile">
                        <div className="metric-icon-box" style={{ background: 'rgba(250,112,154,0.18)', color: '#fa709a' }}><FaRobot /></div>
                        <span className="metric-value">24/7</span>
                        <span className="metric-label">Autonomous Ops</span>
                        <span className="metric-sub">Zero downtime agents</span>
                      </div>
                      <div className="metric-tile">
                        <div className="metric-icon-box" style={{ background: 'rgba(79,172,254,0.18)', color: '#4facfe' }}><FaNetworkWired /></div>
                        <span className="metric-value">Multi</span>
                        <span className="metric-label">Agent Network</span>
                        <span className="metric-sub">Coordinated workflows</span>
                      </div>
                      <div className="metric-tile">
                        <div className="metric-icon-box" style={{ background: 'rgba(67,233,123,0.18)', color: '#43e97b' }}><FaBrain /></div>
                        <span className="metric-value">LLM</span>
                        <span className="metric-label">Decision Engine</span>
                        <span className="metric-sub">GPT-4 & Claude powered</span>
                      </div>
                      <div className="metric-tile">
                        <div className="metric-icon-box" style={{ background: 'rgba(241,196,15,0.18)', color: '#f1c40f' }}><FaCheckCircle /></div>
                        <span className="metric-value">80%</span>
                        <span className="metric-label">Cost Reduction</span>
                        <span className="metric-sub">Process automation</span>
                      </div>
                    </div>
                    <div className="dashboard-footer">
                      <span className="footer-label">Stack:</span>
                      {['LangChain', 'AutoGen', 'CrewAI', 'OpenAI', 'Claude', 'LlamaIndex'].map(t => (
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
            <h2 className="section-title">Agentic AI Capabilities</h2>
            <p className="section-description">
              Next-generation AI agents that operate autonomously to achieve business objectives
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
                        <div className="feature-icon" style={{ color: '#fee140' }}>
                          {feature.icon}
                        </div>
                        <h4 className="feature-title">{feature.title}</h4>
                      </div>
                      <p className="feature-description">{feature.description}</p>
                      <div className="feature-technologies">
                        {feature.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} bg="warning" className="me-2 mb-2 text-dark">
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

      {/* Use Cases Section */}
      <section className="py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Real-World Applications</h2>
            <p className="section-description">
              Practical implementations of agentic AI across various business domains
            </p>
          </motion.div>

          <Row>
            {useCases.map((useCase, index) => (
              <Col lg={4} key={index} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`feature-card h-100 ${isDarkMode ? 'dark' : 'light'}`}>
                    <Card.Body>
                      <h5 className="mb-3">{useCase.title}</h5>
                      <p className="mb-3">{useCase.description}</p>
                      <div>
                        {useCase.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="d-flex align-items-center mb-2">
                            <FaCheckCircle className="me-2" style={{ color: primaryColor }} />
                            <small>{benefit}</small>
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
            <h2 className="section-title">Agent Development Process</h2>
            <p className="section-description">
              Our systematic approach to building and deploying autonomous AI agents
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
                  <div className="step-number" style={{ backgroundColor: '#fee140', color: '#000' }}>
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
                <h3 className="cta-title">Ready for Autonomous AI?</h3>
                <p className="cta-description">
                  Deploy intelligent agents that work 24/7 to optimize your business operations and drive growth.
                </p>
                <div className="cta-actions">
                  <Button size="lg" className="primary-btn me-3" onClick={goToContact}>
                    Deploy AI Agents
                  </Button>
                  <Button variant="outline-primary" size="lg" onClick={goToContact}>
                    Request Demo
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

export default AgenticAIPage;