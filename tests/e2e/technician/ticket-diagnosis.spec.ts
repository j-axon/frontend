import { expect, test } from "@playwright/test";

test("tecnico atiende ticket", async ({ page }) => {
  await page.route("**/api/v1/tickets/technician", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        items: [
          {
            id: "1",
            code: "TCK-1",
            title: "Falla monitor",
            description: "El monitor no enciende",
            status: "OPEN",
            createdAt: "2026-06-27T10:00:00.000Z",
            updatedAt: "2026-06-27T10:00:00.000Z",
            asset: {
              id: "a1",
              code: "PC-01",
              name: "PC Recepcion"
            },
            owner: {
              id: "u1",
              name: "Juan Perez"
            }
          }
        ]
      })
    });
  });

  await page.route("**/api/v1/tickets/1", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        id: "1",
        code: "TCK-1",
        title: "Falla monitor",
        description: "El monitor no enciende",
        status: "OPEN",
        createdAt: "2026-06-27T10:00:00.000Z",
        updatedAt: "2026-06-27T10:00:00.000Z",
        asset: {
          id: "a1",
          code: "PC-01",
          name: "PC Recepcion",
          description: "Monitor Dell 24 pulgadas"
        },
        owner: {
          id: "u1",
          name: "Juan Perez"
        }
      })
    });
  });

  await page.route("**/api/v1/tickets/1/diagnosis", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        id: "d1",
        summary: "Posible falla en el cable de alimentación",
        suggestedActions: ["Verificar conexión", "Reemplazar cable"],
        confidence: 85,
        createdAt: "2026-06-27T10:05:00.000Z"
      })
    });
  });

  await page.route("**/api/v1/assets/a1/history", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        items: [
          {
            id: "h1",
            type: "ASSIGNMENT",
            description: "Asignado a Juan Perez",
            createdAt: "2026-01-15T09:00:00.000Z",
            user: { name: "Admin" }
          }
        ]
      })
    });
  });

  await page.goto("/technician/tickets");

  await expect(page.getByRole("heading", { name: "Cola de tickets" })).toBeVisible();
  await expect(page.getByText("Falla monitor")).toBeVisible();

  await page.click("a[href='/technician/tickets/1']");

  await expect(page.getByRole("heading", { name: "Detalle del ticket" })).toBeVisible();
  await expect(page.getByText("Falla monitor")).toBeVisible();
  await expect(page.getByText("PC Recepcion")).toBeVisible();
  await expect(page.getByText("Diagnóstico IA")).toBeVisible();
  await expect(page.getByText("Posible falla en el cable de alimentación")).toBeVisible();
  await expect(page.getByTestId("confidence-badge")).toContainText("Alta (85%)");
  await expect(page.getByText(/Advertencia:/)).toBeVisible();
  await expect(page.getByText("Historial del activo")).toBeVisible();
});
