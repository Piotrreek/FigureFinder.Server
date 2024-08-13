import { SignInCommand } from "./SignInCommand";

export class SignInCommandMapper {
  public map = (object: any) => {
    return new SignInCommand(object?.email, object?.password);
  };
}
