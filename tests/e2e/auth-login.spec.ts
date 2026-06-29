import { test, expect } from "@playwright/test";
import { loginUI, logoutUI } from "./helpers/auth";
import { users } from "./fixtures/users";

test.describe("Auth login/logout", () => {
  test("admin puede iniciar y cerrar sesión", async ({ page }) => {
    await loginUI(page, users.ADMIN.email, users.ADMIN.password);
    await expect(page.getByRole("heading", { name: /hola,/i })).toBeVisible();
    await logoutUI(page);
    await expect(page).toHaveURL(/\/login$/);
  });

  test("credenciales inválidas muestran error", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel(/correo electrónico/i).fill("nadie@empresa.com");
    await page.getByLabel(/contraseña/i).fill("bad-password");
    await page.getByRole("button", { name: /iniciar sesión/i }).click();
    await expect(page.getByRole("alert")).toBeVisible();
  });
});
