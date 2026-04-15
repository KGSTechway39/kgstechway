import React from 'react';
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
      <ContactSection />
    </div>
  );
};

export default ContactPage;