import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../services/jwtService";

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

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as JwtPayload;

    req.body = { ...req.body, userId: decoded.userId };

    next();
  } catch (err) {
    res.status(401).send();
  }
};

export default requireAuthenticatedUserMiddleware;
