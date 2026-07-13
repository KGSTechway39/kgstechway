import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  FaBoxOpen,
  FaWhatsapp,
  FaFileAlt,
  FaChartPie,
  FaRobot,
  FaVial,
  FaArrowRight,
  FaCheckCircle
} from 'react-icons/fa';
import './ProductsSection.css';

const ProductsSection = () => {
  const { isDarkMode, primaryColor } = useSelector((state: any) => state.theme);
  const navigate = useNavigate();

  const products = [
    {
      icon: <FaWhatsapp />,
      name: 'WA Send',
      tagline: 'WhatsApp Business Platform',
      description: 'WA Send lets any business connect their own WhatsApp Business Account to run campaigns, automate replies, and manage customer conversations — all on the official WhatsApp Business API, while we handle the technical integration on their behalf.',
      features: ['Connect Your Own WhatsApp Business Account', 'Run Campaigns & Broadcasts', 'Automate Replies', 'Manage Customer Conversations'],
      gradient: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
      status: 'Available',
      delay: 0.1
    },
    {
      icon: <FaFileAlt />,
      name: 'WorkspaceCV',
      tagline: 'ATS-Ready Resume Builder',
      description: 'Build ATS-ready resumes in minutes. WorkspaceCV pairs professional, recruiter-approved templates with built-in formatting so job seekers get past the bots and land more interviews.',
      features: ['ATS-Optimized Resumes', 'Ready-to-Use Templates', 'Built-in Professional Formatting', 'Create in Minutes'],
      gradient: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
      status: 'Available',
      delay: 0.2
    },
    {
      icon: <FaChartPie />,
      name: 'InsightHub',
      tagline: 'Business Intelligence Suite',
      description: 'Turn raw data into actionable decisions with real-time dashboards, predictive analytics, and automated reporting for your whole team.',
      features: ['Real-time Dashboards', 'Predictive Analytics', 'Custom Reports', 'Data Integrations'],
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      status: 'Coming Soon',
      delay: 0.2
    },
    {
      icon: <FaRobot />,
      name: 'AgentFlow',
      tagline: 'Agentic AI Workflow Builder',
      description: 'Design, orchestrate, and monitor autonomous AI agents that execute complex, multi-step business workflows without human intervention.',
      features: ['Visual Workflow Builder', 'Multi-Agent Orchestration', 'Tool & API Connectors', 'Human-in-the-loop Controls'],
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      status: 'Coming Soon',
      delay: 0.3
    },
    {
      icon: <FaVial />,
      name: 'TestPilot',
      tagline: 'Test Automation Platform',
      description: 'Accelerate releases with AI-assisted test generation, cross-browser automation, and CI/CD-ready reporting built for modern QA teams.',
      features: ['AI Test Generation', 'Cross-browser Automation', 'CI/CD Integration', 'Rich Failure Reports'],
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      status: 'Coming Soon',
      delay: 0.4
    }
  ];

  const handleCtaClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => navigate('/contact'), 300);
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
    <section id="products" className={`products-section ${isDarkMode ? 'dark' : 'light'}`}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-header text-center"
        >
          <div className="section-badge">
            <FaBoxOpen className="me-2" />
            Our Products
          </div>
          <h2 className="section-title">
            Ready-to-Deploy Platforms Built to
            <span className="gradient-text"> Scale With You</span>
          </h2>
          <p className="section-description">
            Beyond custom services, we ship our own products — battle-tested platforms that
            help you launch faster, automate smarter, and grow with confidence.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Row className="products-grid justify-content-center">
            {products.map((product, index) => (
              <Col lg={4} md={6} key={index} className="mb-4">
                <motion.div variants={cardVariants} className="h-100">
                  <Card className={`product-card h-100 ${isDarkMode ? 'dark' : 'light'}`}>
                    <div className="product-card-top">
                      <div
                        className="product-icon-wrapper"
                        style={{ background: product.gradient }}
                      >
                        <div className="product-icon">{product.icon}</div>
                      </div>
                      <span
                        className={`product-status status-${product.status.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {product.status}
                      </span>
                    </div>

                    <Card.Body className="product-content">
                      <Card.Title className="product-name">{product.name}</Card.Title>
                      <div className="product-tagline">{product.tagline}</div>
                      <Card.Text className="product-description">
                        {product.description}
                      </Card.Text>

                      <div className="product-features">
                        {product.features.map((feature, featureIndex) => (
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

                    <div className="product-footer">
                      <Button
                        variant="outline-primary"
                        className="product-btn"
                        style={{ borderColor: primaryColor, color: primaryColor }}
                        onClick={handleCtaClick}
                      >
                        Request Demo
                        <FaArrowRight className="ms-2" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="products-cta"
        >
          <div className="products-cta-content">
            <h3>Looking for a product tailored to your business?</h3>
            <p>
              We can customize any of our platforms — or build a brand-new product from
              the ground up — to match your exact workflow and goals.
            </p>
            <Button
              size="lg"
              className="products-primary-cta"
              style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
              onClick={handleCtaClick}
            >
              Talk to Our Team
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ProductsSection;
