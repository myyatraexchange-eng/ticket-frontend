// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { user, token, logout } = useAuth(); // ✅ logout bhi add kiya
  const navigate = useNavigate();

  const activeClass = "text-yellow-300 font-semibold";
  const linkClass = "py-1 hover:underline";

  const handleLinkClick = () => {
    setMenuOpen(false);
    setMoreOpen(false);
  };

  const handleLogout = () => {
    logout(); // AuthContext se logout call karega
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md text-sm relative">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand */}
        <div className="text-base md:text-lg font-bold">
          <NavLink to="/" onClick={handleLinkClick} className="hover:underline">
            <span className="text-orange-400">My</span>
            <span className="text-white">Yatra</span>
            <span className="text-green-400">Exchange.com</span>
          </NavLink>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Navigation Links */}
        <div
          className={`flex-col md:flex md:flex-row md:space-x-4 ${
            menuOpen ? "flex" : "hidden"
          } md:flex items-center`}
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

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="py-1 hover:underline"
            >
              More ▾
            </button>
            {moreOpen && (
              <div className="absolute bg-white text-black mt-1 rounded shadow-md w-48 z-50">
                <NavLink
                  to="/policy"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `block px-4 py-2 hover:bg-gray-100 ${
                      isActive ? "font-bold text-blue-600" : ""
                    }`
                  }
                >
                  Policy
                </NavLink>
                <NavLink
                  to="/disclaimer"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `block px-4 py-2 hover:bg-gray-100 ${
                      isActive ? "font-bold text-blue-600" : ""
                    }`
                  }
                >
                  Disclaimer
                </NavLink>
                <NavLink
                  to="/terms"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `block px-4 py-2 hover:bg-gray-100 ${
                      isActive ? "font-bold text-blue-600" : ""
                    }`
                  }
                >
                  Terms
                </NavLink>
                <NavLink
                  to="/refund-policy"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `block px-4 py-2 hover:bg-gray-100 ${
                      isActive ? "font-bold text-blue-600" : ""
                    }`
                  }
                >
                  Refund Policy
                </NavLink>
              </div>
            )}
          </div>

          {/* Auth Section */}
          {token && user ? (
            <div className="flex flex-col md:flex-row md:items-center">
              <NavLink
                to="/profile"
                onClick={handleLinkClick}
                className="ml-0 md:ml-3 mt-2 md:mt-0 bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 font-semibold"
              >
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="ml-0 md:ml-2 mt-2 md:mt-0 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              onClick={handleLinkClick}
              className="ml-0 md:ml-3 mt-2 md:mt-0 bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 font-semibold"
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

