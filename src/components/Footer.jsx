import React from 'react';
import { Link } from 'react-router-dom';
import { FaYoutube, FaInstagram } from "react-icons/fa";

import logo from "../assets/mylogo.webp";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white pt-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* BRAND + ABOUT */}
        <div>
          {/* LOGO */}
          <div className="flex justify-center md:justify-start mb-3">
            <img 
              src={logo} 
              alt="My Yatra Exchange Logo" 
              className="h-12 md:h-16 w-auto object-contain drop-shadow-md"
            />
          </div>

          <h2 className="font-bold text-lg mb-1">MyYatraExchange.com</h2>
          <p>Helping you share unused train tickets safely without cancellation losses.</p>

          {/* SOCIAL ICONS */}
          <div className="flex justify-center md:justify-start gap-4 mt-3">
            
            {/* YouTube */}
            <a 
              href="https://youtube.com/@my_yatra_exchange?si=1AXs4ZgLQZHNbVc1"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-500 bg-white p-2 rounded-full text-xl hover:scale-110 transition-all shadow-md"
            >
              <FaYoutube />
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/myyatraexchange?igsh=cnprZGVqbmkzMnFy"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pink-500 bg-white p-2 rounded-full text-xl hover:scale-110 transition-all shadow-md"
            >
              <FaInstagram />
            </a>

          </div>
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
      <div className="text-center mt-8 text-sm text-gray-300 flex flex-col md:flex-row items-center justify-center gap-1 pb-3">
        © {new Date().getFullYear()} MyYatraExchange.com. All rights reserved. | 
        <span className="font-semibold text-yellow-400 hover:text-yellow-300 transition duration-300">
          Developer by Rohit Akodiya
        </span>
      </div>

      {/* DISCLAIMER MARQUEE */}
      <div className="bg-yellow-200 text-yellow-900 py-2 text-sm mt-2">
        <marquee behavior="scroll" direction="left" scrollAmount="8">
          <strong>Disclaimer:</strong> Disclaimer:
MyYatraExchange.com is an independent information-sharing platform that only helps travelers connect by sharing contact details for unused tickets. 
We do not sell, resell, transfer, issue, modify, or guarantee any tickets, and we do not participate in any ticket transaction or payment between users.
All communication, verification, and coordination are solely between users at their own discretion and risk.
This platform is not affiliated with or authorized by Indian Railways or IRCTC.

        </marquee>
      </div>
    </footer>
  );
};

export default Footer;

