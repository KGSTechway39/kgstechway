import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaRocket } from 'react-icons/fa';
import './ServiceDetailPage.css';

const ComingSoonPage: React.FC<{ serviceName: string; description: string; icon?: React.ReactNode }> = ({ 
  serviceName, 
  description, 
  icon = <FaRocket /> 
}) => {
  const { isDarkMode } = useSelector((state: any) => state.theme);

  return (
    <div className={`service-detail-page ${isDarkMode ? 'dark' : 'light'}`}>
      <section className="service-hero">
        <Container>
          <Row className="align-items-center min-vh-100 py-5">
            <Col lg={8} className="mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Link to="/" className="back-link mb-3 d-inline-flex align-items-center">
                  <FaArrowLeft className="me-2" />
                  Back to Services
                </Link>
                
                <div className="service-icon-large mb-4 mx-auto">
                  {icon}
                </div>
                
                <h1 className="hero-title">
                  {serviceName}
                  <span className="gradient-text"> Coming Soon</span>
                </h1>
                
                <p className="hero-description">
                  {description}
                </p>

                <Card className={`cta-card mt-5 ${isDarkMode ? 'dark' : 'light'}`}>
                  <Card.Body className="py-5">
                    <h3 className="cta-title">We're Working on Something Amazing!</h3>
                    <p className="cta-description">
                      Our detailed {serviceName.toLowerCase()} page is currently under development. 
                      In the meantime, feel free to contact us to learn more about our services.
                    </p>
                    <div className="cta-actions">
                      <Button size="lg" className="primary-btn me-3">
                        Contact Us
                      </Button>
                      <Button variant="outline-primary" size="lg" onClick={() => window.history.back()}>
                        Go Back
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ComingSoonPage;