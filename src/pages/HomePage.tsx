import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
// import AboutSection from '../components/AboutSection';
// import TechnologySection from '../components/TechnologySection';
import ContactSection from '../components/ContactSection';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      {/* <AboutSection /> */}
      {/* <TechnologySection /> */}
      <ContactSection />
    </>
  );
};

export default HomePage;