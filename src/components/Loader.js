import React from "react";
import logo from "./logo.png"; // apna logo path yahan update karein

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 z-50">
      {/* Logo with .com */}
      <div className="flex items-center gap-2 mb-6">
        <img src={logo} alt="MyYatra Exchange" className="h-16 w-16" />
        <span className="text-white text-2xl font-bold">.com</span>
      </div>

      {/* Rotating arrows */}
      <div className="relative w-16 h-16 mb-4">
        {["#FFA500", "#FFFFFF", "#008000"].map((color, index) => (
          <div
            key={index}
            className="absolute top-0 left-0 w-16 h-16 animate-spin-slow"
            style={{
              borderTop: `4px solid ${color}`,
              borderRight: `4px solid transparent`,
              borderRadius: "50%",
              transform: `rotate(${index * 120}deg)`,
            }}
          ></div>
        ))}
      </div>

      {/* Loading message */}
      <div className="text-white font-medium text-lg">{message}</div>
    </div>
  );
};

export default Loader;

