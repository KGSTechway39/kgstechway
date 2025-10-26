import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock,
  FaPaperPlane,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaWhatsapp,
  FaRocket,
  FaUsers,
  FaLightbulb,
  FaCheckCircle
} from 'react-icons/fa';
import './ContactSection.css';

const ContactSection = () => {
  const { isDarkMode, primaryColor } = useSelector((state: any) => state.theme);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'danger'>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAlertType('success');
      setShowAlert(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        timeline: '',
        message: ''
      });
      
      setTimeout(() => setShowAlert(false), 5000);
    } catch (error) {
      setAlertType('danger');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email Us',
      info: 'sales@kgstechway.com',
      subInfo: 'We respond within 24 hours',
      color: '#0066cc'
    },
    {
      icon: <FaPhone />,
      title: 'Call Us',
      info: '+91 8248718780',
      subInfo: 'Mon-Fri 9AM-6PM IST',
      color: '#28a745'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Visit Us',
      info: 'Krishnagiri, Tamil Nadu, India',
      subInfo: 'Schedule an appointment',
      color: '#ff6b35'
    },
    {
      icon: <FaClock />,
      title: 'Business Hours',
      info: 'Monday - Friday',
      subInfo: '9:00 AM - 6:00 PM EST',
      color: '#6f42c1'
    }
  ];

  const socialLinks = [
    { icon: <FaLinkedin />, url: '#', color: '#0077b5' },
    { icon: <FaTwitter />, url: '#', color: '#1da1f2' },
    { icon: <FaGithub />, url: '#', color: '#333' },
    { icon: <FaWhatsapp />, url: '#', color: '#25d366' }
  ];

  const services = [
    'Software Product Development/Services',
    'AI Solutions',
    'CRM/ERP Services',
    'Agentic AI Solutions',
    'Other'
  ];

  const budgetRanges = [
    'Under $10,000',
    '$10,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000 - $250,000',
    '$250,000+',
    'Let\'s discuss'
  ];

  const timelines = [
    'ASAP',
    '1-3 months',
    '3-6 months',
    '6-12 months',
    '12+ months',
    'Flexible'
  ];

  const whyChooseUs = [
    {
      icon: <FaRocket />,
      title: 'Fast Delivery',
      description: 'We deliver projects on time with agile methodologies'
    },
    {
      icon: <FaUsers />,
      title: 'Expert Team',
      description: 'Skilled professionals'
    },
    {
      icon: <FaLightbulb />,
      title: 'Innovation',
      description: 'Cutting-edge solutions for modern challenges'
    }
  ];

  return (
    <section id="contact" className={`contact-section ${isDarkMode ? 'dark' : 'light'}`}>
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
            <FaEnvelope className="me-2" />
            Get In Touch
          </div>
          <h2 className="section-title">
            Ready to Start Your
            <span className="gradient-text"> Digital Journey?</span>
          </h2>
          <p className="section-description">
            Let's discuss your project requirements and how we can help transform 
            your ideas into powerful digital solutions.
          </p>
        </motion.div>

        <Row>
          {/* Contact Form */}
          <Col lg={8}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className={`contact-form-card ${isDarkMode ? 'dark' : 'light'}`}>
                <Card.Body>
                  <div className="form-header">
                    <h3>Tell Us About Your Project</h3>
                    <p>Fill out the form below and we'll get back to you within 24 hours</p>
                  </div>

                  {showAlert && (
                    <Alert 
                      variant={alertType} 
                      className="custom-alert"
                      onClose={() => setShowAlert(false)} 
                      dismissible
                    >
                      <FaCheckCircle className="me-2" />
                      {alertType === 'success' 
                        ? 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.'
                        : 'Something went wrong. Please try again or contact us directly.'
                      }
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="contact-name">Full Name *</Form.Label>
                          <Form.Control
                            id="contact-name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            required
                            className="custom-input"
                            aria-describedby="name-help"
                          />
                          <Form.Text id="name-help" className="visually-hidden">
                            Enter your full name for contact purposes
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            required
                            className="custom-input"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 9876543210"
                            className="custom-input"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Company</Form.Label>
                          <Form.Control
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Your company name"
                            className="custom-input"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Service Needed *</Form.Label>
                          <Form.Select
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                            required
                            className="custom-select"
                          >
                            <option value="">Select a service</option>
                            {services.map((service, index) => (
                              <option key={index} value={service}>{service}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Budget Range</Form.Label>
                          <Form.Select
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="custom-select"
                          >
                            <option value="">Select budget range</option>
                            {budgetRanges.map((budget, index) => (
                              <option key={index} value={budget}>{budget}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Timeline</Form.Label>
                          <Form.Select
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleInputChange}
                            className="custom-select"
                          >
                            <option value="">Select timeline</option>
                            {timelines.map((timeline, index) => (
                              <option key={index} value={timeline}>{timeline}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label>Project Details *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please describe your project requirements, goals, and any specific features you need..."
                        required
                        className="custom-textarea"
                      />
                    </Form.Group>

                    <div className="form-footer">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="submit-btn"
                        style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="me-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                      <p className="form-note">
                        By submitting this form, you agree to our privacy policy and terms of service.
                      </p>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          {/* Contact Information */}
          <Col lg={4}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="contact-info-section"
            >
              {/* Contact Cards */}
              <div className="contact-cards">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className={`contact-info-card ${isDarkMode ? 'dark' : 'light'}`}>
                      <div className="contact-icon" style={{ color: item.color }}>
                        {item.icon}
                      </div>
                      <div className="contact-details">
                        <h5>{item.title}</h5>
                        <p className="contact-primary">{item.info}</p>
                        <p className="contact-secondary">{item.subInfo}</p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Why Choose Us */}
              <Card className={`why-choose-card ${isDarkMode ? 'dark' : 'light'}`}>
                <Card.Body>
                  <h4>Why Choose KGSTechway?</h4>
                  <div className="why-choose-list">
                    {whyChooseUs.map((item, index) => (
                      <div key={index} className="why-choose-item">
                        <div className="why-icon" style={{ color: primaryColor }}>
                          {item.icon}
                        </div>
                        <div className="why-content">
                          <h6>{item.title}</h6>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>

              {/* Social Links */}
              <Card className={`social-card ${isDarkMode ? 'dark' : 'light'}`}>
                <Card.Body>
                  <h5>Follow Us</h5>
                  <div className="social-links">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        className="social-link"
                        style={{ color: social.color }}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                  <p className="social-text">
                    Stay updated with our latest projects and tech insights
                  </p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactSection;