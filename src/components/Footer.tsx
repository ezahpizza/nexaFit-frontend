
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative z-50 mx-4 mb-4 mt-16">
      <div className="bg-nexafit-footer rounded-xl text-white p-8" >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold">nexaFit</h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <Link to="/contact" className="hover:text-white/80 transition-colors">
              Contact us
            </Link>
            <Link to="/about" className="hover:text-white/80 transition-colors">
              About the team
            </Link>
            <Link to="/terms" className="hover:text-white/80 transition-colors">
              Terms of use
            </Link>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/20 text-sm opacity-80">
          © 2023 nexaFit. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
