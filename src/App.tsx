import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import PerformanceMonitor from './components/PerformanceMonitor';
import './App.css';

// Lazy load heavy components for better performance
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const TechnologySection = lazy(() => import('./components/TechnologySection'));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PerformanceMonitor />
        <div className="App">
          <Header />
          <main>
            <HeroSection />
            <ErrorBoundary fallback={<LoadingSpinner text="Failed to load services..." />}>
              <Suspense fallback={<LoadingSpinner text="Loading Services..." />}>
                <ServicesSection />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary fallback={<LoadingSpinner text="Failed to load about..." />}>
              <Suspense fallback={<LoadingSpinner text="Loading About..." />}>
                <AboutSection />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary fallback={<LoadingSpinner text="Failed to load technology..." />}>
              <Suspense fallback={<LoadingSpinner text="Loading Technology..." />}>
                <TechnologySection />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary fallback={<LoadingSpinner text="Failed to load testimonials..." />}>
              <Suspense fallback={<LoadingSpinner text="Loading Testimonials..." />}>
                <TestimonialsSection />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary fallback={<LoadingSpinner text="Failed to load contact..." />}>
              <Suspense fallback={<LoadingSpinner text="Loading Contact..." />}>
                <ContactSection />
              </Suspense>
            </ErrorBoundary>
          </main>
          <ErrorBoundary fallback={<LoadingSpinner text="Failed to load footer..." />}>
            <Suspense fallback={<LoadingSpinner text="Loading..." />}>
              <Footer />
            </Suspense>
          </ErrorBoundary>
        </div>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
