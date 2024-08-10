import { NextFunction, Request, Response } from "express";
import handle from "../features/createFigure/CreatureFigureHandler";

const createFigure = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = await handle(req.body);
    res.status(201).json({ id: id });
  } catch (err: unknown) {
    next(err);
  }
};

export default {
  createFigure,
};
