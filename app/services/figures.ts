import { PrismaClient } from "@prisma/client";
import { CreateFigureRequest } from "../models/requests/createFigure";

const create = async (request: CreateFigureRequest): Promise<number> => {
  const prisma = new PrismaClient();
  const coordinates = `POINT(${request.longitude} ${request.latitude})`;
  const response = (await prisma.$queryRaw`
    INSERT INTO "Figure" (name, description, difficulty, author, owner, "setupDate", "figureStatusId", "figureTypeId", coordinates)
    VALUES (
      ${request.name},
      ${request.description},
      ${request.difficulty}, 
      ${request.author}, 
      ${request.owner},
        TO_DATE(${request.setupDate.toISOString().slice(0, 10)}, 'YYYY-MM-DD'),
      ${request.figureStatusId},
      ${request.figureTypeId}, 
        ST_GeomFromText(${coordinates})
    )
    RETURNING id
    `) as CreateFigureDatabaseResponse[];

  return response[0].id;
};

interface CreateFigureDatabaseResponse {
  id: number;
}

export default create;
