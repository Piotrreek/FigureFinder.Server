import { NextFunction, Request, Response } from "express";
import { CreateFigureCommandMapper } from "../features/createFigure/CreateFigureCommandMapper";
import CreateFigureCommandHandler from "../features/createFigure/CreatureFigureCommandHandler";
import { GetFigureQuery } from "../features/getFigure/GetFigureQuery";
import { GetFigureQueryHandler } from "../features/getFigure/GetFigureQueryHandler";
import { FigureNotFoundError } from "../features/getFigure/errors/FigureNotFoundError";
import { GetFiguresQuery } from "../features/getFigures/GetFiguresQuery";
import { GetFiguresQueryHandler } from "../features/getFigures/GetFiguresQueryHandler";
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

const getFigures = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as AuthenticatedRequest)?.user?.userId;
  const handler = new GetFiguresQueryHandler(userId);
  try {
    const getFiguresQuery: GetFiguresQuery = {
      figureTypeId: req.query.figureTypeId
        ? +req.query.figureTypeId
        : undefined,
      figureStatusId: req.query.figureStatusId
        ? +req.query.figureStatusId
        : undefined,
      latitude: req.query.latitude ? +req.query.latitude : undefined,
      longitude: req.query.longitude ? +req.query.longitude : undefined,
      maxDistance: req.query.maxDistance ? +req.query.maxDistance : undefined,
    };

    const result = await handler.handle(getFiguresQuery);

    res.status(200).json(result);
  } catch (err: unknown) {
    next(err);
  }
};

const getFigure = async (req: Request, res: Response, next: NextFunction) => {
  const handler = new GetFigureQueryHandler();
  try {
    const getFigureQuery: GetFigureQuery = {
      figureId: +req.params.id,
    };

    const result = await handler.handle(getFigureQuery);

    res.status(200).json(result);
  } catch (err: unknown) {
    if (err instanceof FigureNotFoundError) {
      res.status(404).send();
      return;
    }

    next(err);
  }
};

export default {
  createFigure,
  getFigures,
  getFigure,
};
