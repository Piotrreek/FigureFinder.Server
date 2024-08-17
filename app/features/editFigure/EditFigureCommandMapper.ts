import { EditFigureCommand } from "./EditFigureCommand";

export class EditFigureCommandMapper {
  public map = (object: any) => {
    return new EditFigureCommand(
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
