import React from "react";

const Loader = ({ message = "Please wait..." }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent">
      {/* Partial Ring Spinner */}
      <div className="w-16 h-16 border-4 border-t-white border-b-transparent border-l-white border-r-transparent rounded-full animate-spin mb-4"></div>

      {/* Message */}
      <p className="text-blue-600 text-lg font-semibold text-center">{message}</p>
    </div>
  );
};

export default Loader;

