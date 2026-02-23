import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("navbar is visible on home page", async ({ page }) => {
    await page.goto("/");
    const navbar = page.locator("nav.navbar");
    await expect(navbar).toBeVisible();
  });

  test("navbar contains all navigation links", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a.navbar-item[href="/karte"]')).toBeVisible();
    await expect(page.locator('a.navbar-item[href="/blog"]')).toBeVisible();
    await expect(page.locator('a.navbar-item[href="/ueber"]')).toBeVisible();
    await expect(page.locator('a.navbar-item[href="/kontakt"]')).toBeVisible();
  });

  test("logo links to home page", async ({ page }) => {
    await page.goto("/");
    const logo = page.locator('a.navbar-item[href="/"] img[alt="tatortrechts.de"]');
    await expect(logo).toBeVisible();
  });

  test("navigate to Karte page", async ({ page }) => {
    await page.goto("/");
    await page.click('a.navbar-item[href="/karte"]');
    await expect(page).toHaveURL("/karte");
  });

  test("navigate to Blog page", async ({ page }) => {
    await page.goto("/");
    await page.click('a.navbar-item[href="/blog"]');
    await expect(page).toHaveURL("/blog");
  });

  test("navigate to Über uns page", async ({ page }) => {
    await page.goto("/");
    await page.click('a.navbar-item[href="/ueber"]');
    await expect(page).toHaveURL("/ueber");
  });

  test("navigate to Kontakt page", async ({ page }) => {
    await page.goto("/");
    await page.click('a.navbar-item[href="/kontakt"]');
    await expect(page).toHaveURL("/kontakt");
  });
});
