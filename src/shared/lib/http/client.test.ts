import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "@/test/mocks/server";
import { apiClient } from "@shared/lib/http/client";
import { tokenMemoryStore } from "@features/auth/utils/tokenMemoryStore";

describe("apiClient", () => {
  afterEach(() => {
    tokenMemoryStore.clear();
  });

  it("adjunta Authorization cuando hay access token en memoria", async () => {
    let capturedAuth: string | null = null;
    server.use(
      http.get("*/api/v1/auth/me", ({ request }) => {
        capturedAuth = request.headers.get("authorization");
        return HttpResponse.json({ id: "u", username: "u", email: "x", fullName: "U", roles: ["ADMIN"], active: true });
      })
    );
    tokenMemoryStore.set("abc-123");
    await apiClient("/auth/me");
    expect(capturedAuth).toBe("Bearer abc-123");
  });

  it("permite saltar Authorization con skipAuth", async () => {
    let capturedAuth: string | null = "no-llamado";
    server.use(
      http.post("*/api/v1/auth/login", ({ request }) => {
        capturedAuth = request.headers.get("authorization");
        return HttpResponse.json({ accessToken: "x", tokenType: "Bearer", expiresIn: 1, usuario: {} });
      })
    );
    await apiClient("/auth/login", { method: "POST", skipAuth: true });
    expect(capturedAuth).toBeNull();
  });
});
