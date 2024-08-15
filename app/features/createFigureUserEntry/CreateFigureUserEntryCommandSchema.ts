import { date, number, object, string } from "yup";
import { FormSchema } from "../../../utils/FormSchema";
import { CreateFigureUserEntryCommand } from "./CreateFigureUserEntryCommand";

export const CreateFigureUserEntryCommandSchema = object().shape<
  FormSchema<CreateFigureUserEntryCommand>
>({
  date: date().required(),
  comment: string().optional(),
  figureId: number().integer().required(),
  figureUserStatusId: number().integer().required(),
});
