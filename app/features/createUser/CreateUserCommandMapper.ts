import { CreateUserCommand } from "./CreateUserCommand";

export class CreateUserCommandMapper {
  public map = (object: any) => {
    return new CreateUserCommand(
      object?.email,
      object?.username,
      object?.password
    );
  };
}
