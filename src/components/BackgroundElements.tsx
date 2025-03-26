
import React from 'react';

const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Top-left orange rectangle */}
      <div 
        className="absolute -top-20 -left-20 w-80 h-80 bg-nexafit-navbar opacity-20 rounded-3xl"
        style={{ transform: 'rotate(-15deg)' }}
      ></div>
      
      {/* Bottom-right red rectangle */}
      <div 
        className="absolute -bottom-40 right-10 w-96 h-96 bg-nexafit-accent opacity-20 rounded-3xl"
        style={{ transform: 'rotate(20deg)' }}
      ></div>
      
      {/* Middle-left footer color rectangle */}
      <div 
        className="absolute top-1/2 -left-20 w-64 h-64 bg-nexafit-footer opacity-15 rounded-3xl"
        style={{ transform: 'rotate(15deg)' }}
      ></div>
      
      {/* Middle-right orange small rectangle */}
      <div 
        className="absolute top-80 right-10 w-40 h-40 bg-nexafit-navbar opacity-10 rounded-2xl"
        style={{ transform: 'rotate(-10deg)' }}
      ></div>
    </div>
  );
};

export default BackgroundElements;
