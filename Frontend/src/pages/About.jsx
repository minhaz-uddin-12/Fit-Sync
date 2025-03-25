import React from "react";

const About = () => {
  return (
    <section id="about" className="relative py-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
      {/* Background Shape */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-sky-200 opacity-20 blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Text Section */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-semibold text-indigo-500 uppercase tracking-widest mb-4">
            About Us
          </h3>
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Fitness Made Simple, <br /> Results Made Possible
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed text-justify max-w-2xl mx-auto">
            At <span className="text-indigo-500 font-semibold">FitSync</span>, we are committed to revolutionizing fitness with innovative 
            technology, expert coaching, and a supportive community. Whether you're a beginner or a seasoned athlete, our 
            mission is to help you achieve your fitness goals effortlessly.
          </p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed text-justify max-w-2xl mx-auto">
            Our platform offers <span className="font-semibold text-indigo-500">personalized workout plans, real-time progress tracking, and AI-powered 
            fitness insights</span> to keep you motivated and on track.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {/* Image 1 (Large) */}
          <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
            <img src="trainer1.png" alt="Trainer 1" className="w-full h-full object-cover" />
          </div>

          {/* Image 2 (Small) */}
          <div className="relative w-full h-40 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
            <img src="trainer2.png" alt="Trainer 2" className="w-full h-full object-cover" />
          </div>

          {/* Image 3 (Small - Overlapping) */}
          <div className="relative w-full h-40 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 -mt-6">
            <img src="trainer3.png" alt="Trainer 3" className="w-full h-full object-cover" />
          </div>

          {/* Image 4 (Large - Adjusted Upwards) */}
          <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 -mt-12">
            <img src="trainer4.png" alt="Trainer 4" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;