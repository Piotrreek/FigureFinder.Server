import { FigureFinderError } from "../../../common/FigureFinderError";

export class UsernameTakenError extends FigureFinderError {
  status: number = 400;
  message: string = "An account with provided username already exists";
  code: string = "UsernameTaken";
}
