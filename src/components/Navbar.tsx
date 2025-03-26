
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      {/* Horizontal bar with sample text and hamburger */}
      <div className="flex justify-between items-center px-6 py-3">
        <div className="text-xl font-medium">Sample Text 1</div>
        <div className="text-xl font-medium">Sample Text 2</div>
        <button 
          onClick={toggleDropdown}
          className="p-2 text-3xl focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          ≡
        </button>
      </div>

      {/* Full width navbar that appears on hamburger click */}
      <div 
        className={`
          absolute w-full bg-nexafit-navbar rounded-xl py-4 px-8
          transition-all duration-300 ease-in-out shadow-lg
          transform origin-top
          ${isOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible -translate-y-4'}
        `}
      >
        <div className="flex justify-between items-center">
          <div className="flex space-x-8">
            <Link 
              to="/calorie-tracker" 
              className="text-white hover:text-white/80 transition-colors"
            >
              Calorie Tracker
            </Link>
            <Link 
              to="/meal-planner" 
              className="text-white hover:text-white/80 transition-colors"
            >
              Meal Planner
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link 
              to="/sign-in" 
              className="text-white hover:text-white/80 transition-colors"
            >
              Sign in
            </Link>
            <Link 
              to="/sign-up" 
              className="text-white hover:text-white/80 transition-colors font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
