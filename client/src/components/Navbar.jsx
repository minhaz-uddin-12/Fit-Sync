import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, isAuthenticated, logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dynamic Links based on Role
  const getRoleLinks = () => {
    switch (user?.role?.toLowerCase()) {
      case 'member':
        return [
          { path: '/dashboard', label: 'Dashboard' },
          { path: '/workouts', label: 'My Workouts' },
          { path: '/profile', label: 'Profile' },
        ];
      case 'trainer':
        return [
          { path: '/trainer/dashboard', label: 'Trainer Panel' },
          { path: '/clients', label: 'Manage Clients' },
          { path: '/profile', label: 'Profile' },
        ];
      case 'admin':
        return [
          { path: '/admin/dashboard', label: 'Admin Panel' },
          { path: '/manage-users', label: 'Manage Users' },
          { path: '/profile', label: 'Profile' },
        ];
      default:
        return [];
    }
  };

  const links = getRoleLinks();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center h-16">
          
          {/* Logo - Far Left */}
          <div className="mr-auto">
            <a href="/" className="flex items-center">
              <div className="w-8 h-8 mr-2" style={{backgroundImage: 'url("/Logo.svg")'}}></div>
              <span className="text-xl font-bold text-blue-400">FitSync</span>
            </a>
          </div>
          
          {/* Navigation Links - True Center */}
          <div className="hidden md:flex items-center justify-center absolute left-0 right-0 mx-auto" style={{ width: 'fit-content' }}>
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">About</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Services</Link></li>
              <li><Link to="/equipments" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Equipments</Link></li>
              <li><Link to="/plans" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Plans</Link></li>
              <li><Link to="/support" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Support</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Contact</Link></li>
            </ul>
          </div>
          
          {/* Auth Buttons - Far Right */}
          <div className="hidden md:flex items-center ml-auto">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-200 hover:text-white transition-colors duration-200">Login</Link>
                <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200 ml-2">Become a Member</Link>
              </>
            ) : (
              <div className="flex items-center">
                <div className="relative group">
                  <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-800 to-gray-700 rounded-md hover:from-gray-700 hover:to-gray-600 transition-all duration-300 shadow-md">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>My Account</span>
                    <svg className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-xl py-1 hidden group-hover:block border border-gray-100 transform transition-all duration-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <span className="text-sm font-semibold text-gray-900">Welcome!</span>
                      <span className="block text-xs text-gray-500 mt-0.5">{user.role} Account</span>
                    </div>
                    {links.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        <span className="w-8">{link.label === 'Dashboard' ? '📊' : link.label === 'Profile' ? '👤' : '📋'}</span>
                        {link.label}
                      </Link>
                    ))}
                    <button 
                      onClick={logout} 
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 border-t border-gray-100"
                    >
                      <span className="w-8">🚪</span>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Mobile menu button - Only visible on mobile */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg 
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open */}
              <svg 
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} ref={dropdownRef}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Home</Link>
          <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">About</Link>
          <Link to="/services" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Services</Link>
          <Link to="/equipments" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Equipments</Link>
          <Link to="/plans" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Plans</Link>
          <Link to="/support" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Support</Link>
          <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Contact</Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          {!isAuthenticated ? (
            <div className="px-2 space-y-1">
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-700 hover:bg-gray-600">Login</Link>
              <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700">Become a Member</Link>
            </div>
          ) : (
            <div className="px-2 space-y-1">
              <div className="px-3 py-2 text-base font-bold text-gray-400">
                {user.role} Account
              </div>
              {links.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                >
                  {link.label}
                </Link>
              ))}
              <button 
                onClick={logout}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;