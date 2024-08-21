export class FigureWithIdDoesNotExistError extends Error {
  constructor() {
    super(`Figure with provided id does not exist`);
  }
}
