// frontend/context/AuthContext.tsx
"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = async () => {
      try {
        await axios.get("/api/users/profile");
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    await axios.post("/api/auth/logout");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
