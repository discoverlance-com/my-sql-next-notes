import { getNoteWithSlug } from "~/lib/db/notes.server";
import EditNoteForm from "./EditNoteForm";
import { notFound } from "next/navigation";

export async function validateSlug(slug: string) {
  return await getNoteWithSlug(slug);
}

export default async function Page({ params }: { params: { slug: string } }) {
  const note = await validateSlug(params.slug);

  if (!note) {
    notFound();
  }

  return (
    <div>
      <EditNoteForm
        description={note.description}
        title={note.title}
        slug={note.slug}
      />
    </div>
  );
}
