import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../services/jwtService";

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

const attachUserPayloadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      next();
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as JwtPayload;

    (req as AuthenticatedRequest).user = decoded;

    next();
  } catch (err) {
    next(err);
  }
};

export default attachUserPayloadMiddleware;
