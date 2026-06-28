import { test as base, Page } from "@playwright/test";
import { testUsers, type TestUserRole, type TestUser } from "../utils/test-users";

type AuthFixtures = {
  authenticatedPage: Page;
  user: TestUser;
};

export const test = base.extend<AuthFixtures>({
  user: async ({}, use) => {
    await use(testUsers.USER);
  },
  authenticatedPage: async ({ page, user }, use) => {
    // Navigate to login page
    await page.goto("/login");
    
    // Fill login form
    await page.fill('input[name="email"]', user.email);
    await page.fill('input[name="password"]', user.password);
    await page.click('button[type="submit"]');
    
    // Wait for navigation to dashboard
    await page.waitForURL("/dashboard", { timeout: 10000 });
    
    await use(page);
  }
});

export async function loginAs(page: Page, role: TestUserRole): Promise<void> {
  const user = testUsers[role];
  await page.goto("/login");
  await page.fill('input[name="email"]', user.email);
  await page.fill('input[name="password"]', user.password);
  await page.click('button[type="submit"]');
  await page.waitForURL("/dashboard", { timeout: 10000 });
}

export async function logout(page: Page): Promise<void> {
  await page.click('button:has-text("Cerrar sesión")');
  await page.waitForURL("/login");
}

export async function isAuthenticated(page: Page): Promise<boolean> {
  const cookies = await page.context().cookies();
  return cookies.some(cookie => cookie.name === "auth-token");
}