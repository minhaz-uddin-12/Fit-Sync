import React from "react";
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaArrowUp } from 'react-icons/fa';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Company Information */}
          <div>
            <h3 className="text-3xl font-bold mb-6 text-white">
              <span className="text-indigo-500">Fit</span>Sync
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Empowering individuals to achieve their fitness goals with personalized training, group workouts, and tailored diet plans.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white border-b border-indigo-500 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-indigo-400 transition duration-300 flex items-center">
                <span className="mr-2">&#8250;</span>About Us
              </Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-indigo-400 transition duration-300 flex items-center">
                <span className="mr-2">&#8250;</span>Services
              </Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-indigo-400 transition duration-300 flex items-center">
                <span className="mr-2">&#8250;</span>Contact Us
              </Link></li>
              <li><Link to="/bmicalculator" className="text-gray-300 hover:text-indigo-400 transition duration-300 flex items-center">
                <span className="mr-2">&#8250;</span>BMI Calculator
              </Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white border-b border-indigo-500 pb-2 inline-block">Contact Us</h4>
            <div className="space-y-4">
              <p className="text-gray-300 flex items-start">
                <svg className="w-5 h-5 mr-3 text-indigo-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span>info@fitsync.com</span>
              </p>
              <p className="text-gray-300 flex items-start">
                <svg className="w-5 h-5 mr-3 text-indigo-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span>+123 456 7890</span>
              </p>
              <p className="text-gray-300 flex items-start">
                <svg className="w-5 h-5 mr-3 text-indigo-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>123 Fitness Street, Wellness City, 12345</span>
              </p>
            </div>
            
            {/* Social Icons (horizontal) */}
            <div className="mt-6">
              <h4 className="text-xl font-semibold mb-4 text-white border-b border-indigo-500 pb-2 inline-block">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/wasik.imam" className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 bg-gray-800 p-3 rounded-full">
                  <FaFacebookF size={18} />
                </a>
                <a href="https://www.instagram.com/pretul_chowdhury/" className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 bg-gray-800 p-3 rounded-full">
                  <FaInstagram size={18} />
                </a>
                <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 bg-gray-800 p-3 rounded-full">
                  <FaTwitter size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Map Location */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white border-b border-indigo-500 pb-2 inline-block">Find Us Here</h4>
            <div className="w-full h-48 rounded-lg overflow-hidden shadow-xl border-2 border-indigo-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.4959821587554!2d91.80470027490425!3d22.37265227963467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd85f4dba6a6b%3A0x812e380dbc9fee53!2sEast%20Delta%20University!5e0!3m2!1sen!2sbd!4v1742460809611!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: '0' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map Location"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-10"></div>

        {/* Copyright - Centered */}
        <div className="text-center text-gray-300">
          <p>&copy; 2025 FitSync. All Rights Reserved.</p>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
          aria-label="Back to top"
        >
          <FaArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}

export default Footer;