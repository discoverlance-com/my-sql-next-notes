import Link from "next/link";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { getAllNotes } from "~/lib/db/notes.server";

const AllNotes = async () => {
  const rows = await getAllNotes();

  return (
    <div>
      {rows.length > 0 ? (
        <ul>
          {rows.map((note) => (
            <li key={note.slug}>
              <ContextMenu>
                <ContextMenuTrigger>
                  <Link
                    href={`/notes/${note.slug}`}
                    className="p-2 my-1 block bg-secondary"
                  >
                    {note.title}
                  </Link>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem asChild>
                    <Link href={`/notes/${note.slug}/edit`}>Edit</Link>
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No new notes added</p>
      )}
    </div>
  );
};

export default AllNotes;
