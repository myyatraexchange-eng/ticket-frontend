// Loader.js
import React from "react";

const Loader = ({ message = "Please wait..." }) => {
  return (
    <div className="fixed inset-0 bg-blue-600 flex flex-col items-center justify-center z-50">
      {/* Gradient Circular Spinner */}
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white border-b-white animate-spin"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-l-white border-r-white animate-spin reverse"></div>
      </div>

      {/* Message */}
      <p className="text-white text-xl font-semibold text-center">{message}</p>

      {/* Extra inline style for reverse spin */}
      <style>
        {`
          .reverse {
            animation-direction: reverse;
          }
        `}
      </style>
    </div>
  );
};

export default Loader;

