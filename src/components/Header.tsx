import { useEffect, useCallback, useMemo, memo } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { setScrollY, setActiveSection, toggleMenu, setMenuOpen } from '../store/navigationSlice';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
// import ThemeToggle from './ThemeToggle';
import BrandLogo from './BrandLogo';
import './Header.css';

const Header = memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isScrolled, activeSection, isMenuOpen } = useSelector((state: any) => state.navigation);
  const { isDarkMode, primaryColor } = useSelector((state: any) => state.theme);

  // Check if current page is a service detail page
  // const isServiceDetailPage = location.pathname.startsWith('/services/');

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
    { id: 'home', label: 'Home', path: '/' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'technology', label: 'Technology', path: '/technology' },
    { id: 'contact', label: 'Contact', path: '/contact' }
  ], []);

  // Set active section based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/') {
      dispatch(setActiveSection('home'));
    } else if (currentPath === '/services') {
      dispatch(setActiveSection('services'));
    } else if (currentPath === '/about') {
      dispatch(setActiveSection('about'));
    } else if (currentPath === '/technology') {
      dispatch(setActiveSection('technology'));
    } else if (currentPath === '/contact') {
      dispatch(setActiveSection('contact'));
    }
  }, [location.pathname, dispatch]);

  // Memoize click handler to prevent unnecessary re-renders
  const handleNavClick = useCallback((path: string, sectionId: string) => {
    dispatch(setActiveSection(sectionId));
    dispatch(setMenuOpen(false));
    
    // Scroll to top and navigate
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Navigate to the path
    navigate(path);
  }, [dispatch, navigate]);

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
        role="navigation"
        aria-label="Main navigation"
      >
        <Container>
          <Navbar.Brand 
            as={Link}
            to="/" 
            className="brand-logo"
            onClick={() => handleNavClick('/', 'home')}
            aria-label="KGSTechway Service - Go to homepage"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <BrandLogo size="md" showTagline={true} onDark={isDarkMode || !isScrolled} />
            </motion.div>
          </Navbar.Brand>

          <div className="mobile-menu-toggle d-lg-none">
            <div className="mobile-header-actions">
              {/* <ThemeToggle /> */}
              {/* {!isServiceDetailPage && ( */}
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
              {/* )} */}
            </div>
          </div>

          {/* {!isServiceDetailPage && ( */}
            <Navbar.Collapse in={isMenuOpen} className="justify-content-center" id="main-navigation">
              <Nav className="mx-auto nav-items" role="menubar">
                {navItems.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                                      <Nav.Link
                    as={Link}
                    to={item.path}
                    onClick={() => handleNavClick(item.path, item.id)}
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
          {/* )} */}

          <div className="header-actions d-none d-lg-flex align-items-center">
            {/* <ThemeToggle /> */}
            {/* {!isServiceDetailPage && ( */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="cta-btn"
                  onClick={() => handleNavClick('/contact', 'contact')}
                  aria-label="Get started with KGSTechway services"
                  style={{ 
                    backgroundColor: primaryColor,
                    borderColor: primaryColor 
                  }}
                >
                  Get Started
                </Button>
              </motion.div>
            {/* )} */}
          </div>
        </Container>
      </Navbar>
    </motion.header>
  );
});

Header.displayName = 'Header';
export default Header;