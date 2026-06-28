import { test, expect } from "@playwright/test";
import { loginAs, logout } from "../fixtures/auth.fixture";
import { testUsers } from "../utils/test-users";

test.describe("QR Code - Ticket Creation", () => {
  test("E2E-FE-TICKET-001: Usuario puede crear ticket escaneando QR", async ({ page }) => {
    await loginAs(page, "USER");
    
    // Simular escaneo QR con payload codificado
    const qrPayload = btoa(JSON.stringify({ assetId: "ASSET-001", location: "Oficina Principal" }));
    await page.goto(`/scan/${qrPayload}`);
    
    // Verificar que se muestra el formulario de ticket
    await expect(page.getByText("Crear Ticket")).toBeVisible();
    await expect(page.getByText("ASSET-001")).toBeVisible();
    
    // Llenar formulario
    await page.fill('textarea[name="description"]', "Problema de hardware detectado");
    await page.selectOption('select[name="category"]', "HARDWARE");
    await page.click('button:has-text("Crear Ticket")');
    
    // Verificar ticket creado
    await expect(page.getByText("Ticket creado exitosamente")).toBeVisible();
  });

  test("E2E-FE-TICKET-002: QR inválido muestra error", async ({ page }) => {
    await loginAs(page, "USER");
    
    await page.goto("/scan/invalid-qr");
    
    await expect(page.getByText("Código QR inválido")).toBeVisible();
    await expect(page.getByText("Volver al inicio")).toBeVisible();
  });

  test("E2E-FE-TICKET-003: Usuario no autenticado no puede crear ticket", async ({ page }) => {
    const qrPayload = btoa(JSON.stringify({ assetId: "ASSET-001" }));
    await page.goto(`/scan/${qrPayload}`);
    
    // Debe redirigir a login
    await expect(page).toHaveURL("/login");
  });

  test("E2E-FE-TICKET-004: Técnico puede ver tickets asignados", async ({ page }) => {
    await loginAs(page, "TECHNICIAN");
    
    await page.goto("/tickets");
    
    // Verificar que hay filtros de tickets
    await expect(page.getByLabel("Estado")).toBeVisible();
    await expect(page.getByLabel("Categoría")).toBeVisible();
  });
});