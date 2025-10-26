import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import TechnologySection from '../components/TechnologySection';
import SEO from '../components/SEO';
import { generateWebPageStructuredData, generateTechnologyStructuredData } from '../utils/seoUtils';

const TechnologyPage: React.FC = () => {
  const { isDarkMode } = useSelector((state: any) => state.theme);

  const structuredData = [
    generateWebPageStructuredData({
      name: 'Technology Stack & Expertise | KGSTechway Services',
      description: 'Explore KGSTechway\'s comprehensive technology stack including React, Node.js, Python, AI/ML frameworks, cloud platforms, and modern development tools.',
      url: 'https://kgstechway.com/technology',
      breadcrumbs: [
        { name: 'Home', url: 'https://kgstechway.com' },
        { name: 'Technology', url: 'https://kgstechway.com/technology' }
      ]
    }),
    generateTechnologyStructuredData()
  ];

  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'} style={{ minHeight: '100vh', paddingTop: '80px' }}>
      <SEO 
        title="Technology Stack & Expertise | KGSTechway Services"
        description="Explore KGSTechway's comprehensive technology stack including React, Node.js, Python, AI/ML frameworks, cloud platforms, and modern development tools."
        keywords="Technology Stack, React Development, Node.js, Python, AI Frameworks, Cloud Platforms, Modern Development Tools"
        canonicalUrl="https://kgstechway.com/technology"
        ogTitle="Technology Stack & Technical Expertise - KGSTechway"
        ogDescription="Deep dive into our technology expertise covering frontend, backend, AI/ML, cloud, and emerging technologies that power innovative solutions."
        ogImage="https://kgstechway.com/images/og-technology.jpg"
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
                  Our <span style={{ color: '#0066cc' }}>Technology Stack</span>
                </h1>
                <p className="lead mb-0" style={{ fontSize: '1.2rem', opacity: 0.8 }}>
                  Cutting-edge technologies and frameworks that power our innovative solutions. 
                  From modern frontend frameworks to advanced AI/ML tools, explore our comprehensive technical expertise.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Technology Section */}
      <TechnologySection />
    </div>
  );
};

export default TechnologyPage;