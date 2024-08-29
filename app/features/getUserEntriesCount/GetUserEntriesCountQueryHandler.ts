import { PrismaClient } from "@prisma/client";
import { groupBy } from "../../../utils/array";
import { IQueryHandler } from "../../abstractions/IQueryHandler";
import { GetUserEntriesCountQuery } from "./GetUserEntriesCountQuery";
import { GetUserEntriesCountResponse } from "./GetUserEntriesCountResponse";
import { GetUserEntriesCountSchema } from "./GetUserEntriesCountSchema";

export class GetUserEntriesCountQueryHandler
  implements
    IQueryHandler<GetUserEntriesCountQuery, GetUserEntriesCountResponse>
{
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public handle = async (
    query: GetUserEntriesCountQuery
  ): Promise<GetUserEntriesCountResponse> => {
    query = await GetUserEntriesCountSchema.validate(query, {
      abortEarly: false,
    });

    const userEntries = await this.prisma.figureUser.findMany({
      where: {
        userId: query.userId,
      },
      select: {
        figureUserStatus: true,
      },
    });

    const groupedEntries = groupBy(userEntries, "figureUserStatus.name").map(
      (group) => {
        return {
          status: group.key,
          count: group.data.length,
        };
      }
    );

    return { data: groupedEntries };
  };
}
