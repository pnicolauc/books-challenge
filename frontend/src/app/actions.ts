"use server";
import { booksApi } from "@/api/booksApi";
import { IBook, IBookReservation } from "@/lib/types/book";
import { IOperationResult } from "@/lib/types/shared";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

const convertFormDataToObject = (formData: FormData): IBook => {
  const reservedUntil = formData.get("reservedUntil") as string && new Date(formData.get("reservedUntil") as string);
  const book: IBook = {
    bookId: Number(formData.get("bookId")),
    goodreadsBookId: Number(formData.get("goodreadsBookId")),
    bestBookId: Number(formData.get("bestBookId")),
    workId: Number(formData.get("workId")),
    booksCount: Number(formData.get("booksCount")),
    isbn: formData.get("isbn") as string,
    isbn13: Number(formData.get("isbn13")),
    authors: formData.get("authors") as string,
    originalPublicationYear: Number(formData.get("originalPublicationYear")),
    originalTitle: formData.get("originalTitle") as string,
    title: formData.get("title") as string,
    languageCode: formData.get("languageCode") as string,
    averageRating: Number(formData.get("averageRating")),
    ratingsCount: Number(formData.get("ratingsCount")),
    workRatingsCount: Number(formData.get("workRatingsCount")),
    workTextReviewsCount: Number(formData.get("workTextReviewsCount")),
    ratings1: Number(formData.get("ratings1")),
    ratings2: Number(formData.get("ratings2")),
    ratings3: Number(formData.get("ratings3")),
    ratings4: Number(formData.get("ratings4")),
    ratings5: Number(formData.get("ratings5")),
    imageUrl: formData.get("imageUrl") as string,
    smallImageUrl: formData.get("smallImageUrl") as string,
    reservedUntil: !formData.get("clearReservation") && reservedUntil ? new Date(reservedUntil.getTime() - reservedUntil.getTimezoneOffset() * 60000).toISOString() : null,
    reservedBy: !formData.get("clearReservation") ? formData.get("reservedBy") as string : null,
  };

  return book;
};

export const updateBook = async (
  prevState: IOperationResult<IBook>,
  formData: FormData
): Promise<IOperationResult<IBook>> => {
  const book = convertFormDataToObject(formData);

  let etag: string | undefined = undefined;

  if (formData.get("etag")) {
    etag = formData.get("etag") as string;
  }

  const response = await booksApi.update(`${book.bookId}`, book, etag);

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/${book.bookId}`);
  revalidatePath(`/admin/${book.bookId}`);

  return {
    ...response,
    data: response.success ? book : null,
  };
};

export const uploadBooks = async (
  prevState: IOperationResult<void>,
  formData: FormData
): Promise<IOperationResult<void>> => {
  if (!formData.get("file")) {
    return {
      success: false,
      error: "No file was uploaded",
      data: null,
    };
  }

  return await booksApi.upload(formData);
};

export const reserveBook = async (
  prevState: IOperationResult<IBookReservation>,
  formData: FormData
): Promise<IOperationResult<IBookReservation>> => {
  if (!formData.get("bookId") || !formData.get("reservedBy")) {
    return {
      success: false,
      error: "Invalid request",
    };
  }

  return booksApi.reserve(
    formData.get("bookId") as string,
    formData.get("reservedBy") as string
  );
};

export const searchBooks = async (formData: FormData) => {
  const authors = formData.get("authors");
  const title = formData.get("title");
  const languageCode = formData.get("languageCode");
  const originalPublicationYear = formData.get("originalPublicationYear");
  const sort = formData.get("sort");
  const pageSize = formData.get("pageSize");
  const page = formData.get("page");

  const newSearchParams = new URLSearchParams();
  if (title) {
    newSearchParams.set("title", title.valueOf() as string);
  }
  if (authors) {
    newSearchParams.set("authors", authors.valueOf() as string);
  }
  if (languageCode) {
    newSearchParams.set("languageCode", languageCode.valueOf() as string);
  }
  if (sort) {
    newSearchParams.set("sort", sort.valueOf() as string);
  }
  if (pageSize) {
    newSearchParams.set("pageSize", pageSize.valueOf() as string);
  }
  if (page) {
    newSearchParams.set("page", page.valueOf() as string);
  }

  if (originalPublicationYear) {
    newSearchParams.set(
      "originalPublicationYear",
      originalPublicationYear.valueOf() as string
    );
  }
  redirect(`?${newSearchParams.toString()}`, RedirectType.replace);
};
