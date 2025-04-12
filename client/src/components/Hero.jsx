import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center sm:pt-28 mt-[56px] overflow-hidden"
      style={{
        backgroundImage: "url('/Hero.jpg')",
        backgroundBlendMode: "overlay"
      }}
    >
      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent pointer-events-none" />
      <div 
        className="text-center p-8 sm:p-12 rounded-lg max-w-2xl mx-auto relative z-10 backdrop-blur-sm border border-white/10"
        style={{
          background: "linear-gradient(145deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)"
        }}
      >
        <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
          Transform Your Life,<br />
          <span className="text-blue-400">One Rep at a Time</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mt-6 max-w-lg mx-auto leading-relaxed">
          Join the FitSync community and unlock your full potential with personalized workouts, expert guidance, and a supportive network.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link 
            to="/services" 
            className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
          >
            Start Your Journey
          </Link>
          <Link 
            to="/about" 
            className="px-8 py-3 bg-transparent text-white text-lg rounded-lg border-2 border-white/50 hover:bg-white/10 transition-all duration-300 hover:border-white"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
