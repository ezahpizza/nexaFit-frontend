
import StatCard from './StatCard';

const MainContent = () => {
  return (
    <div className="nexafit-container py-16">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="md:w-1/2">
          <h2 className="text-5xl font-bold mb-6 text-gray-800">Lorem ipsum dolor</h2>
          <p className="text-lg text-gray-700 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation.
          </p>
        </div>
        
        <div className="md:w-1/2 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <p className="text-lg text-gray-700 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <div className="w-48 h-48 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=480&q=80" 
                  alt="Healthy food" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <StatCard number="2K+" text="Lorem ipsum dolor sit amet" />
            <StatCard number="500+" text="Consectetur adipiscing elit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
