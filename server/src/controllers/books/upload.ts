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
      errors.push("error upserting books");
    }

    MailService.sendBooksUploadReport(results.length, errors);
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
    goodreadsBookId: parseInt(data.goodreads_book_id),
    bestBookId: parseInt(data.best_book_id),
    workId: parseInt(data.work_id),
    booksCount: parseInt(data.books_count),
    isbn: data.isbn,
    isbn13: parseInt(data.isbn13),
    authors: data.authors,
    originalPublicationYear: parseInt(data.original_publication_year),
    originalTitle: data.original_title,
    title: data.title,
    languageCode: data.language_code,
    averageRating: parseFloat(data.average_rating),
    ratingsCount: parseInt(data.ratings_count),
    workRatingsCount: parseInt(data.work_ratings_count),
    workTextReviewsCount: parseInt(data.work_text_reviews_count),
    ratings1: parseInt(data.ratings_1),
    ratings2: parseInt(data.ratings_2),
    ratings3: parseInt(data.ratings_3),
    ratings4: parseInt(data.ratings_4),
    ratings5: parseInt(data.ratings_5),
    imageUrl: data.image_url,
    smallImageUrl: data.small_image_url,
  };
};
