/**
 * Roles según backend v6.
 */
export const ROLES = {
  ADMIN: "ADMIN",
  TECNICO: "TECNICO",
  USUARIO: "USUARIO",
  AUDITOR: "AUDITOR"
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ALL_ROLES: Role[] = [
  ROLES.ADMIN,
  ROLES.TECNICO,
  ROLES.USUARIO,
  ROLES.AUDITOR
];

export function hasRole(userRoles: Role[] | undefined, required: Role | Role[]): boolean {
  if (!userRoles || userRoles.length === 0) return false;
  const list = Array.isArray(required) ? required : [required];
  return list.some((r) => userRoles.includes(r));
}
