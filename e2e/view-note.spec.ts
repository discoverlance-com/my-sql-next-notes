import { test, expect } from "@playwright/test";
import { sql } from "@vercel/postgres";
import { createNoteSlug } from "../src/lib/db/create-slug.server";

const note = {
  title: "Test Lorem Plawright Test Note 1",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit aut tempore fugit repellat impedit officiis saepe ad neque nesciunt tenetur. Harum adipisci et commodi enim veritatis natus quod atque deleniti!",
};

let noteSlugToDelete = "";
test.beforeEach(async ({ page }) => {
  noteSlugToDelete = await createNoteSlug(note.title);
  // create note
  await sql`INSERT INTO notes (title,slug,description) values (${note.title}, ${noteSlugToDelete}, ${note.description});`;
  await page.goto("/notes");
});

test.afterEach(async () => {
  //clean the noteas added to database
  await sql`DELETE FROM notes 
  WHERE slug = ${noteSlugToDelete};`;
});

test.describe("View Note", () => {
  test("should allow viewing of already existing note", async ({ page }) => {
    await page.getByRole("link", { name: note.title, exact: true }).click();

    await expect(page).toHaveURL(/.*notes\/test-.*/);
    await expect(page.getByRole("heading", { name: note.title })).toBeVisible();
    await expect(page.getByText(note.description)).toBeVisible();

    // await page.getByRole("button", { name: "Delete" }).click();
    // await page.getByRole("link", { name: "Edit" }).click();
  });
});
