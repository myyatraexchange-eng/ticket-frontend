// Loader.js
import React from "react";

const Loader = ({ message = "Please wait..." }) => {
  return (
    <div className="fixed inset-0 bg-blue-600 flex flex-col items-center justify-center z-50">
      {/* Spinner */}
      <div className="border-4 border-t-white border-white border-solid rounded-full w-16 h-16 animate-spin mb-4"></div>

      {/* Message */}
      <p className="text-white text-lg font-semibold text-center">{message}</p>
    </div>
  );
};

export default Loader;

