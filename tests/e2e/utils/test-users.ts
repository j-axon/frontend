import type { User } from "@/types/auth";

export type TestUserRole = "ADMIN" | "TECHNICIAN" | "USER" | "AUDITOR";

export interface TestUser {
  id: string;
  email: string;
  password: string;
  name: string;
  roles: TestUserRole[];
  token?: string;
}

export const testUsers: Record<TestUserRole, TestUser> = {
  ADMIN: {
    id: "admin-001",
    email: "admin@j-axon.com",
    password: "Admin123!",
    name: "Admin User",
    roles: ["ADMIN"]
  },
  TECHNICIAN: {
    id: "tech-001",
    email: "tecnico@j-axon.com",
    password: "Tech123!",
    name: "Técnico de Soporte",
    roles: ["TECHNICIAN"]
  },
  USER: {
    id: "user-001",
    email: "usuario@j-axon.com",
    password: "User123!",
    name: "Usuario de Prueba",
    roles: ["USER"]
  },
  AUDITOR: {
    id: "auditor-001",
    email: "auditor@j-axon.com",
    password: "Audit123!",
    name: "Auditor Externo",
    roles: ["AUDITOR"]
  }
};

export function getTestUser(role: TestUserRole): TestUser {
  return testUsers[role];
}

export function createMockUser(overrides: Partial<TestUser> = {}): TestUser {
  return {
    ...testUsers.USER,
    ...overrides,
    id: `mock-${Date.now()}`,
    email: `mock-${Date.now()}@test.com`
  };
}