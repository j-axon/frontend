import { describe, expect, it } from "vitest";
import { mapAuthUser, userInitials } from "./mapAuthUser";

describe("mapAuthUser", () => {
  it("mapea nombre del backend a fullName", () => {
    const user = mapAuthUser({
      id: "11111111-1111-1111-1111-111111111111",
      email: "admin@empresa.com",
      nombre: "Ada Admin",
      activo: true,
      roles: ["ADMIN"]
    });

    expect(user.fullName).toBe("Ada Admin");
    expect(user.username).toBe("admin");
    expect(user.active).toBe(true);
  });

  it("conserva fullName cuando ya viene del mock", () => {
    const user = mapAuthUser({
      id: "1",
      email: "u@x.com",
      username: "u",
      fullName: "User Test",
      roles: ["USUARIO"]
    });

    expect(user.fullName).toBe("User Test");
    expect(user.username).toBe("u");
  });
});

describe("userInitials", () => {
  it("devuelve iniciales seguras", () => {
    expect(userInitials("Ada Admin")).toBe("AA");
    expect(userInitials(undefined)).toBe("?");
    expect(userInitials("")).toBe("?");
  });
});
