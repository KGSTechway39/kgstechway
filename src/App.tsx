import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import TechnologySection from './components/TechnologySection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <main>
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <TechnologySection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
