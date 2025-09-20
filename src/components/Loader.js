import React from "react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-blue-600 flex flex-col items-center justify-center z-50">
      <div className="loader border-t-4 border-white border-solid rounded-full w-16 h-16 animate-spin mb-4"></div>
      <p className="text-white text-lg">{message}</p>
    </div>
  );
};

export default Loader;

