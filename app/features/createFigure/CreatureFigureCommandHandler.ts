import { PrismaClient } from "@prisma/client";
import { ICommandHandler } from "../../abstractions/ICommandHandler";
import { CreateFigureCommand } from "./CreateFigureCommand";
import { CreateFigureRequestSchema } from "./CreateFigureCommandSchema";

class CreateFigureCommandHandler
  implements ICommandHandler<CreateFigureCommand, number>
{
  public handle = async (request: CreateFigureCommand): Promise<number> => {
    request = await CreateFigureRequestSchema.validate(request, {
      abortEarly: false,
    });
    const prisma = new PrismaClient();
    const figure = await prisma.figure.create({
      data: {
        name: request.name,
        description: request.description,
        difficulty: request.difficulty,
        author: request.author,
        owner: request.owner,
        latitude: request.latitude,
        longitude: request.longitude,
        figureStatusId: request.figureStatusId,
        figureTypeId: request.figureTypeId,
        setupDate: request.setupDate.toISOString(),
      },
    });

    return figure.id;
  };
}

export default CreateFigureCommandHandler;
