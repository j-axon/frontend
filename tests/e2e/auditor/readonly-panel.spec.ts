import { test, expect } from "@playwright/test";

test.describe("Auditor Read-only Panel", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auditor/audit-logs");
  });

  test("E2E-FE-AUDIT-001: Auditor can access audit logs page", async ({ page }) => {
    await page.goto("/auditor/audit-logs");
    await expect(page.getByText("Registros de Auditoría")).toBeVisible();
  });

  test("E2E-FE-AUDIT-002: Auditor can access reports page", async ({ page }) => {
    await page.goto("/auditor/reports");
    await expect(page.getByText("Reportes Agregados")).toBeVisible();
  });

  test("E2E-FE-AUDIT-003: Audit logs page has no edit buttons", async ({ page }) => {
    await page.goto("/auditor/audit-logs");
    const editButtons = await page.locator("button:has-text('Editar')").count();
    const deleteButtons = await page.locator("button:has-text('Eliminar')").count();
    const createButtons = await page.locator("button:has-text('Crear')").count();
    
    expect(editButtons).toBe(0);
    expect(deleteButtons).toBe(0);
    expect(createButtons).toBe(0);
  });

  test("E2E-FE-AUDIT-004: Reports page has no edit buttons", async ({ page }) => {
    await page.goto("/auditor/reports");
    const editButtons = await page.locator("button:has-text('Editar')").count();
    const deleteButtons = await page.locator("button:has-text('Eliminar')").count();
    const createButtons = await page.locator("button:has-text('Crear')").count();
    
    expect(editButtons).toBe(0);
    expect(deleteButtons).toBe(0);
    expect(createButtons).toBe(0);
  });

  test("E2E-FE-AUDIT-005: Audit logs page has filters", async ({ page }) => {
    await page.goto("/auditor/audit-logs");
    await expect(page.getByLabel("Acción")).toBeVisible();
    await expect(page.getByLabel("Tipo de entidad")).toBeVisible();
    await expect(page.getByLabel("Fecha desde")).toBeVisible();
    await expect(page.getByLabel("Fecha hasta")).toBeVisible();
  });

  test("E2E-FE-AUDIT-006: Auditor can navigate between pages", async ({ page }) => {
    await page.goto("/auditor/audit-logs");
    await page.getByRole("link", { name: "Reportes" }).click();
    await expect(page).toHaveURL("/auditor/reports");
    await expect(page.getByText("Reportes Agregados")).toBeVisible();
  });
});