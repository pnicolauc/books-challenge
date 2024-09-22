import csvParser from "csv-parser";
import { Request, Response } from "express";
import { IBook, IBookCsvEntry } from "../../models/book";
import { Stream } from "stream";
import { IValidation, validate } from "typia";
import { BookService } from "../../services/booksService";
import { MailService } from "../../services/mailService";

export default async (req: Request, res: Response) => {
  const results: IBook[] = [];
  const errors: any[] = [];

  const bufferStream = new Stream.PassThrough();
  bufferStream.end(req?.file?.buffer);

  res.status(202).send();

  const onData = (bookEntry: IBookCsvEntry) => {
    const validation = parseAndValidateCsvEntry(bookEntry);

    if (!validation.success) {
      errors.push(...validation.errors);
    } else {
      results.push(validation.data);
    }
  };

  const onEnd = async () => {
    const dbResult = await BookService.upsertMany(results);
    if (!dbResult.success) {
      errors.push("error upserting books to db");
      MailService.sendBooksUploadReport(0, errors);
      return;
    }

    await MailService.sendBooksUploadReport(results.length, errors);
  };

  bufferStream
    .pipe(csvParser())
    .on("data", skipIfEmptyLine(onData))
    .on("end", onEnd);
};

const skipIfEmptyLine = (callback: Function) => (data: any) => {
  if (Object.keys(data).length === 0) {
    return;
  }

  callback(data);
};

const parseAndValidateCsvEntry = (
  bookEntry: IBookCsvEntry
): IValidation<IBook> => {
  const entryValidation: IValidation<IBookCsvEntry> =
    validate<IBookCsvEntry>(bookEntry);

  if (!entryValidation.success) {
    return entryValidation;
  }

  const book: IBook = parseBookCsvEntry(bookEntry);
  const validation: IValidation<IBook> = validate<IBook>(book);

  return validation;
};

const parseBookCsvEntry = (data: any): IBook => {
  return {
    bookId: parseInt(data.book_id),
    goodreadsBookId: parseInt(data.goodreads_book_id) || 0,
    bestBookId: parseInt(data.best_book_id)  || 0,
    workId: parseInt(data.work_id) || 0,
    booksCount: parseInt(data.books_count) || 0,
    isbn: data.isbn,
    isbn13: parseInt(data.isbn13) || 0,
    authors: data.authors,
    originalPublicationYear: parseInt(data.original_publication_year) || 0,
    originalTitle: data.original_title,
    title: data.title,
    languageCode: data.language_code,
    averageRating: parseFloat(data.average_rating) || 0,
    ratingsCount: parseInt(data.ratings_count) || 0,
    workRatingsCount: parseInt(data.work_ratings_count) || 0,
    workTextReviewsCount: parseInt(data.work_text_reviews_count) || 0,
    ratings1: parseInt(data.ratings_1) || 0,
    ratings2: parseInt(data.ratings_2) || 0,
    ratings3: parseInt(data.ratings_3) || 0,
    ratings4: parseInt(data.ratings_4) || 0,
    ratings5: parseInt(data.ratings_5) || 0,
    imageUrl: data.image_url,
    smallImageUrl: data.small_image_url,
  };
};
