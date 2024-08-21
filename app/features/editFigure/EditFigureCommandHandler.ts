import { PrismaClient } from "@prisma/client";
import { ICommandHandler } from "../../abstractions/ICommandHandler";
import { EditFigureCommand } from "./EditFigureCommand";
import { EditFigureCommandSchema } from "./EditFigureCommandSchema";
import { FigureWithIdDoesNotExistError } from "./errors/FigureWithIdDoesNotExistError";

export class EditFigureCommandHandler
  implements ICommandHandler<EditFigureCommand, void>
{
  private prisma: PrismaClient;
  private userId?: number;
  private figureId: number;

  constructor(figureId: number, userId?: number) {
    this.prisma = new PrismaClient();
    this.userId = userId;
    this.figureId = figureId;
  }

  public handle = async (request: EditFigureCommand): Promise<void> => {
    request = await EditFigureCommandSchema.validate(request, {
      abortEarly: false,
    });

    const figure = await this.getFigure(this.figureId);

    if (!figure) {
      throw new FigureWithIdDoesNotExistError();
    }

    const now = new Date();

    const newFigureHistoryEntry = {
      latitude: figure.latitude,
      longitude: figure.longitude,
      name: figure.name,
      description: figure.description,
      difficulty: figure.difficulty,
      author: figure.author,
      owner: figure.owner,
      setupDate: figure.setupDate,
      validFrom: now,
      validTo: null,
      figureId: this.figureId,
      figureStatusId: figure.figureStatusId,
      changedById: this.userId,
      figureTypeId: figure.figureTypeId,
    };

    const newFigureState = {
      latitude: request.latitude,
      longitude: request.longitude,
      name: request.name,
      description: request.description,
      difficulty: request.difficulty,
      author: request.author,
      owner: request.owner,
      setupDate: request.setupDate,
      figureStatusId: request.figureStatusId,
      figureTypeId: request.figureTypeId,
      createdById: figure.createdById,
    };

    const latestFigureHistoryEntry = await this.getLatestFigureHistoryEntry(
      this.figureId
    );

    await this.prisma.$transaction(async (tx) => {
      // Modify old history entry
      if (latestFigureHistoryEntry) {
        latestFigureHistoryEntry!.validTo = now;
        await tx.figureHistory.update({
          where: {
            id: latestFigureHistoryEntry.id,
          },
          data: latestFigureHistoryEntry,
        });
      }

      // Create new history entry with previous figure state
      await tx.figureHistory.create({ data: newFigureHistoryEntry });
      // Update figure to latest data
      await tx.figure.update({
        where: {
          id: figure.id,
        },
        data: newFigureState,
      });
    });
  };

  private getFigure = async (figureId: number) => {
    const figure = await this.prisma.figure.findUnique({
      where: {
        id: figureId,
      },
    });

    return figure;
  };

  private getLatestFigureHistoryEntry = async (figureId: number) => {
    const figureHistory = await this.prisma.figureHistory.findFirst({
      where: {
        figureId: figureId,
        validTo: null,
      },
    });

    return figureHistory;
  };
}
