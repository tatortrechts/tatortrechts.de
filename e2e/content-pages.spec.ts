import { test, expect } from "@playwright/test";

test.describe("Blog page", () => {
  test("renders with correct title", async ({ page }) => {
    await page.goto("/blog");
    await expect(page).toHaveTitle(/Blog/);
  });

  test("has navbar", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.locator("nav.navbar")).toBeVisible();
  });

  test("blog nav item is active", async ({ page }) => {
    await page.goto("/blog");
    const blogLink = page.locator('a.navbar-item[href="/blog"]');
    await expect(blogLink).toHaveClass(/is-active/);
  });
});

test.describe("Über uns page", () => {
  test("renders with correct title", async ({ page }) => {
    await page.goto("/ueber");
    await expect(page).toHaveTitle(/Über uns/);
  });

  test("has navbar", async ({ page }) => {
    await page.goto("/ueber");
    await expect(page.locator("nav.navbar")).toBeVisible();
  });
});

test.describe("Kontakt page", () => {
  test("renders with correct title", async ({ page }) => {
    await page.goto("/kontakt");
    await expect(page).toHaveTitle(/Kontakt/);
  });

  test("has navbar", async ({ page }) => {
    await page.goto("/kontakt");
    await expect(page.locator("nav.navbar")).toBeVisible();
  });

  test("displays privacy policy (Datenschutz)", async ({ page }) => {
    await page.goto("/kontakt");
    await expect(page.getByRole("heading", { name: "Datenschutz" })).toBeVisible();
  });
});
