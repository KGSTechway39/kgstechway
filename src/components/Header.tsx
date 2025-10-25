import { useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setScrollY, setActiveSection, toggleMenu, setMenuOpen } from '../store/navigationSlice';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const { isScrolled, activeSection, isMenuOpen } = useSelector((state: any) => state.navigation);
  const { isDarkMode, primaryColor } = useSelector((state: any) => state.theme);

  useEffect(() => {
    const handleScroll = () => {
      dispatch(setScrollY(window.scrollY));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'technology', label: 'Technology' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (sectionId: string) => {
    dispatch(setActiveSection(sectionId));
    dispatch(setMenuOpen(false));
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Navbar
        expand="lg"
        fixed="top"
        className={`modern-navbar ${isScrolled ? 'scrolled' : ''} ${isDarkMode ? 'dark' : 'light'}`}
        style={{ 
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(0, 102, 204, 0.1)' : 'none'
        }}
      >
        <Container>
          <Navbar.Brand 
            href="#home" 
            className="brand-logo"
            onClick={() => handleNavClick('home')}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="brand-text"
              style={{ color: primaryColor }}
            >
              <span className="brand-name"></span>
              <span className="brand-tagline">Service</span>
            </motion.div>
          </Navbar.Brand>

          <div className="mobile-menu-toggle d-lg-none">
            <Button
              variant="link"
              onClick={() => dispatch(toggleMenu())}
              className="menu-toggle-btn"
              style={{ color: primaryColor }}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </Button>
          </div>

          <Navbar.Collapse in={isMenuOpen} className="justify-content-center">
            <Nav className="mx-auto nav-items">
              {navItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Nav.Link
                    href={`#${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                  >
                    {item.label}
                  </Nav.Link>
                </motion.div>
              ))}
            </Nav>
          </Navbar.Collapse>

          <div className="d-none d-lg-block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="primary"
                size="lg"
                className="cta-btn"
                onClick={() => handleNavClick('contact')}
                style={{ 
                  backgroundColor: primaryColor,
                  borderColor: primaryColor 
                }}
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default Header;