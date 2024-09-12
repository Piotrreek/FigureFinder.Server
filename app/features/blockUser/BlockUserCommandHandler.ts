import { PrismaClient } from "@prisma/client";
import { ICommandHandler } from "../../abstractions/ICommandHandler";
import { BlockUserCommand } from "./BlockUserCommand";
import { BlockUserCommandSchema } from "./BlockUserCommandSchema";
import { UserNotFoundError } from "./errors/UserNotFoundError";

export class BlockUserCommandHandler
  implements ICommandHandler<BlockUserCommand, void>
{
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public handle = async (command: BlockUserCommand): Promise<void> => {
    command = await BlockUserCommandSchema.validate(command, {
      abortEarly: false,
    });

    const user = await this.prisma.user.findUnique({
      where: {
        id: command.userId,
      },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    await this.prisma.user.update({
      where: {
        id: command.userId,
      },
      data: {
        ...user,
        blocked: true,
      },
    });
  };
}
