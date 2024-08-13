import { NextFunction, Request, Response } from "express";
import CreateUserCommandHandler from "../features/createUser/CreateUserCommandHandler";
import { CreateUserCommandMapper } from "../features/createUser/CreateUserCommandMapper";
import { EmailTakenError } from "../features/createUser/errors/EmailTakenError";
import { UsernameTakenError } from "../features/createUser/errors/UsernameTakenError";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const handler = new CreateUserCommandHandler();
  const mapper = new CreateUserCommandMapper();
  try {
    const id = await handler.handle(mapper.map(req.body));
    res.status(201).json({ id: id });
  } catch (err: unknown) {
    if (err instanceof EmailTakenError || err instanceof UsernameTakenError) {
      res.status(400).json({ error: err.message });
      return;
    }

    next(err);
  }
};

export default {
  createUser,
};
