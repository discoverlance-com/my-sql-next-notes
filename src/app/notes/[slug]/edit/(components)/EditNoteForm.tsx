"use client";

import { useFormState } from "react-dom";
import { editNoteAction } from "../action";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import SubmitButton from "~/components/ui/submit-button";

const initialState = {
  success: false,
  message: "",
};

interface Props {
  title: string;
  description: string;
  slug: string;
}

const EditNoteForm = ({ slug, title, description }: Props) => {
  const [state, formAction] = useFormState(editNoteAction, initialState);

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          Edit Note
        </h1>
      </CardHeader>

      <CardContent>
        <ul className="mb-4 p-2" aria-live="polite">
          {<li className="bg-destructive">{state.message}</li>}
        </ul>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="slug" value={slug} />
          <div>
            <Label htmlFor="title">
              Title <span aria-hidden="true">*</span>{" "}
            </Label>
            <Input
              name="title"
              id="title"
              defaultValue={title}
              required
              maxLength={255}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              id="description"
              rows={7}
              defaultValue={description}
            />
          </div>
          <SubmitButton>Save</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditNoteForm;
