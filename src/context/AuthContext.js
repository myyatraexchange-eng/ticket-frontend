import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // page reload hone par token check karo
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // ⚡ future me backend se user details fetch kar sakte ho
      setUser({ token });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ yeh hook add karna zaruri hai
export const useAuth = () => {
  return useContext(AuthContext);
};
