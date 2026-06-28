import type { Role } from "@/constants/roles";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  roles: Role[];
};

export type LoginRequest = {
  email: string;
  password: string;
};

// Shape returned by the backend /v1/auth/login endpoint.
export type BackendLoginResponse = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  usuario: {
    id: string;
    nombre: string;
    email: string;
    activo: boolean;
    roles: string[];
  };
};

// Convenience alias for app code.
export type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};