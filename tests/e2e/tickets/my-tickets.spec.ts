import { expect, test } from "@playwright/test";

test("ver mis tickets", async ({ page }) => {
  await page.route("**/api/v1/tickets/me", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        items: [
          {
            id: "1",
            code: "TCK-1",
            title: "Falla monitor",
            status: "OPEN",
            createdAt: "2026-06-27T10:00:00.000Z",
            asset: {
              id: "a1",
              code: "PC-01",
              name: "PC Recepcion"
            }
          }
        ]
      })
    });
  });

  await page.goto("/my-tickets");

  await expect(page.getByRole("heading", { name: "Mis tickets" })).toBeVisible();
  await expect(page.getByText("Falla monitor")).toBeVisible();
  await expect(page.getByText(/PC Recepcion/)).toBeVisible();
});
