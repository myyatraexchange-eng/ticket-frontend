import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// OPTIMIZED LOGO (WebP + Transparent)
import logo from "../assets/mylogo.webp";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { user, token } = useAuth();

  const activeClass = "text-yellow-300 font-semibold";
  const linkClass = "py-1 hover:underline";

  const handleLinkClick = () => {
    setMenuOpen(false);
    setMoreOpen(false);
  };

  return (
    <nav className="bg-blue-700 text-white shadow-md text-sm relative min-h-[64px]">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">

        {/* ================= BRAND LOGO ================= */}
        <NavLink to="/" onClick={handleLinkClick} className="flex items-center">
          <img
            src={logo}
            alt="My Yatra Exchange Logo"
            width="278"
            height="84"
            fetchpriority="high"
            decoding="async"
            className="h-10 w-auto object-contain"
          />
        </NavLink>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* ================= MENU LINKS ================= */}
        <div
          className={`
            flex flex-col md:flex md:flex-row md:space-x-4 items-center
            transition-all duration-300 overflow-hidden
            ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 md:max-h-none md:opacity-100"}
          `}
        >
          <NavLink
            to="/"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/find"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Find Ticket
          </NavLink>

          <NavLink
            to="/post"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Post Ticket
          </NavLink>

          <NavLink
            to="/about"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Contact
          </NavLink>

          {/* ================= MORE DROPDOWN ================= */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="py-1 hover:underline"
              aria-haspopup="true"
              aria-expanded={moreOpen}
            >
              More ▾
            </button>

            {moreOpen && (
              <div className="absolute bg-white text-black mt-1 rounded shadow-md w-48 z-50">
                <NavLink to="/blog" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-100">Blog</NavLink>
                <NavLink to="/policy" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-100">Policy</NavLink>
                <NavLink to="/disclaimer" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-100">Disclaimer</NavLink>
                <NavLink to="/terms" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-100">Terms</NavLink>
                <NavLink to="/refund-policy" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-100">Refund Policy</NavLink>
              </div>
            )}
          </div>

          {/* ================= LOGIN / PROFILE ================= */}
          {token && user ? (
            <NavLink
              to="/profile"
              onClick={handleLinkClick}
              className="ml-0 md:ml-3 mt-2 md:mt-0 bg-white text-blue-700 px-4 py-1 rounded hover:bg-gray-100 font-semibold"
            >
              Profile
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              onClick={handleLinkClick}
              className="ml-0 md:ml-3 mt-2 md:mt-0 bg-white text-blue-700 px-4 py-1 rounded hover:bg-gray-100 font-semibold"
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

