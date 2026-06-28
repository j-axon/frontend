"use client";

import React, { createContext, useContext, useState } from "react";
import { authService } from "../services/auth.service";
import { setAccessToken, clearAccessToken } from "@/lib/auth/token-storage";
import type { AuthUser, LoginRequest } from "@/types/auth";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginUser: (credentials: LoginRequest) => Promise<void>;
  logoutUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (credentials: LoginRequest) => {
    setIsLoading(true);
    try {
      const data = await authService.login(credentials);
      setAccessToken(data.accessToken);
      setUser(data.user);
    } catch (error) {
      clearAccessToken();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await authService.logout();
    } finally {
      clearAccessToken();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};