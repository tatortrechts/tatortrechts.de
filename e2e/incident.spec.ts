import { test, expect } from "@playwright/test";

test.describe("Incident detail page (/fall/[id])", () => {
  test("renders incident details", async ({ page }) => {
    await page.goto("/fall/13135");
    await expect(page.locator("nav.navbar")).toBeVisible();
    // The incident box should show the incident content
    await expect(page.locator(".container")).toBeVisible();
  });

  test("has link back to map", async ({ page }) => {
    await page.goto("/fall/13135");
    const mapLink = page.locator('a[href="/karte"]', {
      hasText: "zur Karte",
    });
    await expect(mapLink).toBeVisible();
  });

  test("displays incident location", async ({ page }) => {
    await page.goto("/fall/13135");
    // "Ort:" label followed by "Bremen" value — use first match to avoid strict mode error
    await expect(page.getByText("Bremen").first()).toBeVisible();
  });
});
