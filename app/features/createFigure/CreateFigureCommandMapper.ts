import { CreateFigureCommand } from "./CreateFigureCommand";

export class CreateFigureCommandMapper {
  public map = (object: any) => {
    return new CreateFigureCommand(
      object?.longitude,
      object?.latitude,
      object?.name,
      object?.description,
      object?.difficulty,
      object?.author,
      object?.owner,
      object?.setupDate,
      object?.figureStatusId,
      object?.figureTypeId
    );
  };
}
