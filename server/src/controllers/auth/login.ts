import { Request, Response } from "express";
import { ILoginUserParams, IUserResult } from "../../models/user";

export default async (req: Request<{}, IUserResult, ILoginUserParams, {}>, res: Response) => {
    res.send(res.locals.user);
}