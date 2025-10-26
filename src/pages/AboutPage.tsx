import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import AboutSection from '../components/AboutSection';
import SEO from '../components/SEO';
import { generateWebPageStructuredData, generateCompanyStructuredData } from '../utils/seoUtils';

const AboutPage: React.FC = () => {
  const { isDarkMode } = useSelector((state: any) => state.theme);

  const structuredData = [
    generateWebPageStructuredData({
      name: 'About KGSTechway - Leading Technology Solutions Company',
      description: 'Learn about KGSTechway, a leading technology company specializing in software development, AI solutions, and digital transformation.',
      url: 'https://kgstechway.com/about',
      breadcrumbs: [
        { name: 'Home', url: 'https://kgstechway.com' },
        { name: 'About', url: 'https://kgstechway.com/about' }
      ]
    }),
    generateCompanyStructuredData()
  ];

  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'} style={{ minHeight: '100vh', paddingTop: '80px' }}>
      <SEO 
        title="About KGSTechway - Leading Technology Solutions Company"
        description="Learn about KGSTechway, a leading technology company specializing in software development, AI solutions, and digital transformation. Our mission, values, and expertise."
        keywords="About KGSTechway, Company Profile, Technology Expertise, Software Development Company, AI Solutions Provider"
        canonicalUrl="https://kgstechway.com/about"
        ogTitle="About KGSTechway - Technology Innovation Leaders"
        ogDescription="Discover KGSTechway's journey in technology innovation. Learn about our mission, values, technical expertise, and commitment to delivering exceptional solutions."
        ogImage="https://kgstechway.com/images/og-about.jpg"
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
                  About <span style={{ color: '#0066cc' }}>KGSTechway</span>
                </h1>
                <p className="lead mb-0" style={{ fontSize: '1.2rem', opacity: 0.8 }}>
                  Transforming ideas into digital reality through innovative technology solutions. 
                  Learn about our journey, mission, and commitment to excellence in software development and AI solutions.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <AboutSection />
    </div>
  );
};

export default AboutPage;