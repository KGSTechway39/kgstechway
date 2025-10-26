import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
// import AboutSection from '../components/AboutSection';
// import TechnologySection from '../components/TechnologySection';
import ContactSection from '../components/ContactSection';
import SEO from '../components/SEO';
import { generateCompanyStructuredData, generateFAQStructuredData } from '../utils/seoUtils';

const HomePage: React.FC = () => {
  const homePageFAQs = [
    {
      question: "What services does KGSTechway offer?",
      answer: "KGSTechway offers Software Product Development, AI Solutions, CRM/ERP Services, Agentic AI Solutions, Cloud & DevOps, and Mobile App Development. We specialize in transforming business ideas into digital reality with cutting-edge technology solutions."
    },
    {
      question: "Why choose KGSTechway for software development?",
      answer: "KGSTechway combines deep technical expertise with business acumen. We use modern technologies like React, Node.js, Python, and AI/ML frameworks to deliver scalable, high-performance solutions that drive business growth."
    },
    {
      question: "Does KGSTechway provide AI and Machine Learning services?",
      answer: "Yes, KGSTechway specializes in AI Solutions and Agentic AI. We develop intelligent automation systems, predictive analytics, natural language processing, and autonomous AI agents for various business applications."
    },
    {
      question: "What industries does KGSTechway serve?",
      answer: "KGSTechway serves multiple industries including healthcare, finance, e-commerce, manufacturing, and startups. Our flexible approach allows us to adapt our technology solutions to any industry's specific needs."
    }
  ];

  const homeStructuredData = [
    generateCompanyStructuredData(),
    generateFAQStructuredData(homePageFAQs)
  ];

  return (
    <>
      <SEO 
        structuredData={homeStructuredData}
      />
      <HeroSection />
      <ServicesSection />
      {/* <AboutSection /> */}
      {/* <TechnologySection /> */}
      <ContactSection />
    </>
  );
};

export default HomePage;