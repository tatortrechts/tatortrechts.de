import { test, expect } from "@playwright/test";

test.describe("Map page (/karte)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/karte");
  });

  test("renders with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Karte/);
  });

  test("has navbar", async ({ page }) => {
    await expect(page.locator("nav.navbar")).toBeVisible();
  });

  test("karte nav item is active", async ({ page }) => {
    const karteLink = page.locator('a.navbar-item[href="/karte"]');
    await expect(karteLink).toHaveClass(/is-active/);
  });

  test("map container is present", async ({ page }) => {
    await expect(page.locator("#map")).toBeVisible();
  });

  test("sidebar is present", async ({ page }) => {
    await expect(page.locator("#sidebar")).toBeVisible();
  });

  test("search input is present", async ({ page }) => {
    const searchInput = page.locator('label:has-text("Suchbegriff")');
    await expect(searchInput).toBeVisible();
  });

  test("incident list is present", async ({ page }) => {
    // The sidebar should show incident results from the mock API
    await expect(page.getByText("Angriff in Bremen-Vegesack")).toBeVisible();
  });
});
