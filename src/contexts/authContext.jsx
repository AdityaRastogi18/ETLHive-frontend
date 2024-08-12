import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (token, userData) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(userData));

    try {
      setLoading(true);
      setUser(userData);
      setToken(token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");
    if (token && userData) {
      setUser(JSON.parse(userData));
      setToken(token);
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, loading, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
