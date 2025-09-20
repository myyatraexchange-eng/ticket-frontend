import React from "react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center z-50">
      <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin mb-4"></div>
      <p className="text-white text-lg">{message}</p>
    </div>
  );
};

export default Loader;

