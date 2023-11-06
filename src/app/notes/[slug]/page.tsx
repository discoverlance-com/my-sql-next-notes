import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";

import { Button } from "~/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import DeleteNoteAction from "./(components)/DeleteNoteAction";
import { validateSlug } from "~/lib/utils";

export default async function Page({ params }: { params: { slug: string } }) {
  const note = await validateSlug(params.slug);

  if (!note) {
    notFound();
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            {note.title}
          </h1>
        </CardHeader>

        <CardContent>{note.description}</CardContent>

        <CardFooter className="space-x-4">
          <Button size="sm" asChild>
            <Link href={`/notes/${note.slug}/edit`}>
              <Edit className="w-4 h-4" />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <DeleteNoteAction title={note.title} slug={note.slug} />
        </CardFooter>
      </Card>
    </div>
  );
}
