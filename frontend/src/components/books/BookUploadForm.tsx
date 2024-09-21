"use client";
import { uploadBooks } from "@/app/actions";
import { FormSubmitButton } from "../buttons/FormSubmitButton";
import { InputGroup } from "../buttons/InputGroup";
import { FileInput } from "../forms/FileInput";
import { Label } from "../forms/Label";
import { useFormState } from "react-dom";

export const BookUploadForm = () => {
  const [state, formAction] = useFormState(uploadBooks, {
    success: false,
    error: "",
    data: null,
  });

  return (
    <form action={formAction} className="mt-2">
      <div className="md:flex gap-2">
        <InputGroup>
          <Label htmlFor="file">Upload Books</Label>
          <FileInput id="file" name="file" />
        </InputGroup>
        <div className="mt-6">
          <FormSubmitButton>Upload</FormSubmitButton>
        </div>
      </div>
      <div className={state.success ? "text-green-500" : "invisible"}>
        File was uploaded successfully and will be processed.
      </div>
      {state.error && <div className="text-red-500">{state.error}</div>}
    </form>
  );
};
