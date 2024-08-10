import { date, number, object, string } from "yup";

export const CreateFigureRequestSchema = object({
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
