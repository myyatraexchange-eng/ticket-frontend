import React, { createContext, useContext, useState, useEffect } from "react";
import { useLoader } from "./LoaderContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { showLoader, hideLoader } = useLoader();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // ✅ Load from localStorage when app starts
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user")) || null;
      const storedToken = localStorage.getItem("token") || null;
      if (storedToken) setToken(storedToken);
      if (storedUser) setUser(storedUser);
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  // ✅ Save to localStorage whenever token or user changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [token, user]);

  // ✅ Login function
  const login = (jwtToken, userData) => {
    setToken(jwtToken);
    setUser(userData || null);
  };

  // ✅ Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // ✅ Fetch fresh user data if token exists
  const fetchUser = async () => {
    if (!token) return;
    showLoader();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE}/auth/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 401) {
        // Token expired / invalid
        logout();
        return;
      }

      if (!res.ok) throw new Error("Failed to fetch user");

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Auth fetchUser error:", err);
      logout();
    } finally {
      hideLoader();
    }
  };

  // ✅ Auto fetch user whenever token changes
  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

