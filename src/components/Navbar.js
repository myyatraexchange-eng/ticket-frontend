import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/mylogo.webp";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { user, token } = useAuth();

  const activeClass = "text-yellow-300 font-semibold";
  const linkClass = "block py-2 md:py-1 hover:underline";

  const closeAll = () => {
    setMenuOpen(false);
    setMoreOpen(false);
  };

  return (
    <nav className="bg-blue-700 text-white shadow-md relative min-h-[64px]">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">

        {/* ================= LOGO ================= */}
        <NavLink to="/" onClick={closeAll} className="flex items-center">
          <img
            src={logo}
            alt="My Yatra Exchange Logo"
            width="278"
            height="84"
            fetchpriority="high"
            decoding="async"
            className="h-8 md:h-10 w-auto object-contain"
          />
        </NavLink>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-blue-700 px-4 pb-4 shadow-lg z-50 text-left">
          <NavLink to="/" onClick={closeAll} className={linkClass}>Home</NavLink>
          <NavLink to="/find" onClick={closeAll} className={linkClass}>Find Ticket</NavLink>
          <NavLink to="/post" onClick={closeAll} className={linkClass}>Post Ticket</NavLink>
          <NavLink to="/about" onClick={closeAll} className={linkClass}>About</NavLink>
          <NavLink to="/contact" onClick={closeAll} className={linkClass}>Contact</NavLink>

          {/* MOBILE MORE (INLINE – ALWAYS WORKS) */}
          <div className="border-t border-blue-500 mt-2 pt-2">
            <p className="font-semibold text-sm mb-1">More</p>
            <NavLink to="/blog" onClick={closeAll} className={linkClass}>Blog</NavLink>
            <NavLink to="/policy" onClick={closeAll} className={linkClass}>Policy</NavLink>
            <NavLink to="/disclaimer" onClick={closeAll} className={linkClass}>Disclaimer</NavLink>
            <NavLink to="/terms" onClick={closeAll} className={linkClass}>Terms</NavLink>
            <NavLink to="/refund-policy" onClick={closeAll} className={linkClass}>Refund Policy</NavLink>
          </div>

          {/* LOGIN / PROFILE */}
          {token && user ? (
            <NavLink
              to="/profile"
              onClick={closeAll}
              className="block mt-3 bg-white text-blue-700 px-4 py-2 rounded font-semibold text-center"
            >
              Profile
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              onClick={closeAll}
              className="block mt-3 bg-white text-blue-700 px-4 py-2 rounded font-semibold text-center"
            >
              Login
            </NavLink>
          )}
        </div>
      )}

      {/* ================= DESKTOP MENU ================= */}
      <div className="hidden md:flex items-center space-x-4 absolute right-4 top-1/2 -translate-y-1/2">
        <NavLink to="/" className={({isActive}) => `${linkClass} ${isActive ? activeClass : ""}`}>Home</NavLink>
        <NavLink to="/find" className={({isActive}) => `${linkClass} ${isActive ? activeClass : ""}`}>Find Ticket</NavLink>
        <NavLink to="/post" className={({isActive}) => `${linkClass} ${isActive ? activeClass : ""}`}>Post Ticket</NavLink>
        <NavLink to="/about" className={({isActive}) => `${linkClass} ${isActive ? activeClass : ""}`}>About</NavLink>
        <NavLink to="/contact" className={({isActive}) => `${linkClass} ${isActive ? activeClass : ""}`}>Contact</NavLink>

        {/* DESKTOP MORE DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className="py-1 hover:underline"
          >
            More ▾
          </button>

          {moreOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md w-48 z-50">
              <NavLink to="/blog" onClick={closeAll} className="block px-4 py-2 hover:bg-gray-100">Blog</NavLink>
              <NavLink to="/policy" onClick={closeAll} className="block px-4 py-2 hover:bg-gray-100">Policy</NavLink>
              <NavLink to="/disclaimer" onClick={closeAll} className="block px-4 py-2 hover:bg-gray-100">Disclaimer</NavLink>
              <NavLink to="/terms" onClick={closeAll} className="block px-4 py-2 hover:bg-gray-100">Terms</NavLink>
              <NavLink to="/refund-policy" onClick={closeAll} className="block px-4 py-2 hover:bg-gray-100">Refund Policy</NavLink>
            </div>
          )}
        </div>

        {token && user ? (
          <NavLink to="/profile" className="bg-white text-blue-700 px-4 py-1 rounded font-semibold">
            Profile
          </NavLink>
        ) : (
          <NavLink to="/login" className="bg-white text-blue-700 px-4 py-1 rounded font-semibold">
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

