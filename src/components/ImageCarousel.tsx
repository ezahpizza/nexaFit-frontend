
import { useState, useRef, useEffect } from 'react';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  
  const goToSlide = (index: number) => {
    let newIndex = index;
    if (index < 0) newIndex = images.length - 1;
    if (index >= images.length) newIndex = 0;
    setCurrentIndex(newIndex);
    
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * newIndex;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Multiply to make the swipe more sensitive
    
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = (carouselRef.current.scrollLeft || 0) - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.clientWidth;
      const newIndex = Math.round(carouselRef.current.scrollLeft / slideWidth);
      setCurrentIndex(newIndex);
    }
  };

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full">
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-none transition-all snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {images.map((image, index) => (
          <div 
            key={index} 
            className="min-w-full h-64 flex-shrink-0 snap-start"
          >
            <img 
              src={image} 
              alt={`Carousel image ${index}`} 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentIndex ? 'bg-nexafit-navbar scale-125' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
