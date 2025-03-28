
import { useEffect, useState } from 'react';

interface HeaderImageProps {
  shrinkToHeight?: string;
  slideUp?: boolean;
}

const HeaderImage = ({ shrinkToHeight = '35vh', slideUp = false }: HeaderImageProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the image after a small delay for animation purposes
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div 
      className={`
        relative w-full rounded-3xl overflow-hidden shadow-lg 
        ${shrinkToHeight}
        ${slideUp ? 'transform transition-all duration-700 ease-out' : ''}
        ${slideUp && isVisible ? 'translate-y-0 opacity-100' : slideUp ? 'translate-y-12 opacity-0' : ''}
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
          origin-bottom-left 
        `}
      >
        <h1 className="tracking-tight">nexaFit</h1>
      </div>
    </div>
  );
};

export default HeaderImage;
