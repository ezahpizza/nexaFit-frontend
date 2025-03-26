
import { useEffect, useState } from 'react';

const Header = () => {
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
    <header className="w-full px-4 pt-4">
      <div 
        className={`
          relative w-full rounded-3xl overflow-hidden shadow-lg 
          transition-all duration-1000 ease-out
          ${isShrinked ? 'h-[35vh]' : 'h-[90vh]'}
        `}
      >
        <img 
          src="/lovable-uploads/c7aeaaf4-e3eb-4980-ba51-1abbb5459420.png" 
          alt="NexaFit Hero" 
          className="w-full h-full object-cover object-center"
        />
        
        <div className="absolute left-8 top-8 text-white text-4xl font-bold z-10">
          <h1 className="tracking-tight">nexaFit</h1>
        </div>
        
        <div 
          className={`
            absolute inset-x-0 bottom-0 flex justify-between items-center 
            px-8 py-6 bg-gradient-to-t from-black/60 to-transparent text-white
            transition-opacity duration-500 ${isShrinked ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div className="text-xl font-medium">Sample Text</div>
          <div className="text-xl font-medium">Sample Text</div>
          <div className="text-3xl cursor-pointer">≡</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
