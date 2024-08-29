import { number, object } from "yup";
import { FormSchema } from "../../../utils/FormSchema";
import { GetUserEntriesCountQuery } from "./GetUserEntriesCountQuery";

export const GetUserEntriesCountSchema = object().shape<
  FormSchema<GetUserEntriesCountQuery>
>({
  userId: number().positive().required(),
});
