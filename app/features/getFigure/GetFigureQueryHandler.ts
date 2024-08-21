import { PrismaClient } from "@prisma/client";
import { IQueryHandler } from "../../abstractions/IQueryHandler";
import { GetFigureQuery } from "./GetFigureQuery";
import { GetFigureQuerySchema } from "./GetFigureQuerySchema";
import { GetFigureResponse } from "./GetFigureResponse";
import { FigureNotFoundError } from "./errors/FigureNotFoundError";

export class GetFigureQueryHandler
  implements IQueryHandler<GetFigureQuery, GetFigureResponse>
{
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  public handle = async (query: GetFigureQuery): Promise<GetFigureResponse> => {
    const { figureId } = await GetFigureQuerySchema.validate(query, {
      abortEarly: false,
    });

    const figure = await this.prisma.figure.findUnique({
      where: {
        id: figureId,
      },
      select: {
        id: true,
        latitude: true,
        longitude: true,
        name: true,
        description: true,
        difficulty: true,
        author: true,
        owner: true,
        setupDate: true,
        figureStatus: true,
        figureType: true,
        figureUsers: {
          select: {
            user: true,
            date: true,
            comment: true,
            figureUserStatus: true,
          },
        },
        createdBy: true,
      },
    });

    if (!figure) {
      throw new FigureNotFoundError();
    }

    return {
      id: figure.id,
      latitude: figure.latitude.toNumber(),
      longitude: figure.longitude.toNumber(),
      name: figure.name,
      description: figure.description,
      difficulty: figure.difficulty,
      author: figure.author,
      owner: figure.owner,
      setupDate: figure.setupDate,
      status: figure.figureStatus.name,
      type: figure.figureType.name,
      createdBy: figure.createdBy?.username,
      entries: figure.figureUsers.map((entry) => {
        return {
          date: entry.date,
          comment: entry.comment,
          username: entry.user.username,
          status: entry.figureUserStatus.name,
        };
      }),
    };
  };
}
