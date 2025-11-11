import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ✅ Context & Providers
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LoaderProvider } from "./context/LoaderContext"; // 👈 Import LoaderProvider

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoaderProvider>   {/* 👈 LoaderProvider add */}
        <AuthProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </AuthProvider>
      </LoaderProvider>
    </BrowserRouter>
  </React.StrictMode>
);

