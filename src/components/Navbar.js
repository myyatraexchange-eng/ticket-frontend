import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaPlane } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const activeClass = "text-yellow-300 font-semibold";
  const linkClass = "py-1 hover:underline";

  // jab component load hoga → check karein ki token localStorage me hai ya nahi
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // token delete
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
    setMoreOpen(false);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md text-sm relative">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Brand */}
        <div className="text-base md:text-lg font-bold flex items-center space-x-1">
          <FaPlane className="text-white text-xl mr-1" />
          <NavLink to="/" className="hover:underline" onClick={handleLinkClick}>
            <span className="text-orange-400">My</span>
            <span className="text-white">Yatra</span>
            <span className="text-green-400">Exchange.Com</span>
          </NavLink>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Nav Links */}
        <div className={`flex-col md:flex md:flex-row md:space-x-4 ${menuOpen ? 'flex' : 'hidden'} md:flex items-center`}>
          <NavLink to="/" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`} onClick={handleLinkClick}>Home</NavLink>
          <NavLink to="/find" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`} onClick={handleLinkClick}>Find Ticket</NavLink>
          <NavLink to="/post" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`} onClick={handleLinkClick}>Post Ticket</NavLink>
          <NavLink to="/about" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`} onClick={handleLinkClick}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`} onClick={handleLinkClick}>Contact</NavLink>

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
                <NavLink to="/policy" className={({ isActive }) => `block px-4 py-2 hover:bg-gray-100 ${isActive ? 'font-bold text-blue-600' : ''}`} onClick={handleLinkClick}>Policy</NavLink>
                <NavLink to="/privacy" className={({ isActive }) => `block px-4 py-2 hover:bg-gray-100 ${isActive ? 'font-bold text-blue-600' : ''}`} onClick={handleLinkClick}>Privacy</NavLink>
                <NavLink to="/disclaimer" className={({ isActive }) => `block px-4 py-2 hover:bg-gray-100 ${isActive ? 'font-bold text-blue-600' : ''}`} onClick={handleLinkClick}>Disclaimer</NavLink>
                <NavLink to="/terms" className={({ isActive }) => `block px-4 py-2 hover:bg-gray-100 ${isActive ? 'font-bold text-blue-600' : ''}`} onClick={handleLinkClick}>Terms</NavLink>
              </div>
            )}
          </div>

          {/* Auth Buttons */}
          {!isLoggedIn ? (
            <NavLink
              to="/login"
              className="ml-0 md:ml-3 mt-2 md:mt-0 bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 font-semibold"
              onClick={handleLinkClick}
            >
              Login
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/profile"
                className="ml-0 md:ml-3 mt-2 md:mt-0 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 font-semibold"
                onClick={handleLinkClick}
              >
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="ml-2 mt-2 md:mt-0 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
