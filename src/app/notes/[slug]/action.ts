"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError, z } from "zod";

const schema = z.object({
  slug: z.string({ required_error: "Note not found" }).min(1, "Note not found"),
});

export async function deleteNoteAction(prevState: any, formData: FormData) {
  try {
    const parsed = schema.parse({
      slug: formData.get("slug"),
      title: formData.get("title"),
      description: formData.get("description"),
    });

    // delete data from db

    await sql`
      DELETE FROM notes 
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
