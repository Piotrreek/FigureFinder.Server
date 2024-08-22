import { FigureFinderError } from "../../../common/FigureFinderError";

export class FigureNotFoundError extends FigureFinderError {
  status: number = 404;
  message: string = "Figure with given id was not found";
  code: string = "FigureNotFound";
}
