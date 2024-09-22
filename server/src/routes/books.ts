import { Router } from "express";
import uploadMiddleware from "../middlewares/upload";
import uploadBookController from "../controllers/books/upload";
import getAllBooksController from "../controllers/books/getAll";
import getBookController from "../controllers/books/get";
import updateBookController from "../controllers/books/update";
import reserveBookController from "../controllers/books/reserve";
import authMiddleware from "../middlewares/auth";

const route = Router();

export default (app: Router) => {
  app.use("/books", route);

  route.get("/:bookId", getBookController);
  route.put("/:bookId", authMiddleware, updateBookController);
  route.post("/:bookId/reserve", reserveBookController);
  route.post("/upload", authMiddleware, uploadMiddleware(), uploadBookController);
  route.get("/", getAllBooksController);
};
