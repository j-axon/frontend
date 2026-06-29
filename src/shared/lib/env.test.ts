import { describe, it, expect } from "vitest";
import { env } from "@shared/lib/env";

describe("env", () => {
  it("expone apiBaseUrl con fallback", () => {
    expect(env.apiBaseUrl).toMatch(/^https?:\/\//);
  });
  it("expone wsUrl con fallback", () => {
    expect(env.wsUrl).toMatch(/^wss?:\/\//);
  });
  it("expone appName", () => {
    expect(env.appName.length).toBeGreaterThan(0);
  });
});
