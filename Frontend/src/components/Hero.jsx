import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="relative bg-[url('/Hero.jpg')] bg-cover bg-center min-h-screen flex items-center justify-center pt-[84px] sm:pt-28 mt-16">
      <div className="text-center bg-black bg-opacity-50 p-8 sm:p-12 rounded-lg max-w-xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-semibold text-white">
          Connect to Get Fit!
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mt-6">
          Join FitSync and achieve your dream physique!
        </p>
        <Link
          to="/services"
          className="mt-8 inline-block px-8 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Hero;