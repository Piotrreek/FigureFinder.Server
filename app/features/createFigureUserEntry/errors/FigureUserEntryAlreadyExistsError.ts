import { FigureFinderError } from "../../../common/FigureFinderError";

export class FigureUserEntryAlreadyExistsError extends FigureFinderError {
  status: number = 400;
  message: string = "Entry with same parameters already exists";
  code: string = "FigureUserEntryAlreadyExists";
}
