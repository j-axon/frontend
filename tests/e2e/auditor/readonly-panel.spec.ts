import { test, expect } from "@playwright/test";
import { loginAs } from "../fixtures/auth.fixture";
import { testUsers } from "../utils/test-users";

test.describe("Auditor - Read-only Panel", () => {
  test("E2E-FE-AUDIT-001: Auditor puede acceder a audit logs", async ({ page }) => {
    await loginAs(page, "AUDITOR");
    
    await page.goto("/auditor/audit-logs");
    
    await expect(page.getByText("Registros de Auditoría")).toBeVisible();
  });

  test("E2E-FE-AUDIT-002: Auditor puede acceder a reportes", async ({ page }) => {
    await loginAs(page, "AUDITOR");
    
    await page.goto("/auditor/reports");
    
    await expect(page.getByText("Reportes Agregados")).toBeVisible();
  });

  test("E2E-FE-AUDIT-003: Audit logs no tiene botones de edición", async ({ page }) => {
    await loginAs(page, "AUDITOR");
    
    await page.goto("/auditor/audit-logs");
    
    const editButtons = await page.locator("button:has-text('Editar')").count();
    const deleteButtons = await page.locator("button:has-text('Eliminar')").count();
    const createButtons = await page.locator("button:has-text('Crear')").count();
    
    expect(editButtons).toBe(0);
    expect(deleteButtons).toBe(0);
    expect(createButtons).toBe(0);
  });

  test("E2E-FE-AUDIT-004: Reports no tiene botones de edición", async ({ page }) => {
    await loginAs(page, "AUDITOR");
    
    await page.goto("/auditor/reports");
    
    const editButtons = await page.locator("button:has-text('Editar')").count();
    const deleteButtons = await page.locator("button:has-text('Eliminar')").count();
    const createButtons = await page.locator("button:has-text('Crear')").count();
    
    expect(editButtons).toBe(0);
    expect(deleteButtons).toBe(0);
    expect(createButtons).toBe(0);
  });

  test("E2E-FE-AUDIT-005: Audit logs tiene filtros", async ({ page }) => {
    await loginAs(page, "AUDITOR");
    
    await page.goto("/auditor/audit-logs");
    
    await expect(page.getByLabel("Acción")).toBeVisible();
    await expect(page.getByLabel("Tipo de entidad")).toBeVisible();
    await expect(page.getByLabel("Fecha desde")).toBeVisible();
    await expect(page.getByLabel("Fecha hasta")).toBeVisible();
  });

  test("E2E-FE-AUDIT-006: Auditor puede navegar entre páginas", async ({ page }) => {
    await loginAs(page, "AUDITOR");
    
    await page.goto("/auditor/audit-logs");
    await page.click('text=Reportes');
    
    await expect(page).toHaveURL("/auditor/reports");
    await expect(page.getByText("Reportes Agregados")).toBeVisible();
  });

  test("E2E-FE-AUDIT-007: Reports muestra KPIs", async ({ page }) => {
    await loginAs(page, "AUDITOR");
    
    await page.goto("/auditor/reports");
    
    await expect(page.getByText("Total Tickets")).toBeVisible();
    await expect(page.getByText("Tickets Abiertos")).toBeVisible();
  });
});