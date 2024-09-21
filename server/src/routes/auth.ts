import { Router } from "express";
import authLoginController from "../controllers/auth/login";
import authRegisterController from "../controllers/auth/register";
import authMiddleware from "../middlewares/auth";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.post("/login", authMiddleware, authLoginController);
  route.post("/register", authMiddleware, authRegisterController);
};
