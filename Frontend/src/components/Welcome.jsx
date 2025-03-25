import React from "react";

const Welcome = () => {
  return (
    <section className="py-8 relative overflow-hidden bg-gradient-to-r from-yellow-50 via-teal-100 to-indigo-100">
      {/* Decorative Background Shape */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-teal-200 opacity-30 blur-xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
          {/* Left Side (Text Content) */}
          <div className="flex-1 mb-12 lg:mb-0 text-center lg:text-left">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
              Welcome to FitSync
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed text-justify">
              We are dedicated to excellence, empowering individuals who have the discipline to train like champions, turning their ambition into success through strategic engineering and strong partnerships.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">
              START
            </button>
          </div>

          {/* Right Side (Images) */}
          <div className="flex-1 grid grid-cols-2 gap-6 lg:gap-8">
            {/* Image 1 (Smaller Size) */}
            <div className="relative w-full h-56 rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img src="ab1.png" alt="Image 1" className="w-full h-full object-cover" />
            </div>

            {/* Image 2 (Smaller Size) */}
            <div className="relative w-full h-48 rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img src="ab2.png" alt="Image 2" className="w-full h-full object-cover" />
            </div>

            {/* Image 3 (Smaller Size) */}
            <div className="relative w-full h-48 rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img src="ab3.png" alt="Image 3" className="w-full h-full object-cover" />
            </div>

            {/* Image 4 (Smaller Size, adjusted upwards) */}
            <div className="relative w-full h-56 rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 -mt-8">
              <img src="ab4.png" alt="Image 4" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;