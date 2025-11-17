import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { user, token } = useAuth();

  const activeClass = "text-yellow-300 font-semibold";
  const linkClass = "py-1 hover:underline";

  return (
    <nav className="bg-blue-600 text-white shadow-md text-sm relative">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-base md:text-lg font-bold">
          <NavLink to="/" className="hover:underline">
            <span className="text-orange-400">My</span>
            <span className="text-white">Yatra</span>
            <span className="text-green-400">Exchange.com</span>
          </NavLink>
        </div>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div
          className={`flex-col md:flex md:flex-row md:space-x-4 ${
            menuOpen ? "flex" : "hidden"
          } items-center`}
        >
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/find" className={linkClass}>Find Ticket</NavLink>
          <NavLink to="/post" className={linkClass}>Post Ticket</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>

          <div className="relative">
            <button onClick={() => setMoreOpen(!moreOpen)} className="py-1 hover:underline">
              More ▾
            </button>
            {moreOpen && (
              <div className="absolute bg-white text-black mt-1 rounded shadow-md w-48 z-50">
                <NavLink to="/policy" className="block px-4 py-2 hover:bg-gray-100">Policy</NavLink>
                <NavLink to="/disclaimer" className="block px-4 py-2 hover:bg-gray-100">Disclaimer</NavLink>
                <NavLink to="/terms" className="block px-4 py-2 hover:bg-gray-100">Terms</NavLink>
                <NavLink to="/refund-policy" className="block px-4 py-2 hover:bg-gray-100">Refund Policy</NavLink>
              </div>
            )}
          </div>

          {token && user ? (
            <NavLink
              to="/profile"
              className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 font-semibold"
            >
              Profile
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 font-semibold"
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

