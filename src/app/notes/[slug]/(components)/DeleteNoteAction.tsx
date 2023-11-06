"use client";

import { Trash } from "lucide-react";
import { useFormState } from "react-dom";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { deleteNoteAction } from "../action";
import SubmitButton from "~/components/ui/submit-button";

interface Props {
  slug: string;
  title: string;
}

const initialState = { message: "", success: false };

const DeleteNoteAction = ({ slug, title }: Props) => {
  const [state, formAction] = useFormState(deleteNoteAction, initialState);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>
          <Trash className="w-4 h-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            <span>
              This action cannot be undone. This will permanently delete the
              note {title}
            </span>
            <span aria-live="polite" className="block">
              {state.message}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={formAction}>
            <input type="hidden" name="slug" value={slug} />
            <SubmitButton type="submit">Continue</SubmitButton>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteNoteAction;
