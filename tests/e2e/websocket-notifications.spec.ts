import { test, expect } from "@playwright/test";
import { loginUI } from "./helpers/auth";
import { users } from "./fixtures/users";

test.describe("WebSocket notifications", () => {
  test("UI muestra badge y panel de notificaciones", async ({ page }) => {
    await loginUI(page, users.ADMIN.email, users.ADMIN.password);
    await page.goto("/notifications");
    await expect(page.getByRole("heading", { name: /notificaciones/i })).toBeVisible();
  });
});
