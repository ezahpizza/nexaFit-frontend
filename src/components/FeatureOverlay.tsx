
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface FeatureOverlayProps {
  username: string;
}

const FeatureOverlay = ({ username }: FeatureOverlayProps) => {
  return (
    <div className="bg-nexafit-accent rounded-xl shadow-lg overflow-hidden text-white">
      <div className="flex flex-col md:flex-row">
        {/* Left side - Greeting */}
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-medium mb-3">
            Hello {username},
          </h2>
          <p className="text-lg md:text-xl opacity-90">
            you're here so you're halfway there.
          </p>
        </div>

        {/* Vertical divider */}
        <div className="hidden md:block w-px bg-nexafit-footer self-stretch mx-1"></div>

        {/* Right side - Quick links */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col space-y-6">
          <Link
            to="/calorie-tracker"
            className="flex justify-between items-center group"
          >
            <div>
              <h3 className="text-xl font-medium">Here after a workout?</h3>
              <p className="text-sm opacity-80">Check the cals you burnt</p>
            </div>
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>

          <Link
            to="/meal-planner"
            className="flex justify-between items-center group"
          >
            <div>
              <h3 className="text-xl font-medium">Want a tailored meal plan?</h3>
              <p className="text-sm opacity-80">Head over to our meal planner</p>
            </div>
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureOverlay;
