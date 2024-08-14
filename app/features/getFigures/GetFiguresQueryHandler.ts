import { PrismaClient } from "@prisma/client";
import { IQueryHandler } from "../../abstractions/IQueryHandler";
import { GetFiguresQuery } from "./GetFiguresQuery";
import { GetFiguresQuerySchema } from "./GetFiguresQuerySchema";
import { GetFiguresResponse } from "./GetFiguresResponse";

export class GetFiguresQueryHandler
  implements IQueryHandler<GetFiguresQuery, GetFiguresResponse>
{
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public handle = async (
    query: GetFiguresQuery
  ): Promise<GetFiguresResponse> => {
    query = await GetFiguresQuerySchema.validate(query, { abortEarly: false });

    const { figureTypeId, figureStatusId, latitude, longitude, maxDistance } =
      query;

    // Start building the SQL query
    let sql = `
      SELECT
        f.id,
        f.latitude,
        f.longitude,
        f.name,
        f.difficulty,
    `;

    // Add distance calculation if applicable
    const hasLocationData = latitude && longitude && maxDistance;
    if (hasLocationData) {
      sql += `
        ST_DistanceSpheroid(
          ST_MakePoint(f.longitude, f.latitude),
          ST_MakePoint($1, $2)
        ) AS distance
      `;
    } else {
      sql += `NULL AS distance`;
    }

    // Complete the base SQL query
    sql += `
      FROM "Figure" f
    `;

    // Prepare the WHERE clause conditions
    const whereClauses: string[] = [];
    const params: any[] = [];

    if (hasLocationData) {
      whereClauses.push(`
        ST_DistanceSpheroid(
          ST_MakePoint(f.longitude, f.latitude),
          ST_MakePoint($1, $2)
        ) <= $3
      `);
      params.push(longitude, latitude, maxDistance);
    }

    if (figureTypeId) {
      whereClauses.push(`f."figureTypeId" = $${params.length + 1}`);
      params.push(figureTypeId);
    }

    if (figureStatusId) {
      whereClauses.push(`f."figureStatusId" = $${params.length + 1}`);
      params.push(figureStatusId);
    }

    // Append the WHERE clause if there are any conditions
    if (whereClauses.length > 0) {
      sql += `WHERE ` + whereClauses.join(" AND ");
    }

    const figures = (await this.prisma.$queryRawUnsafe(
      sql,
      ...params
    )) as GetFiguresDatabaseResponse[];

    return {
      figures: figures.map((f) => ({
        id: f.id,
        latitude: f.latitude,
        longitude: f.longitude,
        name: f.name,
        distance: f.distance,
        difficulty: f.difficulty,
      })),
    };
  };
}

interface GetFiguresDatabaseResponse {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  difficulty: number;
  distance?: number;
}
