import { FigureFinderError } from "../../../common/FigureFinderError";

export class UserNotFoundError extends FigureFinderError {
  status: number = 400;
  message: string = "User was not found.";
  code: string = "UserNotFound";
}
