import { date, number, object, string } from "yup";
import { FormSchema } from "../../../utils/FormSchema";
import { CreateFigureCommand } from "./CreateFigureCommand";

export const CreateFigureRequestSchema = object().shape<
  FormSchema<CreateFigureCommand>
>({
  longitude: number().required().max(180).min(-180),
  latitude: number().required().max(90).min(-90),
  name: string().required(),
  description: string().optional(),
  difficulty: number().integer().min(1).max(5).required(),
  author: string().optional(),
  owner: string().optional(),
  setupDate: date().optional(),
  figureStatusId: number().required().integer().positive(),
  figureTypeId: number().required().integer().positive(),
});
