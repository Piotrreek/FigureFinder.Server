export abstract class FigureFinderError extends Error {
  abstract status: number;
  abstract message: string;
  abstract code: string;
}
