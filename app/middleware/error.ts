import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";
import { transformYupErrorsIntoObject } from "../../utils/transformYupErrorsIntoObject";
import { FigureFinderError } from "../common/FigureFinderError";

export interface Error {
  code: string;
  message: string;
}

const errorHandlingMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    const validationErrors = transformYupErrorsIntoObject(err);
    console.log(validationErrors);
    res.status(400).json({ errors: validationErrors });
    return;
  }

  if (err instanceof FigureFinderError) {
    res
      .status(err.status)
      .json({ errors: [{ code: err.code, message: err.message }] });
  }

  res
    .status(500)
    .json({ errors: [{ code: "error", message: "Something went wrong" }] });
};

export default errorHandlingMiddleware;
