import { NextFunction, Request, Response } from "express";
import {
  CreateFigureRequest,
  createFigureRequestSchema,
} from "../models/requests/createFigure";
import create from "../services/figures";

const createFigure = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request: CreateFigureRequest =
      await createFigureRequestSchema.validate(req.body, {
        abortEarly: false,
      });

    const id = await create(request);
    res.status(201).json({ id: id });
  } catch (err: unknown) {
    next(err);
  }
};

export default {
  createFigure,
};
