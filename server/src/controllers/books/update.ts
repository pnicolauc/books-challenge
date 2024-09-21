import typia from "typia";
import { IBook, IBookUrlParams } from "../../models/book";
import { Request, Response } from "express";
import { BookService } from "../../services/booksService";
import { IOperationResult } from "../../models/shared";

export default async (
  req: Request<IBookUrlParams, {}, IBook, {}>,
  res: Response
) => {
  const validatedFilter = typia.validate<IBookUrlParams>(req.params);
  const validatedBody = typia.validate<IBook>(req.body);
  const isSameId = req.body.bookId === parseInt(req.params.bookId);

  if (
    !validatedFilter.success ||
    !validatedBody.success ||
    isSameId === false
  ) {
    res.status(400).send({
      errors: [
        {
          message: "Invalid request",
        },
      ],
    });
    return;
  }

  req.body.averageRating = calculateAverageRating(req.body);
  req.body.ratingsCount =
    req.body.ratings1 +
    req.body.ratings2 +
    req.body.ratings3 +
    req.body.ratings4 +
    req.body.ratings5;

  let dbResult: IOperationResult<boolean>;
  const ifMatchHeader = req.header("If-Match");

  if (ifMatchHeader) {

    dbResult = await BookService.updateIf(req.body, (book: IBook) => {
      return BookService.validateEtag(book, ifMatchHeader);
    });

    if (dbResult.data === false) {
      res.status(412).send();
      return;
    }
  } else {
    dbResult = await BookService.upsert(req.body);
  }

  if (!dbResult.success) {
    res.status(500).send();
    return;
  }

  const newEtag = BookService.getETag(req.body);
  res.setHeader("ETag", newEtag);

  if (dbResult.data === true) {
    res.status(201).send();
  } else {
    res.status(204).send();
  }
};

const calculateAverageRating = (book: IBook): number => {
  const totalRatings =
    book.ratings1 +
    book.ratings2 +
    book.ratings3 +
    book.ratings4 +
    book.ratings5;

  if (totalRatings === 0) {
    return 0;
  }

  const weightedSum =
    1 * book.ratings1 +
    2 * book.ratings2 +
    3 * book.ratings3 +
    4 * book.ratings4 +
    5 * book.ratings5;

  return Math.round((weightedSum / totalRatings) * 100) / 100;
};
