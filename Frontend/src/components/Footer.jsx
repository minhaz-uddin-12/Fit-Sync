import React from "react";
import { Link } from 'react-router-dom';

function Footer() {
  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-gray-700 text-white py-12 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Footer Content in Flex */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Company Information */}
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-semibold">FitSync</h3>
            <p className="text-gray-400">
              Empowering individuals to achieve their fitness goals with personalized training, group workouts, and tailored diet plans.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1 space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-indigo-400">About Us</Link></li>
              <li><Link to="/services" className="hover:text-indigo-400">Services</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-400">Contact Us</Link></li>
              <li><Link to="/bmicalculator" className="hover:text-indigo-400">BMI Calculator</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex-1 space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <p className="text-gray-400">Email: info@fitsync.com</p>
            <p className="text-gray-400">Phone: +123 456 7890</p>
            <p className="text-gray-400">Address: 123 Fitness Street, Wellness City, 12345</p>
          </div>

          {/* Social Media Links */}
          <div className="flex-1 space-y-4">
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-indigo-400">
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400">
                <i className="fab fa-instagram"></i> Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400">
                <i className="fab fa-twitter"></i> Twitter
              </a>
            </div>
          </div>

          {/* Map Location */}
          <div className="flex-1 space-y-4">
            <h4 className="text-lg font-semibold text-white">Find Us Here</h4>
            <div className="w-full h-64 mt-4">
              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.4959821587554!2d91.80470027490425!3d22.37265227963467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd85f4dba6a6b%3A0x812e380dbc9fee53!2sEast%20Delta%20University!5e0!3m2!1sen!2sbd!4v1742460809611!5m2!1sen!2sbd"
                width="100%" 
                height="100%" 
                style={{ border: '0' }} 
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map Location"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-10 text-center text-gray-400 text-sm">
          <p>&copy; 2025 FitSync. All Rights Reserved.</p>
        </div>
      </div>

      {/* Back to Top Button inside Footer, positioned at the bottom-right */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={scrollToTop}
          className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all"
        >
          ↑
        </button>
      </div>
    </footer>
  );
}

export default Footer;