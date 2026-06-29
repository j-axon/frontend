import { test, expect } from "@playwright/test";
import { loginUI } from "./helpers/auth";
import { users } from "./fixtures/users";

test.describe("RBAC navigation", () => {
  test("admin ve módulo de activos", async ({ page }) => {
    await loginUI(page, users.ADMIN.email, users.ADMIN.password);
    await page.goto("/admin/assets");
    await expect(page.getByRole("heading", { name: /^activos$/i })).toBeVisible();
  });

  test("técnico ve la cola", async ({ page }) => {
    await loginUI(page, users.TECNICO.email, users.TECNICO.password);
    await page.goto("/technician/tickets");
    await expect(page.getByRole("heading", { name: /cola de tickets/i })).toBeVisible();
  });

  test("auditor ve reportes", async ({ page }) => {
    await loginUI(page, users.AUDITOR.email, users.AUDITOR.password);
    await page.goto("/auditor/reports");
    await expect(page.getByRole("heading", { name: /^reportes$/i })).toBeVisible();
  });
});
