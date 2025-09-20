// Loader.js
import React from "react";

const Loader = ({ message = "Please wait...", size = 16, color = "blue-600" }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="flex flex-col items-center">
        <div
          className={`loader border-t-4 border-${color} border-solid rounded-full w-${size} h-${size} animate-spin mb-4`}
        ></div>
        <p className="text-black text-lg">{message}</p>
      </div>
    </div>
  );
};

export default Loader;

