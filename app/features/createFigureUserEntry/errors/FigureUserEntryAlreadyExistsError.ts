export class FigureUserEntryAlreadyExistsError extends Error {
  constructor() {
    super("Entry with same parameters already exists");
  }
}
