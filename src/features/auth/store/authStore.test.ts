import { describe, it, expect } from "vitest";
import { useAuthStore } from "@features/auth/store/authStore";
import { tokenMemoryStore } from "@features/auth/utils/tokenMemoryStore";

describe("authStore + tokenMemoryStore", () => {
  it("el access token solo vive en memoria y nunca en localStorage", () => {
    // Estado inicial
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(tokenMemoryStore.get()).toBeNull();

    // Set session
    useAuthStore.getState().setSession(
      {
        id: "u",
        username: "u",
        email: "u@x.com",
        fullName: "User",
        roles: ["USUARIO"],
        active: true
      },
      "access-tok"
    );
    expect(tokenMemoryStore.get()).toBe("access-tok");
    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    // Clear session
    useAuthStore.getState().clearSession();
    expect(tokenMemoryStore.get()).toBeNull();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);

    // Nunca debe aparecer en localStorage
    expect(localStorage.getItem("jaxon_access_token")).toBeNull();
    expect(sessionStorage.getItem("jaxon_access_token")).toBeNull();
  });
});
