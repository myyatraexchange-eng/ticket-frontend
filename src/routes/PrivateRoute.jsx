import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // 🔹 Jab tak user state null hai aur token check ho raha hai
  if (user === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // 🔹 Agar user logged in nahi hai
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔹 Agar user logged in hai
  return children;
};

export default PrivateRoute;
