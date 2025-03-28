
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import Navbar from '../components/Navbar';
import HeaderImage from '../components/HeaderImage';
import FeatureOverlay from '../components/FeatureOverlay';
import ImageCarousel from '../components/ImageCarousel';
import Footer from '../components/Footer';
import BackgroundElements from '../components/BackgroundElements';

const Home = () => {
  const { user, isLoaded } = useUser();
  const [username, setUsername] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set username when user data is loaded
    if (isLoaded && user) {
      setUsername(user.firstName || user.username || 'User');
    }
    
    // Make content visible after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isLoaded, user]);

  return (
    <div className="relative min-h-screen bg-nexafit-background text-black overflow-hidden">
      <BackgroundElements />
      <Navbar />
      
      <section className={`w-full px-4 pt-4 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <HeaderImage shrinkToHeight="65vh" />
      </section>
      
      <section className={`px-4 -mt-20 sm:-mt-24 md:-mt-32 relative z-10 transition-opacity duration-500 ease-in-out delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <FeatureOverlay username={username} />
      </section>
      
      <section className={`mt-8 px-4 transition-opacity duration-500 ease-in-out delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-2xl font-medium mb-4">Featured Content</h2>
        <ImageCarousel 
          images={[
            "/loader-test.webp",
            "/loader-test.webp",
            "/loader-test.webp"
          ]} 
        />
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
