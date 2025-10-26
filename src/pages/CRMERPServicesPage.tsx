import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  FaDatabase, 
  FaArrowLeft, 
  FaUsers,
  FaCogs,
  FaChartBar,
  FaSync,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
} from 'react-icons/fa';
import SEO from '../components/SEO';
import { generateServiceStructuredData, generateWebPageStructuredData } from '../utils/seoUtils';
import './ServiceDetailPage.css';

const CRMERPServicesPage: React.FC = () => {
  const { isDarkMode, primaryColor } = useSelector((state: any) => state.theme);

  const features = [
    {
      title: 'Custom CRM Development',
      description: 'Tailored customer relationship management systems to track leads, manage customers, and boost sales performance.',
      icon: <FaUsers />,
      technologies: ['Salesforce', 'HubSpot', 'Microsoft Dynamics', 'Custom Solutions', 'API Integration']
    },
    {
      title: 'ERP Implementation',
      description: 'Complete enterprise resource planning solutions to integrate all business processes into a unified system.',
      icon: <FaCogs />,
      technologies: ['SAP', 'Oracle ERP', 'Microsoft Dynamics 365', 'NetSuite', 'Odoo']
    },
    {
      title: 'Business Process Automation',
      description: 'Streamline workflows and eliminate manual tasks through intelligent automation and process optimization.',
      icon: <FaSync />,
      technologies: ['Power Automate', 'Zapier', 'Custom Workflows', 'RPA', 'Integration APIs']
    },
    {
      title: 'Data Integration & Analytics',
      description: 'Unified data management with real-time reporting and business intelligence for informed decision-making.',
      icon: <FaChartBar />,
      technologies: ['Power BI', 'Tableau', 'Data Warehousing', 'ETL Processes', 'Real-time Analytics']
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Business Analysis',
      description: 'Comprehensive analysis of your current business processes and system requirements.',
      duration: '2-3 weeks'
    },
    {
      step: '02',
      title: 'System Design',
      description: 'Custom architecture design and workflow mapping tailored to your business needs.',
      duration: '3-4 weeks'
    },
    {
      step: '03',
      title: 'Implementation',
      description: 'Phased rollout with data migration, customization, and integration with existing systems.',
      duration: '8-16 weeks'
    },
    {
      step: '04',
      title: 'Training & Support',
      description: 'Comprehensive user training and ongoing support to ensure successful adoption.',
      duration: 'Ongoing'
    }
  ];

//   const stats = [
//     { label: 'ERP Projects', value: '100+', icon: <FaBuilding /> },
//     { label: 'User Adoption Rate', value: '95%', icon: <FaUsers /> },
//     { label: 'Process Efficiency', value: '40%+', icon: <FaRocket /> },
//     { label: 'Client Retention', value: '98%', icon: <FaCheckCircle /> }
//   ];

  const benefits = [
    'Centralized customer data management',
    'Automated sales and marketing workflows',
    'Real-time business intelligence and reporting',
    'Improved customer service and satisfaction',
    'Streamlined inventory and supply chain management',
    'Enhanced financial management and compliance'
  ];

  const serviceData = {
    name: 'CRM/ERP Services',
    description: 'Custom CRM and ERP solutions to streamline business operations, improve customer management, and optimize enterprise resources.',
    features: ['Customer Management', 'Sales Automation', 'Inventory Management', 'Financial Reporting', 'Business Intelligence', 'Process Automation'],
    technologies: ['Salesforce', 'Microsoft Dynamics', 'SAP', 'Oracle', 'Custom Development', 'API Integration'],
    benefits: benefits,
    priceRange: '$$'
  };

  const structuredData = [
    generateServiceStructuredData(serviceData),
    generateWebPageStructuredData({
      name: 'CRM & ERP Solutions - Business Management Systems',
      description: 'Custom CRM and ERP solutions to streamline business operations, customer management, inventory control, and financial management.',
      url: 'https://kgstechway.com/services/crm-erp',
      breadcrumbs: [
        { name: 'Home', url: 'https://kgstechway.com' },
        { name: 'Services', url: 'https://kgstechway.com/services' },
        { name: 'CRM/ERP Services', url: 'https://kgstechway.com/services/crm-erp' }
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
                
                <div className="service-icon-large mb-4" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                  <FaDatabase />
                </div>
                
                <h1 className="hero-title">
                  CRM/ERP Services
                  <span className="gradient-text"> & Solutions</span>
                </h1>
                
                <p className="hero-description">
                  Transform your business operations with comprehensive Customer Relationship Management 
                  and Enterprise Resource Planning solutions. Streamline processes, improve efficiency, 
                  and drive growth with our tailored business systems.
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
                    Get ERP Solution
                  </Button>
                  <Button variant="outline-primary" size="lg">
                    View Case Studies
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
                    <div className="code-block">📊 CRM</div>
                    <div className="code-block">🏢 ERP</div>
                    <div className="code-block">⚙️ Automation</div>
                    <div className="code-block">📈 Analytics</div>
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
            <h2 className="section-title">Our CRM/ERP Capabilities</h2>
            <p className="section-description">
              Comprehensive business management solutions to optimize your operations
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
                        <div className="feature-icon" style={{ color: '#38f9d7' }}>
                          {feature.icon}
                        </div>
                        <h4 className="feature-title">{feature.title}</h4>
                      </div>
                      <p className="feature-description">{feature.description}</p>
                      <div className="feature-technologies">
                        {feature.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} bg="success" className="me-2 mb-2">
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

      {/* Benefits Section */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="section-title">Key Benefits</h3>
                <p className="section-description text-start">
                  Our CRM/ERP solutions deliver measurable business value through improved 
                  efficiency and streamlined operations.
                </p>
                <div className="benefits-list">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="benefit-item d-flex align-items-center mb-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <FaCheckCircle className="me-3" style={{ color: primaryColor }} />
                      <span>{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className={`feature-card ${isDarkMode ? 'dark' : 'light'}`}>
                  <Card.Body className="text-center p-4">
                    <FaShieldAlt size={60} className="mb-3" style={{ color: '#38f9d7' }} />
                    <h4>Enterprise-Grade Security</h4>
                    <p>
                      Your business data is protected with enterprise-level security measures, 
                      including encryption, access controls, and compliance with industry standards.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
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
            <h2 className="section-title">Implementation Process</h2>
            <p className="section-description">
              Our proven methodology ensures successful CRM/ERP implementation
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
                  <div className="step-number" style={{ backgroundColor: '#38f9d7' }}>
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
                <h3 className="cta-title">Ready to Transform Your Business?</h3>
                <p className="cta-description">
                  Streamline your operations with our comprehensive CRM/ERP solutions tailored to your needs.
                </p>
                <div className="cta-actions">
                  <Button size="lg" className="primary-btn me-3">
                    Start Implementation
                  </Button>
                  <Button variant="outline-primary" size="lg">
                    Schedule Demo
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

export default CRMERPServicesPage;