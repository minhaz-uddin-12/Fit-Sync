import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      {/* Decorative Background Shape */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-300 opacity-20 blur-xl"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          {/* Left Side (Text Content) */}
          <div className="space-y-8">
            <h2 className="text-5xl font-extrabold text-gray-800 leading-tight">
              Welcome to FitSync
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed pb-8">
              We are dedicated to excellence, empowering individuals who have the discipline to train like champions, turning their ambition into success through strategic engineering and strong partnerships.
            </p>
            <Link to="/plans" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition-all">
              Start
            </Link>
          </div>

          {/* Right Side (Images) */}
          <div className="grid grid-cols-2 gap-8">
            <div className="relative w-full h-60 rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img src="ab1.png" alt="Image 1" className="w-full h-full object-cover" />
            </div>

            <div className="relative w-full h-52 rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img src="ab2.png" alt="Image 2" className="w-full h-full object-cover" />
            </div>

            <div className="relative w-full h-52 rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img src="ab3.png" alt="Image 3" className="w-full h-full object-cover" />
            </div>

            <div className="relative w-full h-60 rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 -mt-8">
              <img src="ab4.png" alt="Image 4" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
