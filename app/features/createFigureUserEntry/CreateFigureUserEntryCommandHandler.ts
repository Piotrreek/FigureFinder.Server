import { PrismaClient } from "@prisma/client";
import { ICommandHandler } from "../../abstractions/ICommandHandler";
import { CreateFigureUserEntryCommand } from "./CreateFigureUserEntryCommand";
import { CreateFigureUserEntryCommandSchema } from "./CreateFigureUserEntryCommandSchema";
import { FigureUserEntryAlreadyExistsError } from "./errors/FigureUserEntryAlreadyExistsError";

export class CreateFigureUserEntryCommandHandler
  implements ICommandHandler<CreateFigureUserEntryCommand, void>
{
  prisma: PrismaClient;
  userId: number;

  constructor(userId: number) {
    this.prisma = new PrismaClient();
    this.userId = userId;
  }

  public handle = async (
    request: CreateFigureUserEntryCommand
  ): Promise<void> => {
    request = await CreateFigureUserEntryCommandSchema.validate(request, {
      abortEarly: false,
    });

    if (
      await this.figureUserEntryExists(
        request.figureUserStatusId,
        request.figureId,
        this.userId
      )
    ) {
      throw new FigureUserEntryAlreadyExistsError();
    }

    await this.prisma.figureUser.create({
      data: {
        date: request.date,
        comment: request.comment,
        userId: this.userId,
        figureId: request.figureId,
        figureUserStatusId: request.figureUserStatusId,
      },
    });
  };

  private figureUserEntryExists = async (
    figureUserStatusId: number,
    figureId: number,
    userId: number
  ) => {
    const figureUserEntry = await this.prisma.figureUser.findUnique({
      where: {
        userId_figureId_figureUserStatusId: {
          userId: userId,
          figureUserStatusId: figureUserStatusId,
          figureId: figureId,
        },
      },
    });

    return !!figureUserEntry;
  };
}
