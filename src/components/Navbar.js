import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const activeClass = "text-yellow-300 font-semibold"; // Active page style
  const linkClass = "py-1 hover:underline";

  return (
    <nav className="bg-blue-600 text-white shadow-md text-sm relative">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Brand */}
        <div className="text-base md:text-lg font-bold">
          <NavLink to="/" className="hover:underline">MyYatraExchange.com</NavLink>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Nav Links */}
        <div className={`flex-col md:flex md:flex-row md:space-x-4 ${menuOpen ? 'flex' : 'hidden'} md:flex items-center`}>
          
          {/* Main Pages */}
          <NavLink to="/" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>Home</NavLink>
          <NavLink to="/find" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>Find Ticket</NavLink>
          <NavLink to="/post" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>Post Ticket</NavLink>
          <NavLink to="/about" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>Contact</NavLink>

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="py-1 hover:underline"
            >
              More ▾
            </button>
            {moreOpen && (
              <div className="absolute bg-white text-black mt-1 rounded shadow-md w-40 z-50">
                <NavLink 
                  to="/policy" 
                  className={({ isActive }) => `block px-4 py-2 hover:bg-gray-100 ${isActive ? 'font-bold text-blue-600' : ''}`}
                >
                  Policy
                </NavLink>
                <NavLink 
                  to="/privacy" 
                  className={({ isActive }) => `block px-4 py-2 hover:bg-gray-100 ${isActive ? 'font-bold text-blue-600' : ''}`}
                >
                  Privacy
                </NavLink>
                <NavLink 
                  to="/disclaimer" 
                  className={({ isActive }) => `block px-4 py-2 hover:bg-gray-100 ${isActive ? 'font-bold text-blue-600' : ''}`}
                >
                  Disclaimer
                </NavLink>
                <NavLink 
                  to="/terms" 
                  className={({ isActive }) => `block px-4 py-2 hover:bg-gray-100 ${isActive ? 'font-bold text-blue-600' : ''}`}
                >
                  Terms
                </NavLink>
              </div>
            )}
          </div>

          {/* Login */}
          <NavLink
            to="/login"
            className="ml-0 md:ml-3 mt-2 md:mt-0 bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 font-semibold"
          >
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
