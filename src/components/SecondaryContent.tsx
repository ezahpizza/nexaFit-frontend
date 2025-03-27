import ImageCarousel from './ImageCarousel';

const SecondaryContent = () => {
  const carouselImages = [
    "/loader-test.webp",
    "/loader-test.webp",
    "/loader-test.webp"
  ];

  return (
    <div className="relative z-50 px-4 md:px-8 lg:px-16 xl:px-24 py-16">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="md:w-1/2 md:pr-8">
          <h2 className="text-3xl text-nexafit-footer font-bold mb-6 text-gray-800">Transform Your Nutrition</h2>
          <p className="text-lg text-nexafit-footer mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <div className="bg-nexafit-accent w-full max-w-md rounded-lg flex items-center justify-center mb-8 md:mb-0">
            <div className="p-8 text-nexafit-footer">
              <h3 className="text-2xl mb-2 font-black">Start Today</h3>
              <p className="font-medium">Create your personalized meal plan in just a few clicks</p>
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