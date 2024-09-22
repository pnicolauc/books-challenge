import typia from "typia";
import { IBookReservationBody, IBookUrlParams } from "../../models/book";
import { Request, Response } from "express";
import { BookService } from "../../services/booksService";

const fifteenMinutesInMilliseconds = 15 * 60 * 1000;

export default async (
  req: Request<IBookUrlParams, {}, IBookReservationBody, {}>,
  res: Response
) => {
  const validatedFilter = typia.validate<IBookUrlParams>(req.params);
  const validatedBody = typia.validate<IBookReservationBody>(req.body);

  if (!validatedFilter.success || !validatedBody.success) {
    res.status(400).send(validatedFilter.errors);
    return;
  }

  const now = new Date();
  const fifteenMinutesFromNow = new Date(now.getTime() + fifteenMinutesInMilliseconds);

  const dbResult = await BookService.reserve(parseInt(req.params.bookId), req.body.reservedBy, fifteenMinutesFromNow);

  if (!dbResult.success) {
    res.status(400).send();
    return;
  }

  if (!dbResult.success) {
    res.status(500).send();
    return;
  }
};