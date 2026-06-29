import { test, expect } from "@playwright/test";
import { loginUI } from "./helpers/auth";
import { users } from "./fixtures/users";

test.describe("Session refresh", () => {
  test("al navegar a varias páginas protegidas, la sesión sigue válida", async ({
    page
  }) => {
    await loginUI(page, users.ADMIN.email, users.ADMIN.password);
    await page.goto("/admin/assets");
    await page.goto("/dashboard");
    await page.goto("/notifications");
    await expect(page.getByRole("heading", { name: /notificaciones/i })).toBeVisible();
  });
});
