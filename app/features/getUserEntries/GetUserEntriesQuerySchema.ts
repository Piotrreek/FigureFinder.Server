import { number, object } from "yup";
import { FormSchema } from "../../../utils/FormSchema";
import { GetUserEntriesQuery } from "./GetUserEntriesQuery";

export const GetUserEntriesQuerySchema = object().shape<
  FormSchema<GetUserEntriesQuery>
>({
  userId: number().positive().required(),
  pageNumber: number().positive().required(),
  pageSize: number().positive().required(),
});
