import { expect, test } from "@playwright/test";

test("crear ticket desde QR", async ({ page }) => {
  await page.route("**/api/v1/tickets", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        uuid: "ticket-001",
        codigo: "TCK-2026-0001",
        estado: "OPEN",
        createdAt: new Date().toISOString()
      })
    });
  });

  await page.goto(
    "/tickets/scan?assetUuid=asset-001&assetCode=PC-01&assetName=Laptop%20Recepcion&technicalType=Laptop"
  );

  await expect(page.getByLabel("UUID")).toHaveValue("asset-001");
  await expect(page.getByLabel("Codigo")).toHaveValue("PC-01");

  await page.getByLabel("Descripcion de la falla").fill("El equipo no enciende desde primera hora del turno");
  await page.getByLabel("Categoria").selectOption("HARDWARE");
  await page.getByLabel("Prioridad").selectOption("HIGH");
  await page.getByRole("button", { name: "Crear ticket" }).click();

  await expect(page.getByText("Ticket creado correctamente: TCK-2026-0001")).toBeVisible();
});
