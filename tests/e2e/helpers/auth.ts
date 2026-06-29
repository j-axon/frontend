import type { Page } from "@playwright/test";

export async function loginUI(
  page: Page,
  email: string,
  password: string
): Promise<void> {
  await page.goto("/login");
  await page.getByLabel(/correo electrónico/i).fill(email);
  await page.getByLabel(/contraseña/i).fill(password);
  await page.getByRole("button", { name: /iniciar sesión/i }).click();
  await page.waitForURL("**/dashboard", { timeout: 15_000 });
}

export async function logoutUI(page: Page): Promise<void> {
  await page.getByRole("button", { name: /salir/i }).click();
  await page.waitForURL("**/login", { timeout: 10_000 });
}
