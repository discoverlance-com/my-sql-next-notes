"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { ZodError, z } from "zod";
import { createNoteSlug } from "~/lib/db/create-slug.server";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .string({ invalid_type_error: "Description must be text" })
    .nullable(),
});

export async function createNoteAction(prevState: any, formData: FormData) {
  try {
    const parsed = schema.parse({
      title: formData.get("title"),
      description: formData.get("description"),
    });

    // add data to db
    const slug = await createNoteSlug(parsed.title);
    await sql`INSERT INTO notes (title,slug,description) values (${parsed.title}, ${slug}, ${parsed.description});`;

    revalidatePath("/notes", "layout");

    return { success: true, message: "Note Added" };
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
}
