import { test, expect } from "@playwright/test";
import { sql } from "@vercel/postgres";
import { createNoteSlug } from "../src/lib/db/create-slug.server";

const notes = [
  {
    title: "Test Lorem Plawright Test Note 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit aut tempore fugit repellat impedit officiis saepe ad neque nesciunt tenetur. Harum adipisci et commodi enim veritatis natus quod atque deleniti!",
  },
  {
    title: "Test Lorem Plawright Test Note 2",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis et optio quasi ut voluptas at necessitatibus, delectus fugit deleniti dolorem reiciendis labore quam sit laboriosam quae ducimus reprehenderit sapiente adipisci!",
  },
];

const noteSlugsToDelete: string[] = [];

test.beforeAll(async ({}) => {
  // store slugs to be searched for and deleted after each test
  for (let index = 0; index < notes.length; index++) {
    const slug = await createNoteSlug(notes[index].title);
    noteSlugsToDelete.push(slug);
  }
});

test.beforeEach(async ({ page }) => {
  await page.goto("/notes/create");
});

test.afterEach(async () => {
  console.log("After Each");
  //clean the noteas added to database
  await sql`DELETE FROM notes 
  WHERE slug LIKE 'test-lorem-playwright-test-note-%';`;
});

test.describe("Create Note", () => {
  test("should allow creation of note", async ({ page }) => {
    const note = notes[0];
    await page.getByLabel("Title *").fill(note.title);
    const saveButton = page.getByRole("button", { name: "Save" });

    await saveButton.click();
    await expect(saveButton).toBeDisabled();

    await expect(page).toHaveURL(/.*notes/);
  });

  test("should display newly created note", async ({ page }) => {
    const note = notes[1];
    await page.getByLabel("Title *").fill(note.title);
    await page.getByLabel("Description").fill(note.description);
    const saveButton = page.getByRole("button", { name: "Save" });

    await saveButton.click();
    await expect(saveButton).toBeDisabled();

    await expect(page).toHaveURL(/.*notes/);

    await expect(page.getByText(note.title)).toBeVisible();
  });
});
