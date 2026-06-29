import { test, expect } from "@playwright/test";
import { loginUI } from "./helpers/auth";
import { users } from "./fixtures/users";

test.describe("Admin alerts", () => {
  test("admin navega al panel de huérfanos donde se consumen alertas en vivo", async ({
    page
  }) => {
    await loginUI(page, users.ADMIN.email, users.ADMIN.password);
    await page.goto("/admin/orphans");
    await expect(page.getByRole("heading", { name: /huérfanos/i })).toBeVisible();
    await expect(page.getByText(/alertas en vivo/i)).toBeVisible();
  });
});
