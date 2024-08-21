export class FigureNotFoundError extends Error {
  constructor() {
    super("Figure with given id was not found");
  }
}
