import { apiClient } from "@shared/lib/http/client";
import type {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RefreshResponse
} from "@/types/auth";

export const authService = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    return apiClient<LoginResponse>("/auth/login", {
      method: "POST",
      body: payload,
      withCredentials: true,
      skipAuth: true
    });
  },

  async logout(): Promise<LogoutResponse> {
    // La cookie HttpOnly se limpia en el backend; aquí solo usamos credentials.
    return apiClient<LogoutResponse>("/auth/logout", {
      method: "POST",
      withCredentials: true,
      skipAuth: true
    });
  },

  async refresh(): Promise<RefreshResponse> {
    return apiClient<RefreshResponse>("/auth/refresh", {
      method: "POST",
      withCredentials: true,
      skipAuth: true
    });
  }
};
