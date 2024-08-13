import { PrismaClient } from "@prisma/client";
import { ICommandHandler } from "../../abstractions/ICommandHandler";
import { PasswordHasher } from "../../services/PasswordHasher";
import { CreateUserCommand } from "./CreateUserCommand";
import { CreateUserCommandSchema } from "./CreateUserCommandSchema";
import { EmailTakenError } from "./errors/EmailTakenError";
import { UsernameTakenError } from "./errors/UsernameTakenError";

class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand, number>
{
  prisma: PrismaClient;
  passwordHasher: PasswordHasher;

  constructor() {
    this.prisma = new PrismaClient();
    this.passwordHasher = new PasswordHasher();
  }

  public handle = async (request: CreateUserCommand): Promise<number> => {
    request = await CreateUserCommandSchema.validate(request, {
      abortEarly: false,
    });

    if (await this.userWithEmailExists(request.email)) {
      throw new EmailTakenError(request.email);
    }

    if (await this.userWithUsernameExists(request.username)) {
      throw new UsernameTakenError(request.username);
    }

    const passwordHash = await this.passwordHasher.generatePasswordHash(
      request.password
    );

    const role = await this.getUserRole();

    const user = await this.prisma.user.create({
      data: {
        email: request.email,
        username: request.username,
        password: passwordHash,
        emailConfirmed: false,
        blocked: false,
        roleId: role?.id,
      },
    });

    return user.id;
  };

  private userWithEmailExists = async (email: string) => {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return !!user;
  };

  private userWithUsernameExists = async (username: string) => {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    return !!user;
  };

  private getUserRole = async () => {
    return this.prisma.role.findUniqueOrThrow({
      where: {
        name: "User",
      },
    });
  };
}

export default CreateUserCommandHandler;
