"use client";

import { useFormState } from "react-dom";
import { createNoteAction } from "./action";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/components/ui/use-toast";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import SubmitButton from "~/components/ui/submit-button";

const initialState = {
  success: false,
  message: "",
};

const NewNoteForm = () => {
  const [state, formAction] = useFormState(createNoteAction, initialState);

  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Success",
        description: "Note added",
      });

      redirect("/notes");
    }
  }, [state.success]);

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          Create Note
        </h1>
      </CardHeader>

      <CardContent>
        <ul className="mb-4 p-2" aria-live="polite">
          {<li className="bg-destructive">{state.message}</li>}
        </ul>

        <form action={formAction} className="space-y-4">
          <div>
            <Label htmlFor="title">
              Title <span aria-hidden="true">*</span>{" "}
            </Label>
            <Input name="title" id="title" required maxLength={255} />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              id="description"
              rows={7}
              placeholder="Optionally add a description of your note"
            />
          </div>
          <SubmitButton>Save</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewNoteForm;
