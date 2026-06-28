import { test, expect } from "@playwright/test";
import { testUsers } from "../utils/test-users";

test.describe("Authentication - Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("E2E-FE-AUTH-001: Login exitoso con credenciales válidas", async ({ page }) => {
    const user = testUsers.USER;
    
    await page.fill('input[name="email"]', user.email);
    await page.fill('input[name="password"]', user.password);
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL("/dashboard", { timeout: 10000 });
    await expect(page.getByText("J-AXON")).toBeVisible();
  });

  test("E2E-FE-AUTH-002: Login falla con credenciales inválidas", async ({ page }) => {
    await page.fill('input[name="email"]', "invalid@test.com");
    await page.fill('input[name="password"]', "wrongpassword");
    await page.click('button[type="submit"]');
    
    await expect(page.getByText("Credenciales inválidas")).toBeVisible();
    await expect(page).toHaveURL("/login");
  });

  test("E2E-FE-AUTH-003: Login muestra errores de validación", async ({ page }) => {
    await page.click('button[type="submit"]');
    
    await expect(page.getByText("El email es requerido")).toBeVisible();
    await expect(page.getByText("La contraseña es requerida")).toBeVisible();
  });

  test("E2E-FE-AUTH-004: Técnico puede iniciar sesión", async ({ page }) => {
    const user = testUsers.TECHNICIAN;
    
    await page.fill('input[name="email"]', user.email);
    await page.fill('input[name="password"]', user.password);
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL("/dashboard", { timeout: 10000 });
    await expect(page.getByText(user.name)).toBeVisible();
  });

  test("E2E-FE-AUTH-005: Auditor puede iniciar sesión", async ({ page }) => {
    const user = testUsers.AUDITOR;
    
    await page.fill('input[name="email"]', user.email);
    await page.fill('input[name="password"]', user.password);
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL("/auditor/audit-logs", { timeout: 10000 });
    await expect(page.getByText("Panel de Auditoría")).toBeVisible();
  });

  test("E2E-FE-AUTH-006: Admin puede iniciar sesión", async ({ page }) => {
    const user = testUsers.ADMIN;
    
    await page.fill('input[name="email"]', user.email);
    await page.fill('input[name="password"]', user.password);
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL("/dashboard", { timeout: 10000 });
    await expect(page.getByText("Administración")).toBeVisible();
  });
});