"use client";
import { reserveBook } from "@/app/actions";
import { FormSubmitButton } from "../buttons/FormSubmitButton";
import { InputGroup } from "../buttons/InputGroup";
import { Label } from "../forms/Label";
import { useFormState } from "react-dom";
import { IBook } from "@/lib/types/book";
import { Input } from "../forms/Input";

interface BookReserveFormProps {
  book: IBook;
}

export const BookReserveForm = ({ book }: BookReserveFormProps) => {
  const [state, formAction] = useFormState(reserveBook, {
    success: false,
    data: {
      bookId: book.bookId,
      reservedBy: book.reservedBy,
    },
  });

  return (
    <form action={formAction} className="mt-2">
      <div className="md:flex gap-2">
        <input type="hidden" name="bookId" value={book.bookId} />
        <InputGroup>
          <Label htmlFor="reservedBy">Your Name</Label>
          <Input type="text" id="reservedBy" name="reservedBy" />
        </InputGroup>
        <div className="mt-6">
          <FormSubmitButton>Reserve</FormSubmitButton>
        </div>
      </div>
      <div className={state.success ? "text-green-500" : "invisible"}>
        Book was successfully reserved for 15 minutes.
      </div>
      {state.error && <div className="text-red-500">{state.error}</div>}
    </form>
  );
};
