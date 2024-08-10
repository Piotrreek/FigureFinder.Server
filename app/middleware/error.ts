import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";
import { transformYupErrorsIntoObject } from "../../utils/transformYupErrorsIntoObject";

const errorHandlingMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  if (err instanceof ValidationError) {
    const validationErrors = transformYupErrorsIntoObject(err);
    res.status(400).json(validationErrors);
    return;
  }

  res.status(500).send("Something went wrong");
};

export default errorHandlingMiddleware;
