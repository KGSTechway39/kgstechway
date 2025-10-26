import { Suspense, lazy, useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import PerformanceMonitor from './components/PerformanceMonitor';
import { SkipNavigation } from './hooks/useFocusManagement';
import './App.css';
import { Analytics } from '@vercel/analytics/react';
import CloudDevOpsPage from './pages/CloudDevOpsPage';
import MobileDevelopmentPage from './pages/MobileDevelopmentPage';

// Lazy load components and pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const TechnologyPage = lazy(() => import('./pages/TechnologyPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const SoftwareProductDevelopmentPage = lazy(() => import('./pages/SoftwareProductDevelopmentPage'));
const AISolutionsPage = lazy(() => import('./pages/AISolutionsPage'));
const CRMERPServicesPage = lazy(() => import('./pages/CRMERPServicesPage'));
const AgenticAIPage = lazy(() => import('./pages/AgenticAIPage'));
const Footer = lazy(() => import('./components/Footer'));

// Theme wrapper component to apply theme data attribute
const ThemeWrapper = () => {
  const { isDarkMode } = useSelector((state: any) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
  }, [isDarkMode]);

  return (
    <Router>
      <ErrorBoundary>
        <PerformanceMonitor />
        <SkipNavigation />
        <Analytics />
        <div className="App">
          <Header />
          <main>
            <ErrorBoundary fallback={<LoadingSpinner text="Failed to load page..." />}>
              <Suspense fallback={<LoadingSpinner text="Loading..." />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/technology" element={<TechnologyPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/services/software-development" element={<SoftwareProductDevelopmentPage />} />
                  <Route path="/services/ai-solutions" element={<AISolutionsPage />} />
                  <Route path="/services/crm-erp" element={<CRMERPServicesPage />} />
                  <Route path="/services/agentic-ai" element={<AgenticAIPage />} />
                  <Route path="/services/cloud-devops" element={<CloudDevOpsPage />} />
                  <Route path="/services/mobile-development" element={<MobileDevelopmentPage />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </main>
          <ErrorBoundary fallback={<LoadingSpinner text="Failed to load footer..." />}>
            <Suspense fallback={<LoadingSpinner text="Loading..." />}>
              <Footer />
            </Suspense>
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    </Router>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemeWrapper />
    </Provider>
  );
}

export default App;
