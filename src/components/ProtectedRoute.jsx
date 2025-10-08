// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // 🔒 Agar user login nahi hai to usse login page pe redirect karo
  // aur current page ka path yaad rakho (redirect ke baad wapas wahi bhejne ke liye)
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ Agar user login hai to protected component dikhao
  return children;
};

export default ProtectedRoute;

