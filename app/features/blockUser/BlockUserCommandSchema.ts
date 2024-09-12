import { number, object } from "yup";
import { FormSchema } from "../../../utils/FormSchema";
import { BlockUserCommand } from "./BlockUserCommand";

export const BlockUserCommandSchema = object().shape<
  FormSchema<BlockUserCommand>
>({
  userId: number().required().positive(),
});
