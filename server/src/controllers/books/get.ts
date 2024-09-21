import typia from "typia";
import { IBookUrlParams } from "../../models/book";
import { Request, Response } from "express";
import { BookService } from "../../services/booksService";

export default async (
  req: Request<IBookUrlParams, {}, {}, {}>,
  res: Response
) => {
  const validatedFilter = typia.validate<IBookUrlParams>(req.params);

  if (!validatedFilter.success) {
    res.status(400).send(validatedFilter.errors);
    return;
  }

  const dbResult = await BookService.findOne(parseInt(req.params.bookId));

  if (!dbResult.success) {
    res.status(500).send();
    return;
  }

  if (!dbResult.data) {
    res.status(404).send();
    return;
  }

  res.setHeader('ETag', BookService.getETag(dbResult.data));

  res.status(200).send(dbResult.data);
};
