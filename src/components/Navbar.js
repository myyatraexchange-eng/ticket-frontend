// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { user, token } = useAuth();

  const activeClass = "text-yellow-300 font-semibold";
  const linkClass = "py-1 px-2 hover:underline";

  const handleLinkClick = () => {
    setMenuOpen(false);
    setMoreOpen(false);
  };

  return (
    <nav className="bg-blue-700 text-white shadow-md text-sm" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand */}
        <div className="text-base md:text-lg font-bold">
          <NavLink to="/" onClick={handleLinkClick} className="flex items-center gap-1">
            <span className="text-orange-300">My</span>
            <span className="text-white">Yatra</span>
            <span className="text-green-300">Exchange.com</span>
          </NavLink>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Nav Links */}
        <div className={`flex-col md:flex md:flex-row md:space-x-4 ${menuOpen ? "flex" : "hidden"} md:flex items-center`}>
          <NavLink to="/" onClick={handleLinkClick} className={({ isActive }) => `${linkClass} ${isActive ? activeClass : "text-white"}`}>
            Home
          </NavLink>

          <NavLink to="/find" onClick={handleLinkClick} className={({ isActive }) => `${linkClass} ${isActive ? activeClass : "text-white"}`}>
            Find Ticket
          </NavLink>

          <NavLink to="/post" onClick={handleLinkClick} className={({ isActive }) => `${linkClass} ${isActive ? activeClass : "text-white"}`}>
            Post Ticket
          </NavLink>

          <NavLink to="/about" onClick={handleLinkClick} className={({ isActive }) => `${linkClass} ${isActive ? activeClass : "text-white"}`}>
            About
          </NavLink>

          <NavLink to="/contact" onClick={handleLinkClick} className={({ isActive }) => `${linkClass} ${isActive ? activeClass : "text-white"}`}>
            Contact
          </NavLink>

          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="py-1 px-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
              aria-haspopup="true"
              aria-expanded={moreOpen}
            >
              More ▾
            </button>

            {moreOpen && (
              <div className="absolute right-0 mt-1 bg-white text-black rounded shadow-md w-48 z-50" role="menu">
                <NavLink to="/policy" onClick={() => { handleLinkClick(); }} className="block px-4 py-2 hover:bg-gray-100" role="menuitem">Policy</NavLink>
                <NavLink to="/disclaimer" onClick={() => { handleLinkClick(); }} className="block px-4 py-2 hover:bg-gray-100" role="menuitem">Disclaimer</NavLink>
                <NavLink to="/terms" onClick={() => { handleLinkClick(); }} className="block px-4 py-2 hover:bg-gray-100" role="menuitem">Terms</NavLink>
                <NavLink to="/refund-policy" onClick={() => { handleLinkClick(); }} className="block px-4 py-2 hover:bg-gray-100" role="menuitem">Refund Policy</NavLink>
              </div>
            )}
          </div>

          {/* Auth button */}
          {token && user ? (
            <NavLink
              to="/profile"
              onClick={handleLinkClick}
              className="ml-0 md:ml-3 mt-2 md:mt-0 bg-white text-blue-700 px-4 py-1 rounded hover:bg-gray-100 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
            >
              Profile
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              onClick={handleLinkClick}
              className="ml-0 md:ml-3 mt-2 md:mt-0 bg-white text-blue-700 px-4 py-1 rounded hover:bg-gray-100 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

