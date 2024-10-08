import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { CreateFigureCommandMapper } from "../features/createFigure/CreateFigureCommandMapper";
import CreateFigureCommandHandler from "../features/createFigure/CreatureFigureCommandHandler";
import { CreateFigureUserEntryCommand } from "../features/createFigureUserEntry/CreateFigureUserEntryCommand";
import { CreateFigureUserEntryCommandHandler } from "../features/createFigureUserEntry/CreateFigureUserEntryCommandHandler";
import { EditFigureCommandHandler } from "../features/editFigure/EditFigureCommandHandler";
import { EditFigureCommandMapper } from "../features/editFigure/EditFigureCommandMapper";
import { GetFigureQuery } from "../features/getFigure/GetFigureQuery";
import { GetFigureQueryHandler } from "../features/getFigure/GetFigureQueryHandler";
import { GetFiguresQuery } from "../features/getFigures/GetFiguresQuery";
import { GetFiguresQueryHandler } from "../features/getFigures/GetFiguresQueryHandler";
import { GetUserEntriesQuery } from "../features/getUserEntries/GetUserEntriesQuery";
import { GetUserEntriesQueryHandler } from "../features/getUserEntries/GetUserEntriesQueryHandler";
import { GetUserEntriesCountQuery } from "../features/getUserEntriesCount/GetUserEntriesCountQuery";
import { GetUserEntriesCountQueryHandler } from "../features/getUserEntriesCount/GetUserEntriesCountQueryHandler";
import { ImportFiguresCommand } from "../features/importFigures/ImportFiguresCommand";
import { ImportFiguresCommandHandler } from "../features/importFigures/ImportFiguresCommandHandler";
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

const createFigureUserEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as AuthenticatedRequest).user.userId;
  const handler = new CreateFigureUserEntryCommandHandler(userId);
  try {
    const command = new CreateFigureUserEntryCommand(
      req.body.date,
      +req.params.id,
      req.body.figureUserStatusId,
      req.body.comment
    );

    await handler.handle(command);

    res.status(201).send();
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
    next(err);
  }
};

const importFigures = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authenticatedRequest = req as AuthenticatedRequest;
  const handler = new ImportFiguresCommandHandler(
    authenticatedRequest.user.userId
  );
  try {
    const fileRequest = req as FileRequest;
    const filePath = fileRequest.file.path;
    const fileContent = fs.readFileSync(filePath, "utf-8");
    await handler.handle(new ImportFiguresCommand(fileContent));

    res.status(200).send();
  } catch (err: unknown) {
    next(err);
  }
};

interface FileRequest extends Request {
  file: any;
}

const getUserEntriesCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const handler = new GetUserEntriesCountQueryHandler();
  try {
    const getUserEntriesCountQuery: GetUserEntriesCountQuery = {
      userId: +req.params.id,
    };

    const result = await handler.handle(getUserEntriesCountQuery);

    res.status(200).json(result);
  } catch (err: unknown) {
    next(err);
  }
};

const getUserEntries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const handler = new GetUserEntriesQueryHandler();
  try {
    const query: GetUserEntriesQuery = {
      userId: +req.params.id,
      pageNumber: +(req.query.pageNumber ?? 1),
      pageSize: +(req.query.pageSize ?? 10),
    };

    const result = await handler.handle(query);

    res.status(200).json(result);
  } catch (err: unknown) {
    next(err);
  }
};

export default {
  createFigure,
  getFigures,
  createFigureUserEntry,
  editFigure,
  getFigure,
  importFigures,
  getUserEntriesCount,
  getUserEntries,
};
