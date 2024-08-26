import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "./requireAuthenticated";

const blockBlockedUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authenticatedRequest = req as AuthenticatedRequest;
    if (authenticatedRequest.user.blocked) {
      res.status(403).send();
      return;
    }

    next();
  } catch (err: unknown) {
    res.status(403).send();
  }
};

export default blockBlockedUserMiddleware;
