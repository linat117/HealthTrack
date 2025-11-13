import React, { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/api";

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Login function
  const login = async (formData) => {
    const data = await loginUser(formData);
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      setUser({ email: formData.email, role: data.role });
    }
    return data;
  };

  // Register function
  const register = async (formData) => {
    const data = await registerUser(formData);
    return data;
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    // Optional: verify token / fetch user data on page load
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
