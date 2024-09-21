"use client";
import { searchBooks } from "@/app/actions";
import { InputGroup } from "../buttons/InputGroup";
import { Input } from "../forms/Input";
import { Label } from "../forms/Label";
import { IBookSearchParams } from "@/lib/types/book";
import { FormSubmitButton } from "../buttons/FormSubmitButton";

export const BookSearchForm = ({
  authors,
  title,
  languageCode,
  originalPublicationYear,
  pageSize,
  sort
}:  IBookSearchParams) => {
    return (<form action={searchBooks} className="my-2">
        <div className="md:flex gap-2">
          <input type="hidden" name="page" value="1" />
          <input type="hidden" name="pageSize" value={pageSize} />
          <input type="hidden" name="sort" value={sort} />
          <InputGroup>
            <Label htmlFor="authors">Authors</Label>
            <Input
              type="text"
              id="authors"
              name="authors"
              defaultValue={authors}
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              defaultValue={title}
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="languageCode">Language Code</Label>
            <Input
              type="text"
              id="languageCode"
              name="languageCode"
              defaultValue={languageCode}
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="originalPublicationYear">Year</Label>
            <Input
              type="text"
              id="originalPublicationYear"
              name="originalPublicationYear"
              defaultValue={originalPublicationYear}
            />
          </InputGroup>
        </div>
        <div className="flex items-end justify-content-end">
          <FormSubmitButton>Apply Filters</FormSubmitButton>
        </div>
      </form>);
}
