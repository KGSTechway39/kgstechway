import { useEffect, useCallback, useMemo, memo } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setScrollY, setActiveSection, toggleMenu, setMenuOpen } from '../store/navigationSlice';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isScrolled, activeSection, isMenuOpen } = useSelector((state: any) => state.navigation);
  const { isDarkMode, primaryColor } = useSelector((state: any) => state.theme);

  // Check if current page is a service detail page
  const isServiceDetailPage = location.pathname.startsWith('/services/');

  // Throttle scroll events for better performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          dispatch(setScrollY(window.scrollY));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  // Memoize navigation items to prevent re-creation on every render
  const navItems = useMemo(() => [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'technology', label: 'Technology' },
    // { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ], []);

  // Memoize click handler to prevent unnecessary re-renders
  const handleNavClick = useCallback((sectionId: string) => {
    dispatch(setActiveSection(sectionId));
    dispatch(setMenuOpen(false));
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dispatch]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      role="banner"
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
        role="navigation"
        aria-label="Main navigation"
      >
        <Container>
          <Navbar.Brand 
            href="#home" 
            className="brand-logo"
            onClick={() => handleNavClick('home')}
            aria-label="KGSTechway Service - Go to homepage"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="brand-text"
              style={{ color: primaryColor }}
            >
              <span className="brand-name">KGSTechway</span>
              <span className="brand-tagline">Service</span>
            </motion.div>
          </Navbar.Brand>

          <div className="mobile-menu-toggle d-lg-none">
            <div className="mobile-header-actions">
              <ThemeToggle />
              {!isServiceDetailPage && (
                <Button
                  variant="link"
                  onClick={() => dispatch(toggleMenu())}
                  className="menu-toggle-btn"
                  style={{ color: primaryColor }}
                  aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={isMenuOpen}
                  aria-controls="main-navigation"
                >
                  {isMenuOpen ? <FaTimes size={24} aria-hidden="true" /> : <FaBars size={24} aria-hidden="true" />}
                </Button>
              )}
            </div>
          </div>

          {!isServiceDetailPage && (
            <Navbar.Collapse in={isMenuOpen} className="justify-content-center" id="main-navigation">
              <Nav className="mx-auto nav-items" role="menubar">
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
                      role="menuitem"
                      aria-current={activeSection === item.id ? 'page' : undefined}
                      tabIndex={0}
                    >
                      {item.label}
                    </Nav.Link>
                  </motion.div>
                ))}
              </Nav>
            </Navbar.Collapse>
          )}

          <div className="header-actions d-none d-lg-flex align-items-center">
            <ThemeToggle />
            {!isServiceDetailPage && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="cta-btn"
                  onClick={() => handleNavClick('contact')}
                  aria-label="Get started with KGSTechway services"
                  style={{ 
                    backgroundColor: primaryColor,
                    borderColor: primaryColor 
                  }}
                >
                  Get Started
                </Button>
              </motion.div>
            )}
          </div>
        </Container>
      </Navbar>
    </motion.header>
  );
});

Header.displayName = 'Header';
export default Header;