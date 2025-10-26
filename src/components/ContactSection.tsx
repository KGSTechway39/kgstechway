import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import emailjs from '@emailjs/browser';
import { emailConfig } from '../config/emailConfig';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock,
  FaPaperPlane,
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
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters long';
        return '';
      case 'email':
        if (!value.trim()) return 'Email address is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      case 'service':
        if (!value) return 'Please select a service';
        return '';
      case 'message':
        if (!value.trim()) return 'Project details are required';
        if (value.trim().length < 10) return 'Please provide more details (at least 10 characters)';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all mandatory fields
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      service: validateField('service', formData.service),
      message: validateField('message', formData.message)
    };

    setErrors(newErrors);
    setValidated(true);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    
    if (hasErrors) {
      return; // Don't submit if there are validation errors
    }

    setIsSubmitting(true);

    try {
      // Check if EmailJS is properly configured
      // if (emailConfig.publicKey === "" || 
      //     emailConfig.serviceId === 'service_kgstechway' ||
      //     emailConfig.templateId === 'template_contact') {
      //   throw new Error('EmailJS not configured. Please set up your EmailJS credentials.');
      // }

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        company: formData.company || 'Not provided',
        service: formData.service,
        budget: formData.budget || 'Not specified',
        timeline: formData.timeline || 'Not specified',
        message: formData.message,
        date: new Date().toLocaleString('en-IN', { 
          timeZone: 'Asia/Kolkata',
          dateStyle: 'full',
          timeStyle: 'short'
        })
      };

      // Send email using EmailJS
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams,
        emailConfig.publicKey
      );
      
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
      
      // Clear validation state
      setValidated(false);
      setErrors({
        name: '',
        email: '',
        service: '',
        message: ''
      });
      
      setTimeout(() => setShowAlert(false), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
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
      subInfo: '9:00 AM - 6:00 PM IST',
      color: '#6f42c1'
    }
  ];

  // const socialLinks = [
  //   { icon: <FaLinkedin />, url: '#', color: '#0077b5' },
  //   { icon: <FaTwitter />, url: '#', color: '#1da1f2' },
  //   { icon: <FaGithub />, url: '#', color: '#333' },
  //   { icon: <FaWhatsapp />, url: '#', color: '#25d366' }
  // ];

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

        {/* Contact Form - Full Width */}
        <Row>
          <Col xs={12} className="mb-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
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
                        ? 'Thank you! Your message has been sent successfully to kgstechwayservices@gmail.com. We\'ll get back to you within 24 hours.'
                        : 'Failed to send email. Please try again or contact us directly at kgstechwayservices@gmail.com.'
                      }
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit} noValidate>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3 w-100">
                          <Form.Label htmlFor="contact-name">Full Name *</Form.Label>
                          <Form.Control
                            id="contact-name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                            className="custom-input"
                            aria-describedby="name-help"
                            isInvalid={!!errors.name}
                            isValid={validated && !errors.name && formData.name.trim() !== ''}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.name}
                          </Form.Control.Feedback>
                          <Form.Text id="name-help" className="visually-hidden">
                            Enter your full name for contact purposes
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3 w-100">
                          <Form.Label>Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                            required
                            className="custom-input"
                            isInvalid={!!errors.email}
                            isValid={validated && !errors.email && formData.email.trim() !== ''}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3 w-100">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            className="custom-input"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3 w-100">
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
                        <Form.Group className="mb-3 w-100">
                          <Form.Label>Service Needed *</Form.Label>
                          <Form.Select
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                            required
                            className="custom-select"
                            isInvalid={!!errors.service}
                            isValid={validated && !errors.service && formData.service !== ''}
                          >
                            <option value="">Select a service</option>
                            {services.map((service, index) => (
                              <option key={index} value={service}>{service}</option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.service}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3 w-100">
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
                        <Form.Group className="mb-3 w-100">
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
                        isInvalid={!!errors.message}
                        isValid={validated && !errors.message && formData.message.trim() !== ''}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.message}
                      </Form.Control.Feedback>
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
        </Row>

        {/* Contact Information Cards */}
        <Row className="mb-5">
          <Col xs={12} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="contact-info-title">Get In Touch With Us</h3>
            </motion.div>
          </Col>
          {contactInfo.map((item, index) => (
            <Col lg={3} md={6} xs={12} key={index} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                style={{ width: '100%' }}
              >
                <Card className={`contact-info-card-full ${isDarkMode ? 'dark' : 'light'} h-100`}>
                  <Card.Body className="text-center">
                    <div className="contact-icon-large mb-3" style={{ color: item.color }}>
                      {item.icon}
                    </div>
                    <h5 className="contact-card-title">{item.title}</h5>
                    <p className="contact-card-primary">{item.info}</p>
                    <p className="contact-card-secondary">{item.subInfo}</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Why Choose Us Section */}
        <Row className="mt-5">
          <Col xs={12} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="why-choose-title">Why Choose KGSTechway?</h3>
            </motion.div>
          </Col>
          {whyChooseUs.map((item, index) => (
            <Col lg={4} md={6} xs={12} key={index} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                style={{width: '100%'}}
              >
                <Card className={`why-choose-individual-card ${isDarkMode ? 'dark' : 'light'} h-100`}>
                  <Card.Body className="text-center">
                    <div className="why-icon-large mb-3" style={{ color: primaryColor }}>
                      {item.icon}
                    </div>
                    <h5 className="why-card-title">{item.title}</h5>
                    <p className="why-card-description">{item.description}</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ContactSection;