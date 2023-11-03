import { sql } from "@vercel/postgres";
import { cache } from "react";

export const getAllNotes = cache(async () => {
  const { rows } = await sql`
    SELECT title, description, slug, "createdAt" FROM notes
    ORDER BY title ASC
    `;
  return rows;
});

export const getAllNotesWithFilter = async ({
  title = "",
}: {
  title: string;
}) => {
  const { rows } = await sql`
        SELECT title, description, slug, "createdAt" FROM notes
        WHERE title LIKE ${"%" + title + "%"}  ORDER BY title ASC
        `;
  return rows;
};

export const getNoteWithSlug = cache(async (slug: string) => {
  const { rows, rowCount } = await sql`
    SELECT title, description, slug, "createdAt" 
    FROM notes WHERE slug = ${slug}
    `;

  if (rowCount !== 1) {
    return null;
  }

  return rows[0];
});
