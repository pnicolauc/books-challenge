import { Request, Response } from "express";
import { UserService } from "../../services/usersService";
import { ICreateUserParams, IUserResult } from "../../models/user";
import typia from "typia";

export default async (
  req: Request<{}, IUserResult, ICreateUserParams, {}>,
  res: Response
) => {
  const user: ICreateUserParams = req.body;

  const validatedFilter = typia.validate<ICreateUserParams>(req.body);

  if (!validatedFilter.success) {
    return res.status(400).send(validatedFilter.errors);
  }

  const existingUser = await UserService.find(user.username);

  if (!existingUser.success) {
    return res.status(500).send();
  }

  if (!!existingUser.data) {
    return res.status(409).send();
  }

  const result = await UserService.createUser(user);
  if (!result.success) {
    return res.status(500).send();
  }

  res.send(result.data);
};
