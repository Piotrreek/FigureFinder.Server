import { ICommand } from "../../abstractions/ICommand";

export class ImportFiguresCommand implements ICommand<void> {
  gpxContent: string;

  constructor(gpxContent: string) {
    this.gpxContent = gpxContent;
  }
}
