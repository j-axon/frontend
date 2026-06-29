import { apiClient } from "@shared/lib/http/client";
import type { AuthUser, RefreshResponse } from "@/types/auth";

export const sessionService = {
  /** Intenta renovar el access token con la cookie HttpOnly. */
  async refresh(): Promise<RefreshResponse> {
    return apiClient<RefreshResponse>("/auth/refresh", {
      method: "POST",
      withCredentials: true,
      skipAuth: true
    });
  },

  /** Recupera el usuario actual; se asume que ya hay access token. */
  async me(): Promise<AuthUser> {
    return apiClient<AuthUser>("/auth/me", { method: "GET" });
  }
};
