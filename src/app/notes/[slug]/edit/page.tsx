import EditNoteForm from "./(components)/EditNoteForm";
import { notFound } from "next/navigation";
import { validateSlug } from "~/lib/utils";

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
