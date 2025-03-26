
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
      <div className="flex justify-end pr-4">
        <button 
          onClick={toggleDropdown}
          className="p-2 text-3xl focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          ≡
        </button>
      </div>

      <div 
        className={`
          absolute right-0 mt-2 w-64 bg-nexafit-navbar rounded-lg shadow-lg
          transform transition-all duration-300 origin-top
          ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}
        `}
      >
        <div className="py-2 px-4">
          <Link 
            to="/calorie-tracker" 
            className="block py-3 px-4 text-white hover:bg-white/10 rounded-md transition-colors"
          >
            Calorie Tracker
          </Link>
          <Link 
            to="/meal-planner" 
            className="block py-3 px-4 text-white hover:bg-white/10 rounded-md transition-colors"
          >
            Meal Planner
          </Link>
          <div className="border-t border-white/20 my-2"></div>
          <Link 
            to="/sign-in" 
            className="block py-3 px-4 text-white hover:bg-white/10 rounded-md transition-colors"
          >
            Sign In
          </Link>
          <Link 
            to="/sign-up" 
            className="block py-3 px-4 text-white hover:bg-white/10 rounded-md transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <div className="w-full bg-nexafit-navbar rounded-xl mt-4 py-3 px-6 flex justify-between items-center">
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
  );
};

export default Navbar;
