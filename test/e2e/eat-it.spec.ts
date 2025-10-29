import { test, expect } from "@playwright/test";

test.describe("Eat It - Basic Tests", () => {
  test("should do an order and check Cart", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("domcontentloaded", { timeout: 30000 });
    await expect(page).toHaveTitle(/Eat It/);
    await page.getByRole("link", { name: "Login" }).click();
    await page.getByRole("textbox", { name: "Email address" }).click();
    await page
      .getByRole("textbox", { name: "Email address" })
      .fill("functest@gmail.com");
    await page.getByRole("textbox", { name: "Password" }).click();
    await page.getByRole("textbox", { name: "Password" }).fill("password");
    await page.getByRole("button", { name: "Sign in" }).click();
    await page
      .getByRole("link", { name: "Burger House Américain 4.2" })
      .click();
    await page.waitForSelector('h1:has-text("Burger House")');

    await page.getByRole("button").nth(4).click();
    await page.getByRole("button", { name: "Add to cart" }).first().click();
    await page.getByRole("button", { name: "Add to cart" }).nth(2).click();
    await page.locator("div").filter({ hasText: /^3$/ }).click();
    await expect(page.getByText("35.80€")).toBeVisible();
    await expect(page.getByText("Classic Burger").nth(0)).toBeVisible();
    await expect(page.getByText("Quantity: 2")).toBeVisible();
    await expect(page.getByText("Frites").nth(0)).toBeVisible();
    await expect(page.getByText("Quantity: 1")).toBeVisible();
  });

  test("should Login", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("domcontentloaded", { timeout: 30000 });
    await page.getByRole("link", { name: "Login" }).click();
    await page.getByRole("textbox", { name: "Email address" }).click();
    await page
      .getByRole("textbox", { name: "Email address" })
      .fill("functest@gmail.com");
    await page.getByRole("textbox", { name: "Password" }).click();
    await page.getByRole("textbox", { name: "Password" }).fill("password");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).toHaveTitle(/Eat It/);
    await expect(page.getByText("My Account")).toBeVisible();
  });

  test("should do an order, delete items and logout", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState("domcontentloaded", { timeout: 30000 });
    await page.getByRole("link", { name: "Login" }).click();
    await page.getByRole("textbox", { name: "Email address" }).click();
    await page
      .getByRole("textbox", { name: "Email address" })
      .fill("functest@gmail.com");
    await page.getByRole("textbox", { name: "Email address" }).press("Tab");
    await page.getByRole("textbox", { name: "Password" }).fill("password");
    await page.getByRole("button", { name: "Sign in" }).click();
    await page
      .getByRole("link", { name: "Burger House Américain 4.2" })
      .click();
    await page.waitForSelector('h1:has-text("Burger House")');
    await page.getByRole("button").filter({ hasText: /^$/ }).nth(4).dblclick();
    await page.getByRole("button").filter({ hasText: /^$/ }).nth(4).dblclick();
    await page.getByRole("button", { name: "Add to cart" }).nth(1).click();
    await page.getByRole("link", { name: "Eat It Logo" }).click();
    await page.waitForLoadState("domcontentloaded");
    await page
      .getByRole("link", { name: "Sushi Zen Japonais 4.7 Sushi" })
      .click();
    await page.waitForSelector('h1:has-text("Sushi Zen")');
    await page.getByRole("button").nth(4).dblclick();
    await page.getByRole("button", { name: "Add to cart" }).first().click();
    await page.locator(".w-6.h-6.group-hover\\:animate-pulse").click();

    await page.getByRole("button").nth(3).dblclick();

    await page.getByTitle("Supprimer complètement").nth(1).click();
    await expect(page.getByText("Sashimi Saumon").nth(0)).toBeHidden();
    await expect(page.getByText("Veggie Burger").nth(0)).toBeVisible();
    await page.getByRole("link", { name: "Eat It Logo" }).click();
    await page.waitForLoadState("domcontentloaded");
    await page.getByRole("link", { name: "My Account" }).click();
    await page.getByRole("button", { name: "Edit", exact: true }).click();
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').fill("functest@gmail.comzdsqdqs");
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("link", { name: "My Account" }).click();
    await page.getByRole("button", { name: "Logout" }).click();
    await page.locator(".w-6").click();
    await expect(page.getByText("Sign in to your account")).toBeVisible();
  });
});
