import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  //clean the database
});

test.describe("Homepage", () => {
  test("should show home", async ({ page }) => {
    await expect(page).toHaveTitle("My Notes");

    await expect(
      page.getByRole("heading", { level: 1, name: "Welcome To Notes" })
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: "View All Notes" })
    ).toBeVisible();

    await expect(page).toHaveScreenshot();
  });

  test("should redirect to notes page", async ({ page }) => {
    await page.getByRole("link", { name: "View All Notes" }).click();

    await expect(page).toHaveURL(/.*notes/);

    await expect(
      page.getByRole("link", { name: "View All Notes" })
    ).not.toBeVisible();
  });

  test("should redirect to add notes page", async ({ page }) => {
    await page.getByRole("link", { name: "Add Note" }).click();

    await expect(page).toHaveURL(/.*notes\/create/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Create Note" })
    ).toBeVisible();
  });
});
