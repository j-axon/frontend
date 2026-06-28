import { httpClient } from "@/lib/api/http-client";
import type { AuthUser, LoginRequest, LoginResponse, BackendLoginResponse } from "@/types/auth";

const VALID_ROLES = new Set(["ADMIN", "TECNICO", "USUARIO", "AUDITOR"]);

function mapUsuario(usuario: BackendLoginResponse["usuario"]): AuthUser {
  return {
    id: usuario.id,
    name: usuario.nombre,
    email: usuario.email,
    roles: (usuario.roles || []).filter((r): r is AuthUser["roles"][number] =>
      VALID_ROLES.has(r)
    ) as AuthUser["roles"],
  };
}

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const raw = await httpClient<BackendLoginResponse>("/v1/auth/login", {
      method: "POST",
      body: credentials,
      authenticated: false,
    });
    return {
      accessToken: raw.accessToken,
      user: mapUsuario(raw.usuario),
    };
  },

  logout: async (): Promise<void> => {
    await httpClient("/v1/auth/logout", { method: "POST" });
  },
};