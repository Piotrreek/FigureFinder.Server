import { NextFunction, Request, Response } from "express";
import CreateUserCommandHandler from "../features/createUser/CreateUserCommandHandler";
import { CreateUserCommandMapper } from "../features/createUser/CreateUserCommandMapper";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const handler = new CreateUserCommandHandler();
  const mapper = new CreateUserCommandMapper();
  try {
    const id = await handler.handle(mapper.map(req.body));
    res.status(201).json({ id: id });
  } catch (err: unknown) {
    next(err);
  }
};

export default {
  createUser,
};
