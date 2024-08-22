import { ValidationError } from "yup";
import { Error } from "../app/middleware/error";

export const transformYupErrorsIntoObject = (
  errors: ValidationError
): Error[] => {
  const validationErrors: Error[] = [];
  errors.inner.forEach((error: any) => {
    if (error.path !== undefined) {
      validationErrors.push({ code: error.path, message: error.errors[0] });
    }
  });

  return validationErrors;
};
