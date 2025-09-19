import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ✅ Context & Providers
import { HelmetProvider } from "react-helmet-async";   // SEO Helmet
import { BrowserRouter } from "react-router-dom";      // Router
import { AuthProvider } from "./context/AuthContext";  // Auth Context

// ✅ Create root
const root = ReactDOM.createRoot(document.getElementById("root"));

// ✅ Render app with providers
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

