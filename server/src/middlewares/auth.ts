import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/usersService";
import { config } from "dotenv";

config();
const { AUTH_SYSTEM_ADMIN_USERNAME, AUTH_SYSTEM_ADMIN_PASSWORD } = process.env;

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).send("Authorization header missing or not Basic");
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  const [username, password] = credentials.split(":");

  if (!username || !password) {
    return res.status(401).send("Invalid Basic Authentication credentials");
  }

  const isSystemAdmin =
    username === AUTH_SYSTEM_ADMIN_USERNAME &&
    password === AUTH_SYSTEM_ADMIN_PASSWORD;

  if (isSystemAdmin) {
    res.locals.user = {
      username: "admin",
      role: "admin",
    };
    return next();
  }

  const user = await UserService.validateandGetUser(username, password);
  if (!user.success) {
    return res.status(401).send("Invalid username or password");
  }

  res.locals.user = user.data;
  next();
};
