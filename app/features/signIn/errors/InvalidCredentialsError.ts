import { FigureFinderError } from "../../../common/FigureFinderError";

export class InvalidCredentialsError extends FigureFinderError {
  status: number = 401;
  message: string = "Invalid email or password";
  code: string = "InvalidCredentials";
}
