import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";

config();

export default async (req: Request, res: Response, next: NextFunction) => {
    if(req.method === "GET" && req.headers["if-match"]) {
        const etag = req.headers["if-match"];
        

        return next();
    }
  
};
