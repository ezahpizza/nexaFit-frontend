import StatCard from './StatCard';

const MainContent = () => {
return (
<div className="relative z-50 nexafit-container py-6 md:px-2 md:px-0 px-4">
    <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="md:w-1/2 md:pr-8 animate-text-slide-in-left">
            <h2 className=" text-4xl md:text-5xl font-bold mb-6 text-gray-800">Lorem ipsum dolor</h2>
            <p className="text-sm md:text-lg text-gray-700 mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis est recusandae numquam suscipit magnam cum, deleniti, iste amet quod ut officia sed iusto exercitationem ab. Sequi nam harum expedita repudiandae, autem delectus optio dignissimos esse quidem 
            </p>
        </div>

        <div className="flex flex-col gap-8 relative animate-slide-in-right">
            <p className="text-lg text-gray-700 mb-4 md:pl-24">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="flex gap-8">
                <div 
                    className="absolute -right-40 z-0 w-full h-2/3 md:h-full bg-nexafit-green rounded-3xl"
                    style={{ transform: 'skewX(20deg)' }}
                ></div>
                <div 
                    className="absolute top-1/3 -right-2 w-2/5 h-1/2 md:h-2/3 bg-nexafit-footer rounded-3xl"
                    style={{ transform: 'skewX(20deg)' }}
                >
                </div>

                <div className="w-1/2 flex flex-col items-center py-4 space-y-4">
                    <div className="w-48 h-48 rounded-lg overflow-hidden shadow-lg">
                        <img 
                            src="/loader-test.webp" 
                            alt="NexaFit header" 
                            className="relative z-10 w-full h-full object-cover object-center"
                        />
                    </div>

                    <div className="w-48 h-12 rounded-lg overflow-hidden shadow-lg">
                        <img 
                            src="/loader-test.webp" 
                            alt="NexaFit header" 
                            className="relative z-10 w-full h-full object-cover object-center"
                        />
                    </div>
                </div>

                <div className="w-1/2 flex flex-col justify-center gap-2 py-4 md:pt-16 pt-36">
                    <div className="z-10 self-start"
                        style={{ transform: 'skewX(-20deg)' }}>
                        <StatCard number="2K+" text="Lorem ipsum" />
                    </div>
                    <div className="z-20 self-end"
                        style={{ transform: 'skewX(-20deg)' }}>
                        <StatCard number="2K+" text="Lorem ipsum" />
                    </div>

                </div>

            </div>
        </div>
    </div>
</div>
);
};

export default MainContent;