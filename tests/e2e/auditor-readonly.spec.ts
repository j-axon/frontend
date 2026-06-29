import { test, expect } from "@playwright/test";
import { loginUI } from "./helpers/auth";
import { users } from "./fixtures/users";

test.describe("Auditor readonly", () => {
  test("auditor navega a logs y reportes", async ({ page }) => {
    await loginUI(page, users.AUDITOR.email, users.AUDITOR.password);
    await page.goto("/auditor/audit");
    await expect(page.getByRole("heading", { name: /^auditoría$/i })).toBeVisible();
    await page.goto("/auditor/reports");
    await expect(page.getByRole("heading", { name: /^reportes$/i })).toBeVisible();
  });
});
