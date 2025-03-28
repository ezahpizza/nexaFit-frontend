
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

  useEffect(() => {
    // Set username when user data is loaded
    if (isLoaded && user) {
      setUsername(user.firstName || user.username || 'User');
    }
  }, [isLoaded, user]);

  return (
    <div className="relative min-h-screen bg-nexafit-background text-black overflow-hidden">
      <BackgroundElements />
      <Navbar />
      
      <section className="w-full px-4 pt-4 opacity-0 animate-fade-in">
        <HeaderImage shrinkToHeight="65vh" />
      </section>
      
      <section className="px-4 -mt-20 sm:-mt-24 md:-mt-32 relative z-10 opacity-0 animate-fade-in animation-delay-300">
        <FeatureOverlay username={username} />
      </section>
      
      <section className="mt-8 px-4 opacity-0 animate-fade-in animation-delay-500">
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
