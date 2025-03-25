import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, role, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  // Dynamic Links based on Role
  const getRoleLinks = () => {
    switch (role) {
      case 'Member':
        return [
          { path: '/dashboard', label: 'Dashboard' },
          { path: '/workouts', label: 'My Workouts' },
          { path: '/profile', label: 'Profile' },
        ];
      case 'Trainer':
        return [
          { path: '/trainer/dashboard', label: 'Trainer Panel' },
          { path: '/clients', label: 'Manage Clients' },
          { path: '/profile', label: 'Profile' },
        ];
      case 'Admin':
        return [
          { path: '/admin/dashboard', label: 'Admin Dashboard' },
          { path: '/manage-users', label: 'Manage Users' },
          { path: '/profile', label: 'Profile' },
        ];
      default:
        return [];
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 w-full bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center max-w-screen-xl">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold text-blue-400 hover:text-blue-500 transition-colors">
          FitSync
        </Link>
        
        {/* Center - Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-lg mx-auto">
          <li><Link to="/" className="hover:text-gray-300 transition">Home</Link></li>
          <li><Link to="/about" className="hover:text-gray-300 transition">About</Link></li>
          <li><Link to="/services" className="hover:text-gray-300 transition">Services</Link></li>
          <li><Link to="/equipments" className="hover:text-gray-300 transition">Equipments</Link></li>
          <li><Link to="/support" className="hover:text-gray-300 transition">Support</Link></li>
          <li><Link to="/contact" className="hover:text-gray-300 transition">Contact</Link></li>
        </ul>

        {/* Right - Auth/Role Links */}
        <div className="hidden md:flex space-x-4">
          {!isLoggedIn ? (
            <>
              <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">Become a Member</Link>
              <Link to="/login" className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition">Login</Link>
            </>
          ) : (
            <>
              {getRoleLinks().map((link) => (
                <Link key={link.path} to={link.path} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                  {link.label}
                </Link>
              ))}
              <button onClick={onLogout} className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition">
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation (Dropdown) */}
      {isOpen && (
        <div className="absolute right-4 top-14 bg-blue-600 shadow-lg rounded-lg p-4 md:hidden w-64">
          <ul className="flex flex-col space-y-4 text-lg">
            <li><Link to="/" className="block text-white hover:text-gray-200 transition">Home</Link></li>
            <li><Link to="/about" className="block text-white hover:text-gray-200 transition">About</Link></li>
            <li><Link to="/services" className="block text-white hover:text-gray-200 transition">Services</Link></li>
            <li><Link to="/contact" className="block text-white hover:text-gray-200 transition">Contact</Link></li>

            {!isLoggedIn ? (
              <>
                <li><Link to="/register" className="block bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100">Become a Member</Link></li>
                <li><Link to="/login" className="block bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100">Login</Link></li>
              </>
            ) : (
              <>
                {getRoleLinks().map((link) => (
                  <li key={link.path}><Link to={link.path} className="block text-white hover:text-gray-200 transition">{link.label}</Link></li>
                ))}
                <li><button onClick={onLogout} className="block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">Logout</button></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;