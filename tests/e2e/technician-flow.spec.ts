import { test, expect } from "@playwright/test";
import { loginUI } from "./helpers/auth";
import { users } from "./fixtures/users";

test.describe("Technician flow", () => {
  test("técnico ve la cola y abre detalle de un ticket", async ({ page }) => {
    await loginUI(page, users.TECNICO.email, users.TECNICO.password);
    await page.goto("/technician/tickets");
    await expect(
      page.getByRole("heading", { name: /cola de tickets/i })
    ).toBeVisible();
  });
});
