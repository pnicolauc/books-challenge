"use client";
import { IBook } from "@/lib/types/book";
import { InputGroup } from "../buttons/InputGroup";
import { Input } from "../forms/Input";
import { Label } from "../forms/Label";
import { updateBook } from "@/app/actions";
import { useFormState } from "react-dom";
import { FormSubmitButton } from "../buttons/FormSubmitButton";

interface BookUpdateFormProps {
  book: IBook;
}

interface FormInputProps {
  title: string;
  name: string;
  type: string;
  defaultValue: string;
  weight?: number;
}

export const BookUpdateForm = ({ book }: BookUpdateFormProps) => {
  const [state, formAction] = useFormState(updateBook, {
    success: false,
    error: "",
    data: book,
  });

  const formInputs: FormInputProps[] = [
    {
      title: "Goodreads Book Id",
      name: "goodreadsBookId",
      type: "number",
      defaultValue: `${book.goodreadsBookId}`,
    },
    {
      title: "Best Book Id",
      name: "bestBookId",
      type: "number",
      defaultValue: `${book.bestBookId}`,
    },
    {
      title: "Work Id",
      name: "workId",
      type: "number",
      defaultValue: `${book.workId}`,
    },
    {
      title: "Number of Books",
      name: "booksCount",
      type: "number",
      defaultValue: `${book.booksCount}`,
    },
    {
      title: "ISBN",
      name: "isbn",
      type: "text",
      defaultValue: `${book.isbn}`,
    },
    {
      title: "ISBN13",
      name: "isbn13",
      type: "number",
      defaultValue: `${book.isbn13}`,
    },
    {
      title: "Authors",
      name: "authors",
      type: "text",
      defaultValue: `${book.authors}`,
    },
    {
      title: "Original Publication Year",
      name: "originalPublicationYear",
      type: "number",
      defaultValue: `${book.originalPublicationYear}`,
    },
    {
      title: "Original Title",
      name: "originalTitle",
      type: "text",
      defaultValue: `${book.originalTitle}`,
    },
    {
      title: "Title",
      name: "title",
      type: "text",
      defaultValue: `${book.title}`,
    },
    {
      title: "Language Code",
      name: "languageCode",
      type: "text",
      defaultValue: `${book.languageCode}`,
    },
    {
      title: "Number of Work Ratings",
      name: "workRatingsCount",
      type: "number",
      defaultValue: `${book.workRatingsCount}`,
    },
    {
      title: "Number of Work Text Reviews",
      name: "workTextReviewsCount",
      type: "number",
      defaultValue: `${book.workTextReviewsCount}`,
    },
    {
      title: "Number of 1 Star Ratings",
      name: "ratings1",
      type: "number",
      defaultValue: `${book.ratings1}`,
    },
    {
      title: "Number of 2 Star Ratings",
      name: "ratings2",
      type: "number",
      defaultValue: `${book.ratings2}`,
    },
    {
      title: "Number of 3 Star Ratings",
      name: "ratings3",
      type: "number",
      defaultValue: `${book.ratings3}`,
    },
    {
      title: "Number of 4 Star Ratings",
      name: "ratings4",
      type: "number",
      defaultValue: `${book.ratings4}`,
    },
    {
      title: "Number of 5 Star Ratings",
      name: "ratings5",
      type: "number",
      defaultValue: `${book.ratings5}`,
    },
    {
      title: "Image Url",
      name: "imageUrl",
      type: "text",
      defaultValue: `${book.imageUrl}`,
    },
    {
      title: "Small Image Url",
      name: "smallImageUrl",
      type: "text",
      defaultValue: `${book.smallImageUrl}`,
    },
  ];

  return (
    <form action={formAction} className="my-2">
      <div className={`text-green-500 ${!state.success && "invisible"}`}>
        Book updated
      </div>
      <div className={`text-red-500 ${!state.error && "invisible"}`}>
        {state.error}{' '}
      </div>
      <input type="hidden" name="bookId" value={book.bookId} />
      <div className="md:flex flex-wrap gap-4">
        {formInputs.map((input) => (
          <InputGroup key={input.name}>
            <Label htmlFor={input.name}>{input.title}</Label>
            <Input
              type={input.type}
              id={input.name}
              name={input.name}
              defaultValue={input.defaultValue}
            />
          </InputGroup>
        ))}
      </div>
      <FormSubmitButton>Update</FormSubmitButton>
    </form>
  );
};
