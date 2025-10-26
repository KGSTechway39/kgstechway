import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import ContactSection from '../components/ContactSection';
import SEO from '../components/SEO';
import { generateWebPageStructuredData, generateContactStructuredData } from '../utils/seoUtils';

const ContactPage: React.FC = () => {
  const { isDarkMode } = useSelector((state: any) => state.theme);

  const structuredData = [
    generateWebPageStructuredData({
      name: 'Contact KGSTechway - Get Your Project Started Today',
      description: 'Ready to start your next project? Contact KGSTechway for software development, AI solutions, and technology consulting.',
      url: 'https://kgstechway.com/contact',
      breadcrumbs: [
        { name: 'Home', url: 'https://kgstechway.com' },
        { name: 'Contact', url: 'https://kgstechway.com/contact' }
      ]
    }),
    generateContactStructuredData()
  ];

  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'} style={{ minHeight: '100vh', paddingTop: '80px' }}>
      <SEO 
        title="Contact KGSTechway - Get Your Project Started Today"
        description="Ready to start your next project? Contact KGSTechway for software development, AI solutions, and technology consulting. Get a free consultation and quote."
        keywords="Contact KGSTechway, Software Development Consultation, AI Solutions Quote, Technology Consulting, Project Inquiry"
        canonicalUrl="https://kgstechway.com/contact"
        ogTitle="Contact KGSTechway - Start Your Technology Project"
        ogDescription="Get in touch with KGSTechway for your next technology project. Free consultation, competitive quotes, and expert guidance for your business transformation."
        ogImage="https://kgstechway.com/images/og-contact.jpg"
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
                  Get <span style={{ color: '#0066cc' }}>In Touch</span>
                </h1>
                <p className="lead mb-0" style={{ fontSize: '1.2rem', opacity: 0.8 }}>
                  Ready to transform your business with cutting-edge technology? 
                  Contact us for a free consultation and discover how we can help accelerate your digital transformation.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default ContactPage;