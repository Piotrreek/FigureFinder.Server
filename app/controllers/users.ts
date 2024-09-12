import { NextFunction, Request, Response } from "express";
import { BlockUserCommand } from "../features/blockUser/BlockUserCommand";
import { BlockUserCommandHandler } from "../features/blockUser/BlockUserCommandHandler";
import CreateUserCommandHandler from "../features/createUser/CreateUserCommandHandler";
import { CreateUserCommandMapper } from "../features/createUser/CreateUserCommandMapper";
import SignInCommandHandler from "../features/signIn/SignInCommandHandler";
import { SignInCommandMapper } from "../features/signIn/SignInCommandMapper";

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

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const handler = new SignInCommandHandler();
  const mapper = new SignInCommandMapper();
  try {
    const response = await handler.handle(mapper.map(req.body));
    res.status(200).json(response);
  } catch (err: unknown) {
    next(err);
  }
};

const block = async (req: Request, res: Response, next: NextFunction) => {
  const handler = new BlockUserCommandHandler();
  try {
    const command: BlockUserCommand = {
      userId: +req.params.id,
    };
    await handler.handle(command);
    res.status(200).send();
  } catch (err: unknown) {
    next(err);
  }
};

export default {
  createUser,
  signIn,
  block,
};
