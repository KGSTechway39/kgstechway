import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import ProductsSection from '../components/ProductsSection';
import SEO from '../components/SEO';
import { generateWebPageStructuredData, generateCompanyStructuredData } from '../utils/seoUtils';

const ProductsPage: React.FC = () => {
  const { isDarkMode } = useSelector((state: any) => state.theme);

  const structuredData = [
    generateWebPageStructuredData({
      name: 'Our Products | KGSTechway',
      description: 'Ready-to-deploy products from KGSTechway including SendAnjal (WhatsApp Business platform), WorkspaceCV (ATS-ready resume builder), business intelligence, agentic AI, and test automation.',
      url: 'https://kgstechway.com/products',
      breadcrumbs: [
        { name: 'Home', url: 'https://kgstechway.com' },
        { name: 'Products', url: 'https://kgstechway.com/products' }
      ]
    }),
    generateCompanyStructuredData()
  ];

  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'} style={{ minHeight: '100vh', paddingTop: '80px' }}>
      <SEO
        title="Our Products - SendAnjal, WorkspaceCV & More | KGSTechway"
        description="Explore KGSTechway products including SendAnjal, our WhatsApp Business platform for bulk campaigns and automation, plus business intelligence, agentic AI, and test automation."
        keywords="SendAnjal, WorkspaceCV, WhatsApp Business API, ATS resume builder, bulk WhatsApp, WhatsApp marketing, business intelligence, agentic AI, test automation"
        canonicalUrl="https://kgstechway.com/products"
        ogTitle="Products - KGSTechway"
        ogDescription="Ready-to-deploy platforms including SendAnjal for WhatsApp Business marketing and automation."
        structuredData={structuredData}
      />

      {/* Page Header */}
      <section style={{ padding: '60px 0 40px 0' }}>
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="display-4 fw-bold mb-4">
                  Our <span style={{ color: '#00C896' }}>Products</span>
                </h1>
                <p className="lead mb-0" style={{ fontSize: '1.2rem', opacity: 0.8 }}>
                  Battle-tested platforms built by KGSTechway — from SendAnjal, our WhatsApp Business
                  engine, to intelligent automation tools that help you launch faster and grow smarter.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Products Section */}
      <ProductsSection />
    </div>
  );
};

export default ProductsPage;
