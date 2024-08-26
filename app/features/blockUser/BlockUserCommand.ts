import { ICommand } from "../../abstractions/ICommand";

export class BlockUserCommand implements ICommand<void> {
  userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }
}
