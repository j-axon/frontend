import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "@/test/mocks/server";
import { authService } from "@features/auth/services/authService";

describe("authService", () => {
  beforeEach(() => {
    // Sobrescribe el handler de login para esta suite
    server.use(
      http.post("*/api/v1/auth/login", () =>
        HttpResponse.json({
          accessToken: "tok",
          tokenType: "Bearer",
          expiresIn: 3600,
          usuario: {
            id: "u1",
            username: "ada",
            email: "ada@empresa.com",
            fullName: "Ada Admin",
            roles: ["ADMIN"],
            active: true
          }
        })
      ),
      http.post("*/api/v1/auth/logout", () =>
        HttpResponse.json({ mensaje: "ok" })
      ),
      http.post("*/api/v1/auth/refresh", () =>
        HttpResponse.json({
          accessToken: "tok-refresh",
          tokenType: "Bearer",
          expiresIn: 3600,
          usuario: {
            id: "u1",
            username: "ada",
            email: "ada@empresa.com",
            fullName: "Ada Admin",
            roles: ["ADMIN"],
            active: true
          }
        })
      )
    );
  });
  afterEach(() => {
    server.resetHandlers();
  });

  it("login envía credenciales y retorna tokens", async () => {
    let requested = false;
    server.use(
      http.post("*/api/v1/auth/login", async ({ request }) => {
        requested = true;
        expect(request.headers.get("content-type")).toMatch(/application\/json/);
        return HttpResponse.json({
          accessToken: "tok",
          tokenType: "Bearer",
          expiresIn: 3600,
          usuario: {
            id: "u1",
            username: "ada",
            email: "ada@empresa.com",
            fullName: "Ada Admin",
            roles: ["ADMIN"],
            active: true
          }
        });
      })
    );
    const r = await authService.login({ email: "ada@empresa.com", password: "secret-123" });
    expect(requested).toBe(true);
    expect(r.accessToken).toBe("tok");
    expect(r.usuario.roles).toContain("ADMIN");
  });

  it("logout retorna mensaje", async () => {
    const r = await authService.logout();
    expect(r.mensaje).toBe("ok");
  });

  it("refresh retorna nuevos tokens", async () => {
    const r = await authService.refresh();
    expect(r.accessToken).toBe("tok-refresh");
  });
});
