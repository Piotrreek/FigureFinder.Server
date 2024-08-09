import { Request, Response } from "express";
import create from "../services/figures";
import {
  CreateFigureRequest,
  createFigureRequestSchema,
} from "../models/requests/createFigure";
import { ValidationError } from "yup";
import { transformYupErrorsIntoObject } from "../../utils/transformYupErrorsIntoObject";

const createFigure = async (req: Request, res: Response) => {
  try {
    const request: CreateFigureRequest =
      await createFigureRequestSchema.validate(req.body, {
        abortEarly: false,
      });

    const id = await create(request);

    res.status(201).json({ id: id });
  } catch (error: any) {
    if (error instanceof ValidationError) {
      const validationErrors = transformYupErrorsIntoObject(error);
      res.status(400).json(validationErrors);
      return;
    }

    res.status(500).send("Something went wrong");
  }
};

export default {
  createFigure,
};
