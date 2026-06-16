export const ROLES = {
  ADMIN: "ADMIN",
  TECHNICIAN: "TECHNICIAN",
  USER: "USER",
  AUDITOR: "AUDITOR"
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
