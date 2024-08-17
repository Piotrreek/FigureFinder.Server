import { NextFunction, Request, Response } from "express";
import { CreateFigureCommandMapper } from "../features/createFigure/CreateFigureCommandMapper";
import CreateFigureCommandHandler from "../features/createFigure/CreatureFigureCommandHandler";
import { EditFigureCommandHandler } from "../features/editFigure/EditFigureCommandHandler";
import { EditFigureCommandMapper } from "../features/editFigure/EditFigureCommandMapper";
import { FigureWithIdDoesNotExistError } from "../features/editFigure/errors/FigureWithIdDoesNotExistError";
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

const editFigure = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as AuthenticatedRequest)?.user?.userId;
  const handler = new EditFigureCommandHandler(+req.params.id, userId);
  const mapper = new EditFigureCommandMapper();

  try {
    await handler.handle(mapper.map(req.body));
    res.status(200).send();
  } catch (err: unknown) {
    if (err instanceof FigureWithIdDoesNotExistError) {
      res.status(400).send({ error: err.message });
      return;
    }

    next(err);
  }
};

export default {
  createFigure,
  getFigures,
  editFigure,
};
