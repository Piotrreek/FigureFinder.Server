import { ICommand } from "../../abstractions/ICommand";

export class CreateFigureCommand implements ICommand<number> {
  constructor(
    longitude: number,
    latitude: number,
    name: string,
    description: string,
    difficulty: number,
    author: string,
    owner: string,
    setupDate: Date,
    figureStatusId: number,
    figureTypeId: number
  ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.name = name;
    this.description = description;
    this.difficulty = difficulty;
    this.author = author;
    this.owner = owner;
    this.setupDate = setupDate;
    this.figureStatusId = figureStatusId;
    this.figureTypeId = figureTypeId;
  }

  longitude: number;
  latitude: number;
  name: string;
  description?: string;
  difficulty: number;
  author?: string;
  owner?: string;
  setupDate: Date;
  figureStatusId: number;
  figureTypeId: number;
}
