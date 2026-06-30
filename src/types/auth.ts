/**
 * Tipos de dominio para Auth — alineados con el frontend de los compañeros.
 */
import type { Role } from "@/constants/roles";

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  fullName: string;
  roles: Role[];
  active?: boolean;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  usuario: AuthUser;
};

export type RefreshResponse = {
  accessToken: string;
  tokenType?: string;
  expiresIn?: number;
  /** Presente en mocks; el backend real solo devuelve el token. */
  usuario?: AuthUser;
};

export type LogoutResponse = {
  mensaje: string;
};
