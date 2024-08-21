import { ICommand } from "../../abstractions/ICommand";

export class CreateFigureUserEntryCommand implements ICommand<void> {
  date: Date;
  comment?: string;
  figureId: number;
  figureUserStatusId: number;

  constructor(
    date: Date,
    figureId: number,
    figureUserStatusId: number,
    comment?: string
  ) {
    this.date = date;
    this.comment = comment;
    this.figureId = figureId;
    this.figureUserStatusId = figureUserStatusId;
  }
}
