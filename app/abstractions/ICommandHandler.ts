import { ICommand } from "./ICommand";

export interface ICommandHandler<TRequest extends ICommand<TResponse>, TResponse> {
  handle: (request: TRequest) => Promise<TResponse>;
}
