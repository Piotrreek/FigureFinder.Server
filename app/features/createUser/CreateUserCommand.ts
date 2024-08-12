import { ICommand } from "../../abstractions/ICommand";

export class CreateUserCommand implements ICommand<number> {
  email: string;
  username: string;
  password: string;

  constructor(email: string, username: string, password: string) {
    this.email = email;
    this.username = username;
    this.password = password;
  }
}
