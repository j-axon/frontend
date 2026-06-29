export type UserFixture = {
  email: string;
  password: string;
  role: "ADMIN" | "TECNICO" | "USUARIO" | "AUDITOR";
};

export const users: Record<UserFixture["role"], UserFixture> = {
  ADMIN: { email: "admin@empresa.com", password: "secret-123", role: "ADMIN" },
  TECNICO: { email: "tecnico@empresa.com", password: "secret-123", role: "TECNICO" },
  USUARIO: { email: "user@empresa.com", password: "secret-123", role: "USUARIO" },
  AUDITOR: { email: "auditor@empresa.com", password: "secret-123", role: "AUDITOR" }
};
