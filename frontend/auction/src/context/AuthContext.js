import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null); // Add userId state

  const login = (id) => {
    setIsAuthenticated(true);
    setUserId(id); // Store user ID on login
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null); // Clear user ID on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};
