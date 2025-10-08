// src/components/LoaderOverlay.jsx
import React from "react";

const LoaderOverlay = () => (
  <div className="fixed inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center">
    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-16 w-16"></div>
    <style>{`
      .loader {
        border-top-color: #3498db;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default LoaderOverlay;

