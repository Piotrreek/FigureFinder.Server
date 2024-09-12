import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "./requireAuthenticated";

const blockBlockedUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authenticatedRequest = req as AuthenticatedRequest;
    const prisma = new PrismaClient();

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: authenticatedRequest.user.userId,
      },
      select: {
        blocked: true,
      },
    });

    if (user.blocked) {
      res.status(403).send();
      return;
    }

    next();
  } catch (err: unknown) {
    res.status(403).send();
  }
};

export default blockBlockedUserMiddleware;
