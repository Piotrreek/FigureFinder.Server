import { PrismaClient } from "@prisma/client";
import { IQueryHandler } from "../../abstractions/IQueryHandler";
import { GetUserEntriesQuery } from "./GetUserEntriesQuery";
import { GetUserEntriesQuerySchema } from "./GetUserEntriesQuerySchema";
import { GetUserEntriesResponse } from "./GetUserEntriesResponse";

export class GetUserEntriesQueryHandler
  implements IQueryHandler<GetUserEntriesQuery, GetUserEntriesResponse>
{
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public handle = async (
    query: GetUserEntriesQuery
  ): Promise<GetUserEntriesResponse> => {
    query = await GetUserEntriesQuerySchema.validate(query, {
      abortEarly: false,
    });

    const count = await this.prisma.figureUser.count({
      where: {
        userId: query.userId,
      },
    });
    const entries = await this.prisma.figureUser.findMany({
      where: {
        userId: query.userId,
      },
      take: query.pageSize,
      skip: (query.pageNumber - 1) * query.pageSize,
      orderBy: {
        date: "desc",
      },
      select: {
        date: true,
        comment: true,
        figure: {
          select: {
            id: true,
            name: true,
          },
        },
        figureUserStatus: {
          select: {
            name: true,
          },
        },
      },
    });

    const totalPages =
      count % query.pageSize === 0
        ? count / query.pageSize
        : Math.floor(count / query.pageSize) + 1;

    return {
      pageSize: query.pageSize,
      pageNumber: query.pageNumber,
      totalPages: totalPages,
      totalCount: count,
      data: entries.map((entry) => {
        return {
          date: entry.date,
          comment: entry.comment,
          figure: {
            id: entry.figure.id,
            name: entry.figure.name,
          },
          status: {
            name: entry.figureUserStatus.name,
          },
        };
      }),
    };
  };
}
