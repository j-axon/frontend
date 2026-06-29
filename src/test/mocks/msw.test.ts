import { describe, it, expect } from "vitest";
import { handlers } from "./mocks/handlers";

describe("MSW handlers", () => {
  it("expone handlers para auth, tickets y assets", () => {
    expect(handlers.length).toBeGreaterThan(0);
    const paths = handlers.map((h) => (h.info as { path: string }).path);
    expect(paths.some((p) => p.includes("/auth/login"))).toBe(true);
    expect(paths.some((p) => p.includes("/tickets"))).toBe(true);
    expect(paths.some((p) => p.includes("/assets"))).toBe(true);
  });
});
