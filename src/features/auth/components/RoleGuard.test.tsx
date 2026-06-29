import { describe, it, expect } from "vitest";
import { hasRole, ROLES, type Role } from "@/constants/roles";

describe("RoleGuard role checks", () => {
  const admin: Role[] = [ROLES.ADMIN];
  const tech: Role[] = [ROLES.TECNICO];
  const usr: Role[] = [ROLES.USUARIO];

  it("admin tiene acceso a ADMIN y TECNICO", () => {
    expect(hasRole(admin, ROLES.ADMIN)).toBe(true);
    expect(hasRole(admin, [ROLES.TECNICO, ROLES.AUDITOR])).toBe(true);
  });
  it("technician NO ve AUDITOR", () => {
    expect(hasRole(tech, ROLES.AUDITOR)).toBe(false);
  });
  it("usuario sin roles no pasa ningún check", () => {
    expect(hasRole(undefined, ROLES.USUARIO)).toBe(false);
    expect(hasRole([], ROLES.ADMIN)).toBe(false);
  });
  it("usuario sí ve USUARIO", () => {
    expect(hasRole(usr, ROLES.USUARIO)).toBe(true);
  });
});
