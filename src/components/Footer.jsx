import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white pt-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Brand Info */}
        <div>
          <h2 className="font-bold text-xl mb-2">MyYatraExchange.com</h2>
          <p>Helping travellers share unused train tickets to avoid cancellation losses.</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="font-bold text-lg mb-2">Explore</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline hover:text-yellow-300">Home</Link></li>
            <li><Link to="/find" className="hover:underline hover:text-yellow-300">Find Ticket</Link></li>
            <li><Link to="/post" className="hover:underline hover:text-yellow-300">Post Ticket</Link></li>
            <li><Link to="/about" className="hover:underline hover:text-yellow-300">About</Link></li>
            <li><Link to="/contact" className="hover:underline hover:text-yellow-300">Contact</Link></li>
          </ul>
        </div>

        {/* Legal & Contact */}
        <div>
          <h2 className="font-bold text-lg mb-2">Legal & Contact</h2>
          <ul className="space-y-1 text-gray-300 mb-4">
            <li><Link to="/policy" className="hover:underline hover:text-yellow-300">Policy</Link></li>
            <li><Link to="/privacy" className="hover:underline hover:text-yellow-300">Privacy Policy</Link></li>
            <li><Link to="/disclaimer" className="hover:underline hover:text-yellow-300">Disclaimer</Link></li>
            <li><Link to="/terms" className="hover:underline hover:text-yellow-300">Terms of Use</Link></li>
          </ul>
          <div className="text-gray-200 text-sm">
            <p>Email: <a href="mailto:support@myyatraexchange.com" className="hover:underline"> myyatraexchange@gmail.com</a></p>
            <p>Location: India</p>
          </div>
        </div>
      </div>

      {/* Copyright & Designer */}
      <div className="text-center mt-6 text-sm text-gray-300">
        <p>© {new Date().getFullYear()} MyYatraExchange.com. All rights reserved.</p>
        <p className="mt-1 text-yellow-400 text-xs">Designed & Developed by Rohit Akodiya</p>
      </div>

      {/* Moving Disclaimer */}
      <div className="bg-yellow-200 text-yellow-900 py-2 text-sm mt-4">
        <marquee behavior="scroll" direction="left" scrollAmount="4">
          <strong>Disclaimer:</strong> MyYatraExchange.com is an independent platform for connecting travellers. 
          We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with Indian Railways. 
          All train names and numbers are the property of Indian Railways and are used for identification purposes only.
        </marquee>
      </div>
    </footer>
  );
};

export default Footer;

