import React from "react";
import logo from "./logo.png"; // apna logo path

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
      {/* Logo + .com */}
      <div className="flex items-center gap-2 mb-6">
        <img src={logo} alt="MyYatra Exchange" className="h-20 w-auto" />
        <span className="text-white text-3xl font-bold">.com</span>
      </div>

      {/* Rotating Arrows */}
      <div className="relative w-20 h-20 mb-6">
        {["#FFA500", "#FFFFFF", "#008000"].map((color, index) => (
          <div
            key={index}
            className="absolute top-0 left-0 w-20 h-20 animate-spin-slow"
            style={{
              borderTop: `4px solid ${color}`,
              borderRight: "4px solid transparent",
              borderRadius: "50%",
              transform: `rotate(${index * 120}deg)`,
            }}
          />
        ))}
      </div>

      {/* Loading Message */}
      <p className="text-white text-lg font-medium">{message}</p>
    </div>
  );
};

export default Loader;

