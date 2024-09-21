import typia from "typia";
import { IBook, IBookSearchFilter } from "../../models/book";
import { Request, Response } from "express";
import { BookService } from "../../services/booksService";
import { IFindResult } from "../../models/shared";

export default async (req: Request<{}, IFindResult<IBook>, {}, IBookSearchFilter>, res: Response) => {
    const validatedFilter = typia.validate<IBookSearchFilter>(req.query);

    if (!validatedFilter.success) {
        res.status(400).send(validatedFilter.errors);
        return;
    }

    const dbResult = await BookService.find(validatedFilter.data);

    if(!dbResult.success){
        res.status(500).send();
        return;
    }

    res.status(200).send(dbResult.data);
  }