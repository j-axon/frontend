import { test, expect } from "@playwright/test";
import { loginAs } from "../fixtures/auth.fixture";
import { testUsers } from "../utils/test-users";

test.describe("Technician - Ticket Diagnosis", () => {
  test("E2E-FE-TECH-001: Técnico puede acceder al panel de tickets", async ({ page }) => {
    await loginAs(page, "TECHNICIAN");
    
    await page.goto("/tickets");
    
    await expect(page.getByText("Tickets")).toBeVisible();
    await expect(page.getByRole("button", { name: "Crear Ticket" })).toBeVisible();
  });

  test("E2E-FE-TECH-002: Técnico puede ver detalle de ticket", async ({ page }) => {
    await loginAs(page, "TECHNICIAN");
    
    await page.goto("/tickets");
    await page.click('text=TKT-001');
    
    await expect(page.getByText("Detalles del Ticket")).toBeVisible();
    await expect(page.getByText("Estado")).toBeVisible();
  });

  test("E2E-FE-TECH-003: Técnico puede actualizar estado de ticket", async ({ page }) => {
    await loginAs(page, "TECHNICIAN");
    
    await page.goto("/tickets/TKT-001");
    await page.selectOption('select[name="status"]', "IN_PROGRESS");
    await page.click('button:has-text("Actualizar")');
    
    await expect(page.getByText("Ticket actualizado")).toBeVisible();
  });

  test("E2E-FE-TECH-004: Técnico puede agregar diagnóstico IA", async ({ page }) => {
    await loginAs(page, "TECHNICIAN");
    
    await page.goto("/tickets/TKT-001");
    await page.click('button:has-text("Ejecutar Diagnóstico")');
    
    // Esperar resultado de IA
    await expect(page.getByText("Diagnóstico en progreso")).toBeVisible({ timeout: 10000 });
  });

  test("E2E-FE-TECH-005: Técnico puede ver historial del ticket", async ({ page }) => {
    await loginAs(page, "TECHNICIAN");
    
    await page.goto("/tickets/TKT-001");
    await page.click('text=Historial');
    
    await expect(page.getByText("Historial de cambios")).toBeVisible();
  });
});