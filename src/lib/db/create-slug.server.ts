import { sql } from "@vercel/postgres";

export async function createNoteSlug(title: string, isUpdateRequest = false) {
  const slug = title
    .replace(/[_-\s]+/g, "-")
    .replace(/\s+/g, "")
    .toLowerCase();
  const { rowCount } = await sql`SELECT slug FROM notes WHERE slug = ${slug}`;

  if (isUpdateRequest && rowCount === 1) {
    return slug;
  }
  if (rowCount >= 1) {
    return slug + (Math.random() + 1).toString(36).substring(8);
  }
  return slug;
}
