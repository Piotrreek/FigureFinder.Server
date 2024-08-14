import { IQuery } from "../../abstractions/IQuery";
import { GetFiguresResponse } from "./GetFiguresResponse";

export class GetFiguresQuery implements IQuery<GetFiguresResponse> {
  figureTypeId?: number;
  figureStatusId?: number;
  latitude?: number;
  longitude?: number;
  maxDistance?: number;

  constructor(
    figureTypeId?: number,
    figureStatusId?: number,
    latitude?: number,
    longitude?: number,
    maxDistance?: number
  ) {
    this.figureTypeId = figureTypeId;
    this.figureStatusId = figureStatusId;
    this.latitude = latitude;
    this.longitude = longitude;
    this.maxDistance = maxDistance;
  }
}
