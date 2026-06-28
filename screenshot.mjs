// Visual tour of the J-AXON frontend using Playwright.
import { chromium } from "playwright";
import fs from "fs";

const SHOTS = "/tmp/jaxon-shots";
fs.mkdirSync(SHOTS, { recursive: true });

const ROUTES = [
  { path: "/", name: "00-landing" },
  { path: "/login", name: "01-login" },
  { path: "/dashboard", name: "02-dashboard" },
  { path: "/admin/assets", name: "03-admin-assets" },
  { path: "/technician/tickets", name: "04-technician-tickets" },
  { path: "/my-tickets", name: "05-my-tickets" },
  { path: "/tickets/new", name: "06-tickets-new" },
];

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();

const consoleLogs = [];
const networkErrors = [];
page.on("console", (msg) => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
page.on("pageerror", (err) => consoleLogs.push(`[pageerror] ${err.message}`));
page.on("response", (resp) => {
  if (resp.status() >= 400) networkErrors.push(`${resp.status()} ${resp.url()}`);
});

console.log("→ /login (fill form)");
await page.goto("http://localhost:3000/login", { waitUntil: "networkidle" });
await page.screenshot({ path: `${SHOTS}/01-login-empty.png`, fullPage: true });
await page.fill('input[type="email"]', "admin@jaxon.local");
await page.fill('input[type="password"]', "JaxonAdmin2026!");
await page.click('button[type="submit"]');
await page.waitForLoadState("networkidle");
await page.waitForTimeout(1500);

for (const route of ROUTES) {
  if (route.path === "/login") continue;
  console.log(`→ ${route.path}`);
  try {
    await page.goto(`http://localhost:3000${route.path}`, { waitUntil: "networkidle", timeout: 15000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${SHOTS}/${route.name}.png`, fullPage: true });
    const visibleText = await page.evaluate(() => {
      const main = document.querySelector("main");
      return main ? main.innerText.substring(0, 400) : "(no main)";
    });
    console.log(`  text: ${visibleText.replace(/\n/g, " | ")}`);
  } catch (err) {
    console.log(`  ERROR: ${err.message}`);
  }
}

console.log("\n=== CONSOLE LOGS (first 30) ===");
console.log(consoleLogs.slice(0, 30).join("\n"));
console.log("\n=== NETWORK ERRORS (first 20) ===");
console.log(networkErrors.slice(0, 20).join("\n"));

await browser.close();
console.log(`\nScreenshots saved to ${SHOTS}/`);