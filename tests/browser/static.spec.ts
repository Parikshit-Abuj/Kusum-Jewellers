import { test, expect } from "@playwright/test";
test("static catalogue preserves query navigation", async ({ page }) => {
  const calls: string[] = [];
  page.on("request", (r) => {
    if (new URL(r.url()).pathname.startsWith("/api/")) calls.push(r.url());
  });
  await page.goto("/catalog");
  await expect(page.locator(".collection-grid .product-card")).toHaveCount(12);
  await page.getByRole("link", { name: "Next", exact: true }).click();
  await expect(page.locator(".collection-grid .product-card")).toHaveCount(4);
  await page.reload();
  await expect(page.locator(".pagination")).toContainText("Page 2 of 2");
  await page.goBack();
  await expect(page.locator(".collection-grid .product-card")).toHaveCount(12);
  await page.goForward();
  await expect(page.locator(".collection-grid .product-card")).toHaveCount(4);
  await page.goto("/catalog?q=kj-016");
  await expect(page.locator(".collection-grid .product-card")).toHaveCount(1);
  await page.goto("/catalog?metal=silver");
  await expect(page.getByRole("heading", { name: "No pieces found" })).toBeVisible();
  await page.goto("/catalog?page=-1");
  await expect(page.locator(".form-error")).toContainText("not valid");
  expect(calls).toEqual([]);
});
test("filters, sorting, gallery and enquiry", async ({ page }, info) => {
  await page.goto("/catalog");
  if (info.project.name === "mobile")
    await page.getByRole("button", { name: "Filter and sort", exact: true }).click();
  const form =
    info.project.name === "mobile" ? page.getByRole("dialog") : page.locator(".collection-sidebar");
  await form.getByRole("radio", { name: "Earrings", exact: true }).check();
  if (info.project.name === "mobile")
    await form.getByRole("button", { name: "Apply filters", exact: true }).click();
  await expect(page.locator(".collection-grid .product-card")).toHaveCount(6);
  await page.goto("/catalog?category=earrings&sort=name");
  await expect(page.locator(".collection-grid h3").first()).toHaveText("Classic Swirl Drops");
  await page.goto("/products/floral-drop-earrings");
  await page.getByRole("button", { name: "Show photograph 2" }).click();
  await expect(page.locator(".gallery-main img")).toHaveAttribute("src", "/img/product/13.jpg");
  await page.getByRole("button", { name: "Enlarge product photograph" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Preview an enquiry" }).click();
  await expect(page.getByRole("dialog")).toContainText("Nothing will be sent");
});
test("sample rates, About and removed routes", async ({ page, request }) => {
  const api: string[] = [];
  page.on("request", (r) => {
    if (new URL(r.url()).pathname.startsWith("/api/")) api.push(r.url());
  });
  await page.goto("/rates");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sample Metal Rates");
  await expect(page.locator(".metal-rates-card dl > div")).toHaveCount(3);
  await page.evaluate(() => {
    window.dispatchEvent(new Event("focus"));
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.goto("/visit");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hi, I’m Parikshit Abuj.");
  await expect(page.locator(".visit-card a")).toHaveAttribute(
    "href",
    "https://parikshit-abuj-portfolio.vercel.app/",
  );
  await expect(page.locator('a[href*="/admin"], a[href^="tel:"]')).toHaveCount(0);
  for (const path of [
    "/admin",
    "/admin/login",
    "/demo/admin",
    "/api/rates",
    "/api/products",
    "/products/missing-piece",
  ])
    expect((await request.get(path)).status()).toBe(404);
  await page.goto("/shop");
  await expect(page).toHaveURL(/\/catalog$/);
  expect(api).toEqual([]);
});
test("responsive pages and imagery", async ({ page }) => {
  for (const width of [320, 390, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of ["/", "/catalog", "/visit", "/rates", "/products/floral-drop-earrings"]) {
      await page.goto(path);
      await expect(page.locator("main:not(.loading-state)")).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${path} at ${width}px`,
      ).toBe(true);
      await expect(page.locator('a[href*="/admin"]')).toHaveCount(0);
    }
  }
  await page.goto("/");
  await expect
    .poll(() => page.locator(".hero-image img").evaluate((e: HTMLImageElement) => e.naturalWidth))
    .toBeGreaterThan(0);
  await expect
    .poll(() => page.locator(".footer-logo").evaluate((e: HTMLImageElement) => e.naturalWidth))
    .toBeGreaterThan(0);
});
