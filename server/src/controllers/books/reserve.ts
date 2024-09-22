import typia from "typia";
import { IBookReservation, IBookReservationBody, IBookUrlParams } from "../../models/book";
import { Request, Response } from "express";
import { BookService } from "../../services/booksService";

const fifteenMinutesInMilliseconds = 15 * 60 * 1000;

export default async (
  req: Request<IBookUrlParams, IBookReservation, IBookReservationBody, {}>,
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

  if (!dbResult.success && dbResult.error === "Conflict") {
    res.status(409).send({
      reservedUntil: dbResult.data?.reservedUntil,
    });
    return;
  }

  if (!dbResult.success) {
    res.status(500).send();
    return;
  }

  res.status(200).send(dbResult.data);
};