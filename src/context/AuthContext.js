import React, { createContext, useContext, useState, useEffect } from "react";
import { useLoader } from "./LoaderContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { showLoader, hideLoader } = useLoader();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user")) || null;
      const storedToken = localStorage.getItem("token") || null;
      setUser(storedUser);
      setToken(storedToken);
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  const login = (jwtToken, userData) => {
    setToken(jwtToken);
    setUser(userData || null);
    localStorage.setItem("token", jwtToken);
    if (userData) localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const fetchUser = async () => {
    if (!token) return;
    showLoader();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch {
      logout();
    } finally {
      hideLoader();
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

