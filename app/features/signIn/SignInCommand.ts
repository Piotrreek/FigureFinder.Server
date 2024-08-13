import { ICommand } from "../../abstractions/ICommand";
import { SignInResponse } from "./SignInResponse";

export class SignInCommand implements ICommand<SignInResponse> {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
