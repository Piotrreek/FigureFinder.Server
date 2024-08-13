import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const requireAuthenticatedUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).send();
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY!);
    next();
  } catch (err) {
    res.status(401).send();
  }
};

export default requireAuthenticatedUserMiddleware;
