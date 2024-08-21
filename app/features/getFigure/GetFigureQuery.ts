import { IQuery } from "../../abstractions/IQuery";
import { GetFigureResponse } from "./GetFigureResponse";

export class GetFigureQuery implements IQuery<GetFigureResponse> {
  figureId: number;

  constructor(figureId: number) {
    this.figureId = figureId;
  }
}
