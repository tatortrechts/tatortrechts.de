import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("renders with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Tatort Rechts/);
  });

  test("displays hero section with key statistics", async ({ page }) => {
    const heroText = page.locator("section.hero.tor-gradient");
    await expect(heroText).toBeVisible();
    await expect(heroText).toContainText("13");
    await expect(heroText).toContainText("2000");
    await expect(heroText).toContainText("16.000");
  });

  test("has link to Karte in hero section", async ({ page }) => {
    const karteLink = page.locator('section.hero.tor-gradient a[href="/karte"]');
    await expect(karteLink).toBeVisible();
  });

  test("displays content sections", async ({ page }) => {
    await expect(page.getByText("Rechte Gewalt vor deiner Haustür")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Recherche-Tool" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Gezielte Suchen" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Zusammenhänge sehen" })).toBeVisible();
  });

  test("displays historical event sections", async ({ page }) => {
    await expect(page.getByText("19. Februar 2020 - Hanau")).toBeVisible();
    await expect(page.getByText("9. Oktober 2019 - Halle")).toBeVisible();
    await expect(page.getByText("1. Juni 2019 - Istha")).toBeVisible();
  });

  test("displays Sichtbarkeit section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Sichtbarkeit" })).toBeVisible();
  });
});
