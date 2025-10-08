// Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoaderOverlay from "./LoaderOverlay";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

      {/* Loader Overlay */}
      <LoaderOverlay />

      {/* Main content */}
      <main className="flex-1 container mx-auto p-6">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;

