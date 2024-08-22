import { FigureFinderError } from "../../../common/FigureFinderError";

export class FigureWithIdDoesNotExistError extends FigureFinderError {
  status: number = 400;
  message: string = "Figure with provided id does not exist";
  code: string = "FigureWithIdDoesNotExist";
}
