import { FigureFinderError } from "../../../common/FigureFinderError";

export class EmailTakenError extends FigureFinderError {
  status: number = 400;
  message: string = "An account with provided email address already exists";
  code: string = "EmailTaken";
}
