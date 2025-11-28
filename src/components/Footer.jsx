import React from 'react';
import { Link } from 'react-router-dom';

// ⬇️ Import Logo
import logo from "../assets/logo.webp";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white pt-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">

        {/* BRAND + ABOUT */}
        <div>
          {/* LOGO */}
          <div className="flex justify-center md:justify-start mb-3">
            <img 
              src={logo} 
              alt="My Yatra Exchange Logo" 
              className="h-10 w-auto"
            />
          </div>

          <h2 className="font-bold text-lg mb-2">MyYatraExchange.com</h2>
          <p>
            Helping you share unused train tickets safely without cancellation losses.
          </p>
        </div>

        {/* EXPLORE */}
        <div>
          <h2 className="font-bold text-lg mb-2">Explore</h2>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/find" className="hover:underline">Find Ticket</Link></li>
            <li><Link to="/post" className="hover:underline">Post Ticket</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* LEGAL + CONTACT */}
        <div>
          <h2 className="font-bold text-lg mb-2">Legal</h2>
          <ul className="space-y-1">
            <li><Link to="/policy" className="hover:underline">Policy</Link></li>
            <li><Link to="/disclaimer" className="hover:underline">Disclaimer</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms of Use</Link></li>
            <li><Link to="/refund-policy" className="hover:underline">Refund Policy</Link></li>
          </ul>

          <div className="mt-4">
            <h2 className="font-bold text-lg mb-1">Contact</h2>
            <p className="text-sm">Email: myyatraexchange@gmail.com</p>
            <p className="text-sm">Location: INDORE, INDIA</p>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center mt-6 text-sm text-gray-300 flex flex-col md:flex-row items-center justify-center gap-1 pb-2">
        © {new Date().getFullYear()} MyYatraExchange.com. All rights reserved. | 
        <span className="font-semibold text-yellow-400 hover:text-yellow-300 transition duration-300">
          Developer by Rohit Akodiya
        </span>
      </div>

      {/* DISCLAIMER MARQUEE */}
      <div className="bg-yellow-200 text-yellow-900 py-2 text-sm mt-2">
        <marquee behavior="scroll" direction="left" scrollAmount="8">
          <strong>Disclaimer:</strong> MyYatraExchange.com only connects travelers to share contact information 
          for unused tickets. We do not sell, resell, transfer, modify, or issue tickets. All coordination 
          is between users. This platform is independent and not affiliated with Indian Railways.
        </marquee>
      </div>
    </footer>
  );
};

export default Footer;

