
import ImageCarousel from './ImageCarousel';

const SecondaryContent = () => {
  // Sample carousel images (replace with your actual images)
  const carouselImages = [
    "https://images.unsplash.com/photo-1532446871339-13c3e557842f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1532446872614-9e30515cf0ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1594998893017-46a886a65fdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  ];

  return (
    <div className="nexafit-container py-16">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Transform Your Nutrition</h2>
          <p className="text-lg text-gray-700 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <div className="bg-nexafit-accent w-full max-w-md h-64 rounded-lg flex items-center justify-center">
            <div className="p-8 text-white">
              <h3 className="text-2xl mb-2 font-semibold">Start Today</h3>
              <p>Create your personalized meal plan in just a few clicks</p>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2">
          <ImageCarousel images={carouselImages} />
        </div>
      </div>
    </div>
  );
};

export default SecondaryContent;
