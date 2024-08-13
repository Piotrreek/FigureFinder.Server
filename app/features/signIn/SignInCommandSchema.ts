import { object, string } from "yup";
import { FormSchema } from "../../../utils/FormSchema";
import { SignInCommand } from "./SignInCommand";

export const SignInCommandSchema = object().shape<FormSchema<SignInCommand>>({
  email: string()
    .email("You must provide correct email address")
    .required("Email is required"),
  password: string().required("Password is required"),
});
