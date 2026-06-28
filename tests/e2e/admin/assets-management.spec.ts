import { expect, test } from "@playwright/test";

test("gestion de activo", async ({ page }) => {
  await page.route("**/api/v1/assets/admin", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        items: [
          {
            id: "1",
            code: "PC-001",
            name: "PC Recepcion",
            description: "Desktop Dell",
            status: "ACTIVE",
            assignedTo: { id: "u1", name: "Juan Perez" },
            createdAt: "2026-01-15T09:00:00.000Z",
            updatedAt: "2026-01-15T09:00:00.000Z"
          }
        ]
      })
    });
  });

  await page.route("**/api/v1/assets", async (route) => {
    if (route.request().method() === "POST") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: "2",
          code: "PC-002",
          name: "PC Soporte",
          description: "Desktop HP",
          status: "ACTIVE",
          createdAt: "2026-06-27T10:00:00.000Z",
          updatedAt: "2026-06-27T10:00:00.000Z"
        })
      });
    }
  });

  await page.route("**/api/v1/assets/orphans", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        items: [
          {
            id: "3",
            code: "ORPH-1",
            name: "Laptop desconocida",
            description: "Encontrada en sala de reuniones",
            discoveredAt: "2026-06-27T10:00:00.000Z"
          }
        ]
      })
    });
  });

  await page.goto("/admin/assets");

  await expect(page.getByRole("heading", { name: "Gestión de activos" })).toBeVisible();
  await expect(page.getByText("PC-001")).toBeVisible();
  await expect(page.getByText("PC Recepcion")).toBeVisible();
  await expect(page.getByText("Juan Perez")).toBeVisible();

  await page.goto("/admin/assets/new");

  await expect(page.getByRole("heading", { name: "Registrar nuevo activo" })).toBeVisible();
  await page.fill('input[name="code"]', "PC-002");
  await page.fill('input[name="name"]', "PC Soporte");
  await page.fill('textarea[name="description"]', "Desktop HP");
  await page.click('button[type="submit"]');

  await page.goto("/admin/assets/orphans");

  await expect(page.getByRole("heading", { name: "Activos huérfanos" })).toBeVisible();
  await expect(page.getByText("ORPH-1")).toBeVisible();
  await expect(page.getByText("Laptop desconocida")).toBeVisible();
  await expect(page.getByRole("button", { name: "Adoptar" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Rechazar" })).toBeVisible();
});
