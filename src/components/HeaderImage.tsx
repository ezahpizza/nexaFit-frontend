
import { useEffect, useState } from 'react';

interface HeaderImageProps {
  shrinkToHeight?: string;
}

const HeaderImage = ({ shrinkToHeight = '35vh' }: HeaderImageProps) => {
  const [isShrinked, setIsShrinked] = useState(false);

  useEffect(() => {
    // Auto-shrink the hero after a delay (for initial animation)
    const timer = setTimeout(() => {
      setIsShrinked(true);
    }, 1000);
    
    // Listen to scroll to determine if we should shrink the hero
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsShrinked(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      className={`
        relative w-full rounded-3xl overflow-hidden shadow-lg 
        transition-all duration-1000 ease-out
        ${isShrinked ? shrinkToHeight : 'h-[95vh]'}
      `}
    >
      <img 
        src="/lovable-uploads/9e96c0fb-1b34-49b5-95ec-afa5f645eec1.png" 
        alt="NexaFit header" 
        className="w-full h-full object-cover object-center"
      />
      
      <div
        className={`
          absolute left-14 bottom-14 text-white text-4xl font-bold z-10
          origin-bottom-left transition-transform duration-700 ease-in-out
          ${isShrinked ? '-rotate-90 translate-y-8' : ''}
        `}
      >
        <h1 className="tracking-tight">nexaFit</h1>
      </div>
    </div>
  );
};

export default HeaderImage;
