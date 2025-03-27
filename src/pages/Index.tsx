import { useEffect } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import MainContent from '../components/MainContent';
import SecondaryContent from '../components/SecondaryContent';
import Footer from '../components/Footer';
import BackgroundElements from '../components/BackgroundElements';

const Index = () => {
  useEffect(() => {
    // Add animation class to elements when they are in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0');
        }
      });
    }, { threshold: 0.1 });

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-nexafit-background text-black overflow-hidden">
      <BackgroundElements />
      <Header />
      <Navbar />
      
      <section className="opacity-0 transition-opacity duration-500">
        <MainContent />
      </section>
      
      <section className="opacity-0 transition-opacity duration-500">
        <SecondaryContent />
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;