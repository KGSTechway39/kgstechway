import { useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  FaQuoteLeft, 
  FaStar, 
  FaChevronLeft, 
  FaChevronRight
} from 'react-icons/fa';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  const { isDarkMode, primaryColor } = useSelector((state: any) => state.theme);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CTO',
      company: 'TechCorp Solutions',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'KGSTechway delivered exceptional Software Product Development services for our enterprise platform. Their end-to-end approach and technical expertise helped us launch our product 3 months ahead of schedule.',
      project: 'Software Product Development',
      logo: 'TC'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Product Manager',
      company: 'InnovateLabs',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'The AI Solutions developed by KGSTechway transformed our business intelligence capabilities. Their machine learning models increased our prediction accuracy by 85% and automated our entire analytics workflow.',
      project: 'AI Solutions Implementation',
      logo: 'IL'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'VP Operations',
      company: 'BusinessFlow Corp',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'KGSTechway\'s CRM/ERP Services revolutionized our business operations. Their custom solution integrated all our departments seamlessly, improving efficiency by 60% and providing real-time visibility across the organization.',
      project: 'CRM/ERP Implementation',
      logo: 'BF'
    },
    {
      id: 4,
      name: 'David Wilson',
      position: 'Chief Innovation Officer',
      company: 'FutureSync Technologies',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'The Agentic AI Solutions from KGSTechway are game-changing. Their autonomous AI agents handle complex decision-making processes, reducing manual intervention by 90% and improving our response times dramatically.',
      project: 'Agentic AI Solutions',
      logo: 'FS'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      position: 'Head of Digital',
      company: 'RetailMax',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'KGSTechway\'s comprehensive Software Product Development approach helped us build a scalable e-commerce platform. Their AI-powered recommendation system increased our sales conversion by 250%.',
      project: 'E-commerce Platform Development',
      logo: 'RM'
    },
    {
      id: 6,
      name: 'James Anderson',
      position: 'Founder & CEO',
      company: 'FinTech Innovations',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'KGSTechway\'s integrated approach combining AI Solutions with CRM/ERP Services transformed our financial operations. Their intelligent automation reduced processing time by 80% while maintaining 99.9% accuracy.',
      project: 'AI-Powered Financial Management System',
      logo: 'FI'
    }
  ];

  // const clientLogos = [
  //   { name: 'TechCorp', logo: 'TC', color: '#0066cc' },
  //   { name: 'InnovateLabs', logo: 'IL', color: '#ff6b35' },
  //   { name: 'BusinessFlow', logo: 'BF', color: '#28a745' },
  //   { name: 'FutureSync', logo: 'FS', color: '#6f42c1' },
  //   { name: 'RetailMax', logo: 'RM', color: '#dc3545' },
  //   { name: 'FinTech', logo: 'FI', color: '#fd7e14' },
  //   { name: 'SmartCorp', logo: 'SC', color: '#20c997' },
  //   { name: 'DataVision', logo: 'DV', color: '#e83e8c' }
  // ];

  // const stats = [
  //   {
  //     icon: <FaUsers />,
  //     number: '50+',
  //     label: 'Happy Clients',
  //     color: '#0066cc'
  //   },
  //   {
  //     icon: <FaAward />,
  //     number: '98%',
  //     label: 'Success Rate',
  //     color: '#28a745'
  //   },
  //   {
  //     icon: <FaHandshake />,
  //     number: '500+',
  //     label: 'Projects Delivered',
  //     color: '#ff6b35'
  //   },
  //   {
  //     icon: <FaBuilding />,
  //     number: '15+',
  //     label: 'Industries Served',
  //     color: '#6f42c1'
  //   }
  // ];

  const handlePrevious = () => {
    setActiveIndex(activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex(activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section id="testimonials" className={`testimonials-section ${isDarkMode ? 'dark' : 'light'}`}>
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-header text-center"
        >
          <div className="section-badge">
            <FaQuoteLeft className="me-2" />
            Client Testimonials
          </div>
          <h2 className="section-title">
            What Our Clients Say About
            <span className="gradient-text"> Our Work</span>
          </h2>
          <p className="section-description">
            Don't just take our word for it. Hear from the clients who have experienced 
            the transformation and success that comes with partnering with KGSTechway.
          </p>
        </motion.div>

        {/* Main Testimonial Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="testimonial-showcase"
        >
          <div className="testimonial-container">
            <div className="testimonial-navigation">
              <button 
                onClick={handlePrevious}
                className="nav-button prev"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                <FaChevronLeft />
              </button>
              
              <button 
                onClick={handleNext}
                className="nav-button next"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                <FaChevronRight />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="testimonial-card-wrapper"
              >
                <Card className={`testimonial-card ${isDarkMode ? 'dark' : 'light'}`}>
                  <div className="testimonial-content">
                    <div className="quote-icon">
                      <FaQuoteLeft style={{ color: primaryColor }} />
                    </div>
                    
                    <div className="rating">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="star" style={{ color: '#ffc107' }} />
                      ))}
                    </div>

                    <p className="testimonial-text">"{currentTestimonial.text}"</p>
                    
                    <div className="project-info">
                      <span className="project-label">Project:</span>
                      <span className="project-name">{currentTestimonial.project}</span>
                    </div>
                  </div>

                  <div className="client-info">
                    <div className="client-avatar">
                      <img 
                        src={currentTestimonial.image} 
                        alt={currentTestimonial.name}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                      <div 
                        className="avatar-fallback"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div className="client-details">
                      <h5 className="client-name">{currentTestimonial.name}</h5>
                      <p className="client-position">{currentTestimonial.position}</p>
                      <p className="client-company">{currentTestimonial.company}</p>
                    </div>
                    <div className="company-logo">
                      <div 
                        className="logo-placeholder"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {currentTestimonial.logo}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Indicators */}
            <div className="testimonial-indicators">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`indicator ${index === activeIndex ? 'active' : ''}`}
                  style={{ 
                    backgroundColor: index === activeIndex ? primaryColor : 'transparent',
                    borderColor: primaryColor 
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Client Logos */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="client-logos-section"
        >
          <h3 className="logos-title">Trusted by Industry Leaders</h3>
          <div className="logos-grid">
            {clientLogos.map((client, index) => (
              <motion.div
                key={index}
                className="logo-item"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div 
                  className="logo-circle"
                  style={{ backgroundColor: client.color }}
                >
                  {client.logo}
                </div>
                <span className="logo-name">{client.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Stats Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="testimonial-stats"
        >
          <Row>
            {stats.map((stat, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="stat-item text-center"
                >
                  <div className="stat-icon" style={{ color: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="stat-number" style={{ color: stat.color }}>
                    {stat.number}
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div> */}
      </Container>
    </section>
  );
};

export default TestimonialsSection;