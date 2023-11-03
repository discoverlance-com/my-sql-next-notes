"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError, z } from "zod";
import { createNoteSlug } from "~/lib/db/create-slug.server";

const schema = z.object({
  slug: z.string().min(1, "Note not found"),
  title: z.string().min(1, "Title is required"),
  description: z
    .string({ invalid_type_error: "Description must be text" })
    .nullable(),
});

export async function editNoteAction(prevState: any, formData: FormData) {
  try {
    const parsed = schema.parse({
      slug: formData.get("slug"),
      title: formData.get("title"),
      description: formData.get("description"),
    });

    // add data to db
    const slug = await createNoteSlug(parsed.title);

    await sql`
      UPDATE notes 
      SET title = ${parsed.title}, 
      slug = ${slug}, 
      description = ${parsed.description} 
      WHERE slug = ${parsed.slug};
    `;

    revalidatePath("/notes", "layout");
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
      };
    }

    return {
      message: "Unknown error occured",
      success: false,
    };
  }

  redirect("/notes");
}
