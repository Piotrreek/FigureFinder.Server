import { IQuery } from "./IQuery";

export interface IQueryHandler<TRequest extends IQuery<TResponse>, TResponse> {
  handle: (request: TRequest) => Promise<TResponse>;
}
