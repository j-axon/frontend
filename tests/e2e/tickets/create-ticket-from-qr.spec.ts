import { expect, test } from "@playwright/test";

const mockAsset = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Servidor Principal",
  code: "AST-001",
  status: "ACTIVE",
  serialNumber: "SN-E2E-001",
};

test.describe("E2E-FE-TICKET-001 — Crear ticket desde QR", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/v1/assets/qr/**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockAsset),
      });
    });
  });

  test("flujo completo desde deep-link QR hasta confirmación", async ({ page }) => {
    await page.route("**/v1/tickets", async (route) => {
      if (route.request().method() === "POST") {
        await route.fulfill({
          status: 201,
          contentType: "application/json",
          body: JSON.stringify({ id: "ticket-e2e-1", message: "Created" }),
        });
        return;
      }
      await route.continue();
    });

    await page.goto(`/tickets/new?assetId=${mockAsset.id}`);

    await expect(page.getByTestId("asset-field-name")).toHaveValue(mockAsset.name);
    await expect(page.getByTestId("asset-field-code")).toHaveValue(mockAsset.code);

    await page.getByLabel("Descripción").fill(
      "El servidor no responde desde la mañana en la red local"
    );
    await page.getByLabel("Categoría").selectOption("Infraestructura");
    await page.getByRole("button", { name: "Crear Ticket" }).click();

    await expect(page.getByTestId("ticket-success-message")).toBeVisible();
    await expect(page.getByText("¡Ticket creado con éxito!")).toBeVisible();
  });

  test("flujo desde escáner manual hacia formulario", async ({ page }) => {
    await page.goto("/tickets/scan");

    await page.getByTestId("scan-asset-id-input").fill(mockAsset.id);
    await page.getByTestId("scan-continue-button").click();

    await expect(page).toHaveURL(new RegExp(`/tickets/new\\?assetId=${mockAsset.id}`));
    await expect(page.getByTestId("ticket-from-qr-form")).toBeVisible();
  });
});
