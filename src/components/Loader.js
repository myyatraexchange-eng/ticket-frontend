import React from "react";

const Loader = ({ message = "Please wait..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="loader border-t-4 border-blue-600 border-solid rounded-full w-16 h-16 animate-spin mb-4"></div>
      <p className="text-blue-600 text-lg">{message}</p>
    </div>
  );
};

export default Loader;

