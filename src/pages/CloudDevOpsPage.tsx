import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  FaCloud, 
  FaArrowLeft,
  FaDocker,
  FaRocket,
  FaClock,
  FaCheckCircle,
  FaCode
} from 'react-icons/fa';
import './ServiceDetailPage.css';

const CloudDevOpsPage: React.FC = () => {
  const { isDarkMode, primaryColor } = useSelector((state: any) => state.theme);

  const features = [
    {
      title: 'Cloud Migration & Modernization',
      description: 'Seamless migration of legacy systems to modern cloud platforms with optimized architecture and performance.',
      icon: <FaCloud />,
      technologies: ['AWS', 'Azure', 'Google Cloud', 'Multi-Cloud', 'Hybrid Cloud', 'Serverless']
    },
    {
      title: 'CI/CD Pipeline Automation',
      description: 'Advanced continuous integration and deployment pipelines for faster, reliable, and secure software delivery.',
      icon: <FaRocket />,
      technologies: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'Azure DevOps', 'CircleCI', 'ArgoCD']
    },
    {
      title: 'Infrastructure as Code',
      description: 'Automated infrastructure provisioning and management using code-based approaches for scalability and consistency.',
      icon: <FaCode />,
      technologies: ['Terraform', 'CloudFormation', 'Pulumi', 'Ansible', 'Chef', 'Puppet']
    },
    {
      title: 'Container Orchestration',
      description: 'Docker containerization and Kubernetes orchestration for scalable, portable, and efficient application deployment.',
      icon: <FaDocker />,
      technologies: ['Kubernetes', 'Docker', 'OpenShift', 'Helm', 'Istio', 'Container Security']
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Assessment & Planning',
      description: 'Comprehensive analysis of current infrastructure and development of cloud migration and DevOps strategy.',
      duration: '1-2 weeks'
    },
    {
      step: '02',
      title: 'Infrastructure Setup',
      description: 'Design and implement scalable cloud infrastructure with automated provisioning and security controls.',
      duration: '3-6 weeks'
    },
    {
      step: '03',
      title: 'Pipeline Development',
      description: 'Build robust CI/CD pipelines with automated testing, security scanning, and deployment workflows.',
      duration: '4-8 weeks'
    },
    {
      step: '04',
      title: 'Monitoring & Optimization',
      description: 'Implement comprehensive monitoring, logging, and continuous optimization for performance and cost.',
      duration: 'Ongoing'
    }
  ];

//   const stats = [
//     { label: 'Deployment Frequency', value: '10x', icon: <FaRocket /> },
//     { label: 'Time to Market', value: '70%↓', icon: <FaClock /> },
//     { label: 'System Reliability', value: '99.9%', icon: <FaShieldAlt /> },
//     { label: 'Cost Reduction', value: '40%', icon: <FaChartLine /> }
//   ];

  const services = [
    {
      title: 'Cloud Strategy & Migration',
      description: 'End-to-end cloud transformation with assessment, planning, and migration execution.',
      features: ['Multi-cloud strategy', 'Legacy modernization', 'Data migration', 'Security compliance']
    },
    {
      title: 'DevOps Implementation',
      description: 'Complete DevOps culture transformation with tools, processes, and automation.',
      features: ['Process automation', 'Culture change', 'Tool integration', 'Team training']
    },
    {
      title: 'Monitoring & Security',
      description: 'Comprehensive observability and security solutions for cloud-native applications.',
      features: ['Real-time monitoring', 'Security scanning', 'Compliance automation', 'Incident response']
    }
  ];

//   const technologies = [
//     { name: 'Amazon Web Services', category: 'Cloud Platforms' },
//     { name: 'Microsoft Azure', category: 'Cloud Platforms' },
//     { name: 'Google Cloud Platform', category: 'Cloud Platforms' },
//     { name: 'Kubernetes', category: 'Orchestration' },
//     { name: 'Docker', category: 'Containerization' },
//     { name: 'Terraform', category: 'IaC' },
//     { name: 'Jenkins', category: 'CI/CD' },
//     { name: 'GitLab CI', category: 'CI/CD' },
//     { name: 'Prometheus', category: 'Monitoring' },
//     { name: 'Grafana', category: 'Visualization' },
//     { name: 'ELK Stack', category: 'Logging' },
//     { name: 'Istio', category: 'Service Mesh' }
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
                
                <div className="service-icon-large mb-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  <FaCloud />
                </div>
                
                <h1 className="hero-title">
                  Cloud & DevOps
                  <span className="gradient-text"> Solutions</span>
                </h1>
                
                <p className="hero-description">
                  Accelerate your digital transformation with comprehensive cloud migration, 
                  infrastructure automation, and DevOps practices. Build scalable, secure, 
                  and efficient systems that drive innovation and growth.
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
                    Start Migration
                  </Button>
                  <Button variant="outline-primary" size="lg">
                    Cloud Assessment
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
                    <div className="code-block">☁️ Cloud</div>
                    <div className="code-block">🚀 DevOps</div>
                    <div className="code-block">🐳 Container</div>
                    <div className="code-block">⚙️ Automation</div>
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
            <h2 className="section-title">Core Cloud & DevOps Capabilities</h2>
            <p className="section-description">
              Comprehensive solutions for modern cloud infrastructure and development operations
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
                        <div className="feature-icon" style={{ color: '#764ba2' }}>
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

      {/* Services Section */}
      <section className="py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Service Offerings</h2>
            <p className="section-description">
              Comprehensive cloud and DevOps services tailored to your business needs
            </p>
          </motion.div>

          <Row>
            {services.map((service, index) => (
              <Col lg={4} key={index} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`feature-card h-100 ${isDarkMode ? 'dark' : 'light'}`}>
                    <Card.Body>
                      <h5 className="mb-3">{service.title}</h5>
                      <p className="mb-3">{service.description}</p>
                      <div>
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="d-flex align-items-center mb-2">
                            <FaCheckCircle className="me-2" style={{ color: primaryColor }} />
                            <small>{feature}</small>
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

      {/* Technologies Section */}
      {/* <section className="py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Technology Stack</h2>
            <p className="section-description">
              Industry-leading tools and platforms we use to deliver exceptional results
            </p>
          </motion.div>

          <Row>
            {technologies.map((tech, index) => (
              <Col lg={3} md={4} sm={6} key={index} className="mb-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="technology-tag"
                >
                  <Badge bg="outline-primary" className="w-100 p-3 text-center">
                    <div className="fw-bold">{tech.name}</div>
                    <small className="text-muted">{tech.category}</small>
                  </Badge>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section> */}

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
            <h2 className="section-title">Implementation Process</h2>
            <p className="section-description">
              Our proven methodology for cloud migration and DevOps transformation
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
                  <div className="step-number" style={{ backgroundColor: '#764ba2' }}>
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
                <h3 className="cta-title">Ready for Cloud Transformation?</h3>
                <p className="cta-description">
                  Accelerate your digital journey with our comprehensive cloud and DevOps solutions.
                </p>
                <div className="cta-actions">
                  <Button size="lg" className="primary-btn me-3">
                    Start Migration
                  </Button>
                  <Button variant="outline-primary" size="lg">
                    Get Assessment
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

export default CloudDevOpsPage;