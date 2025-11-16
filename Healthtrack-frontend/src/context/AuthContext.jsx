import React, { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/api";

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Login function
  const login = async (formData) => {
    const data = await loginUser(formData);
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      const nextUser = {
        email: formData.email,
        role: data.role,
        name: data.name || formData.email,
      };
      setUser(nextUser);
      localStorage.setItem("user", JSON.stringify(nextUser));
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
    localStorage.removeItem("user");
  };

  useEffect(() => {
    // Hydrate user from token if token exists but user is not stored
    if (!user && token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1] || ""));
        const nextUser = {
          email: payload.email || "",
          role: payload.role,
          name: payload.name || "",
        };
        setUser(nextUser);
        localStorage.setItem("user", JSON.stringify(nextUser));
      } catch {
        // ignore invalid token
      }
    }
  }, [token, user]);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
