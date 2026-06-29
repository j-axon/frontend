import { test, expect } from "@playwright/test";
import { loginUI } from "./helpers/auth";
import { users } from "./fixtures/users";

test.describe("QR → Ticket", () => {
  test("usuario ve la página de escaneo y navega al ticket", async ({ page }) => {
    await loginUI(page, users.USUARIO.email, users.USUARIO.password);
    await page.goto("/qr/scan");
    await expect(page.getByRole("heading", { name: /escanear qr/i })).toBeVisible();

    // No simulamos la cámara: validamos el fallback de UUID manual navegando directo.
    const uuid = "aaaaaaaa-bbbb-4ccc-9ddd-eeeeeeeeeeee";
    await page.goto(`/tickets/new/${uuid}`);
    await expect(page.getByRole("heading", { name: /nuevo ticket desde qr/i })).toBeVisible();
  });
});
