import { number, object } from "yup";
import { FormSchema } from "../../../utils/FormSchema";
import { GetFigureQuery } from "./GetFigureQuery";

export const GetFigureQuerySchema = object().shape<FormSchema<GetFigureQuery>>({
  figureId: number().required().integer(),
});
