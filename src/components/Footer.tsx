import React from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic would go here
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row className="mb-4">
          <Col lg={3} md={6} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h5 className="text-primary mb-3">KGSTechway</h5>
              <p className="mb-3">
                Leading provider of innovative technology solutions, specializing in software development, 
                AI solutions, and enterprise services.
              </p>
              <div className="d-flex gap-3">
                <a href="https://linkedin.com/company/kgstechway" className="text-light fs-4" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
                <a href="https://twitter.com/kgstechway" className="text-light fs-4" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="https://facebook.com/kgstechway" className="text-light fs-4" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="https://instagram.com/kgstechway" className="text-light fs-4" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://github.com/kgstechway" className="text-light fs-4" aria-label="GitHub">
                  <FaGithub />
                </a>
              </div>
            </motion.div>
          </Col>

          <Col lg={2} md={6} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h6 className="text-primary mb-3">Services</h6>
              <ListGroup variant="flush" className="bg-transparent">
                <ListGroup.Item className="bg-transparent border-0 p-0 mb-2">
                  <a href="#services" className="text-light text-decoration-none">
                    Software Development
                  </a>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 p-0 mb-2">
                  <a href="#services" className="text-light text-decoration-none">
                    AI Solutions
                  </a>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 p-0 mb-2">
                  <a href="#services" className="text-light text-decoration-none">
                    CRM/ERP Services
                  </a>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 p-0">
                  <a href="#services" className="text-light text-decoration-none">
                    Agentic AI Solutions
                  </a>
                </ListGroup.Item>
              </ListGroup>
            </motion.div>
          </Col>

          <Col lg={2} md={6} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h6 className="text-primary mb-3">Company</h6>
              <ListGroup variant="flush" className="bg-transparent">
                <ListGroup.Item className="bg-transparent border-0 p-0 mb-2">
                  <a href="#about" className="text-light text-decoration-none">
                    About Us
                  </a>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 p-0 mb-2">
                  <a href="#technology" className="text-light text-decoration-none">
                    Technology
                  </a>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 p-0 mb-2">
                  <a href="#testimonials" className="text-light text-decoration-none">
                    Testimonials
                  </a>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 p-0 mb-2">
                  <a href="/careers" className="text-light text-decoration-none">
                    Careers
                  </a>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 p-0">
                  <a href="/blog" className="text-light text-decoration-none">
                    Blog
                  </a>
                </ListGroup.Item>
              </ListGroup>
            </motion.div>
          </Col>

          <Col lg={2} md={6} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h6 className="text-primary mb-3">Support</h6>
              <ListGroup variant="flush" className="bg-transparent">
                <ListGroup.Item className="bg-transparent border-0 p-0 mb-2">
                  <a href="#contact" className="text-light text-decoration-none">
                    Contact Us
                  </a>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 p-0 mb-2">
                  <a href="/support" className="text-light text-decoration-none">
                    Help Center
                  </a>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 p-0 mb-2">
                  <a href="/privacy" className="text-light text-decoration-none">
                    Privacy Policy
                  </a>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 p-0">
                  <a href="/terms" className="text-light text-decoration-none">
                    Terms of Service
                  </a>
                </ListGroup.Item>
              </ListGroup>
            </motion.div>
          </Col>

          <Col lg={3} md={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h6 className="text-primary mb-3">Contact Info</h6>
              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  <FaPhone className="me-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <FaEnvelope className="me-2" />
                  <span>info@kgstechway.com</span>
                </div>
                <div className="d-flex align-items-start">
                  <FaMapMarkerAlt className="me-2 mt-1" />
                  <span>123 Tech Street<br />Innovation City, IC 12345</span>
                </div>
              </div>
              
              <h6 className="text-primary mb-3">Newsletter</h6>
              <Form onSubmit={handleNewsletterSubmit}>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="bg-dark border-secondary text-light"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" size="sm" className="w-100">
                  Subscribe
                </Button>
              </Form>
            </motion.div>
          </Col>
        </Row>

        <hr className="border-secondary my-4" />

        <Row className="align-items-center">
          <Col md={6}>
            <motion.p
              className="mb-0 text-muted"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              © {currentYear} KGSTechway. All rights reserved.
            </motion.p>
          </Col>
          <Col md={6} className="text-md-end">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <small className="text-muted">
                Built with ❤️ using React & TypeScript
              </small>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;