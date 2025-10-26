import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import ServicesSection from '../components/ServicesSection';
import SEO from '../components/SEO';
import { generateWebPageStructuredData, generateCompanyStructuredData } from '../utils/seoUtils';

const ServicesPage: React.FC = () => {
  const { isDarkMode } = useSelector((state: any) => state.theme);

  const structuredData = [
    generateWebPageStructuredData({
      name: 'Our Services - Technology Solutions | KGSTechway',
      description: 'Comprehensive technology services including Software Product Development, AI Solutions, CRM/ERP Services, Agentic AI, Cloud & DevOps, and Mobile App Development.',
      url: 'https://kgstechway.com/services',
      breadcrumbs: [
        { name: 'Home', url: 'https://kgstechway.com' },
        { name: 'Services', url: 'https://kgstechway.com/services' }
      ]
    }),
    generateCompanyStructuredData()
  ];

  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'} style={{ minHeight: '100vh', paddingTop: '80px' }}>
      <SEO 
        title="Our Services - Software Development & AI Solutions | KGSTechway"
        description="Comprehensive technology services including Software Product Development, AI Solutions, CRM/ERP Services, Agentic AI, Cloud & DevOps, and Mobile App Development."
        keywords="Software Services, AI Development, CRM Solutions, ERP Implementation, Mobile Development, Cloud Services, DevOps Solutions"
        canonicalUrl="https://kgstechway.com/services"
        ogTitle="Technology Services - KGSTechway Solutions"
        ogDescription="Complete range of technology services from software development to AI solutions. Discover how we can transform your business with cutting-edge technology."
        ogImage="https://kgstechway.com/images/og-services.jpg"
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
                  Our <span style={{ color: '#0066cc' }}>Technology Services</span>
                </h1>
                <p className="lead mb-0" style={{ fontSize: '1.2rem', opacity: 0.8 }}>
                  Comprehensive technology solutions to transform your business and accelerate growth. 
                  From software development to AI solutions, we deliver cutting-edge technology that drives results.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <ServicesSection />
    </div>
  );
};

export default ServicesPage;