import { date, number, object, Schema, string } from "yup";
import { CreateFigureCommand } from "./CreateFigureCommand";

type SchemaObject = {
  [key in keyof CreateFigureCommand]: Schema<any>;
};

export const CreateFigureRequestSchema = object().shape<SchemaObject>({
  longitude: number().required().max(180).min(-180),
  latitude: number().required().max(90).min(-90),
  name: string().required(),
  description: string().optional(),
  difficulty: number().integer().min(1).max(5).required(),
  author: string().optional(),
  owner: string().optional(),
  setupDate: date().required(),
  figureStatusId: number().required().integer().positive(),
  figureTypeId: number().required().integer().positive(),
});
