import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";
import dbClient from "./models/dbClient";
import { config } from 'dotenv';

const port = 3000;

const startServer = async () => {
  config();
  const app = express();
  app.use(express.json());
  await dbClient().sync({ force: true });
  app.use(routes());

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send();
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

startServer();
