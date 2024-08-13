import { object, string } from "yup";
import { FormSchema } from "../../../utils/FormSchema";
import { CreateUserCommand } from "./CreateUserCommand";

const alphanumericRegex = /^[a-zA-Z0-9]*$/;
const noSpacesRegex = /^\S*$/;

export const CreateUserCommandSchema = object().shape<
  FormSchema<CreateUserCommand>
>({
  email: string()
    .email("You must provide correct email address")
    .required("Email is required"),
  username: string()
    .matches(
      alphanumericRegex,
      "Username must contain only alphanumeric characters"
    )
    .required("Username is required"),
  password: string()
    .matches(noSpacesRegex, "Password cannot contain spaces")
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
});
