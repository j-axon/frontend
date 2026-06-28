import { httpClient } from "@/lib/api/http-client";
import type { LoginRequest, LoginResponse } from "@/types/auth";

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return httpClient<LoginResponse>("/v1/auth/login", {
      method: "POST",
      body: credentials,
      authenticated: false,
    });
  },

  logout: async (): Promise<void> => {
    await httpClient("/v1/auth/logout", { method: "POST" });
  },
};