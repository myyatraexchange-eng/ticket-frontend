import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white pt-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
        
        {/* Brand Info */}
        <div>
          <h2 className="font-bold text-lg mb-2">MyYatraExchange.com</h2>
          <p>Helping you share unused train tickets to avoid cancellation losses.</p>
        </div>

        {/* Navigation Links */}
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

        {/* Legal Links */}
        <div>
          <h2 className="font-bold text-lg mb-2">Legal</h2>
          <ul className="space-y-1">
            <li><Link to="/policy" className="hover:underline">Policy</Link></li>
            <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/disclaimer" className="hover:underline">Disclaimer</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms of Use</Link></li>
            <li><Link to="/refund-policy" className="hover:underline">Refund Policy</Link></li>
            <li><Link to="/shipping-policy" className="hover:underline">Shipping Policy</Link></li>
          </ul>
          
          <div className="mt-4">
            <h2 className="font-bold text-lg mb-1">Contact</h2>
            <p className="text-sm">Email: support@myyatraexchange.com</p>
            <p className="text-sm">Location: India</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-4 text-sm text-gray-300 flex flex-col md:flex-row items-center justify-center gap-1">
        © {new Date().getFullYear()} MyYatraExchange.com. All rights reserved. | 
        <span className="font-semibold text-yellow-400 hover:text-yellow-300 transition duration-300">
          Developer
        </span>
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

