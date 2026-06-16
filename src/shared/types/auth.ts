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

export type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};
