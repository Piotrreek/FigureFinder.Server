import { NextFunction, Request, Response } from "express";
import { CreateFigureCommandMapper } from "../features/createFigure/CreateFigureCommandMapper";
import CreateFigureCommandHandler from "../features/createFigure/CreatureFigureCommandHandler";
import { AuthenticatedRequest } from "../middleware/requireAuthenticated";

const createFigure = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as AuthenticatedRequest)?.user?.userId;
  const handler = new CreateFigureCommandHandler(userId);
  const mapper = new CreateFigureCommandMapper();
  try {
    const id = await handler.handle(mapper.map(req.body));
    res.status(201).json({ id: id });
  } catch (err: unknown) {
    next(err);
  }
};

export default {
  createFigure,
};
