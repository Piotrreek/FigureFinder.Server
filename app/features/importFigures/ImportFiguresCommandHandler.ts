import { PrismaClient } from "@prisma/client";
import { ICommandHandler } from "../../abstractions/ICommandHandler";
import { GPXParserService } from "../../services/GPXParserService";
import { ImportFiguresCommand } from "./ImportFiguresCommand";

export class ImportFiguresCommandHandler
  implements ICommandHandler<ImportFiguresCommand, void>
{
  gpxParserService: GPXParserService;
  prismaClient: PrismaClient;
  userId: number;

  constructor(userId: number) {
    this.gpxParserService = new GPXParserService();
    this.prismaClient = new PrismaClient();
    this.userId = userId;
  }

  public handle = async (request: ImportFiguresCommand): Promise<void> => {
    const gpxFigures = this.gpxParserService.parseGPX(request.gpxContent);
    const removedStatus = await this.prismaClient.figureStatus.findFirstOrThrow(
      {
        where: {
          name: "Usunięty",
        },
      }
    );

    const availableStatus =
      await this.prismaClient.figureStatus.findFirstOrThrow({
        where: {
          name: "Na miejscu",
        },
      });

    const duringRenovationStatus =
      await this.prismaClient.figureStatus.findFirstOrThrow({
        where: {
          name: "W renowacji",
        },
      });

    await this.prismaClient.figure.createMany({
      data: gpxFigures.map((figure) => {
        return {
          name: figure.desc,
          description: `${
            figure["groundspeak:cache"]["groundspeak:short_description"][
              "#text"
            ] ?? ""
          }.\n
      ${
        figure["groundspeak:cache"]["groundspeak:long_description"]["#text"] ??
        ""
      }.\n
      ${figure["groundspeak:cache"]["groundspeak:encoded_hints"] ?? ""}
      `,
          difficulty: figure["groundspeak:cache"]["groundspeak:difficulty"] ?? 1,
          author: figure["groundspeak:cache"]["groundspeak:owner"] ?? null,
          owner: figure["groundspeak:cache"]["groundspeak:placed_by"] ?? null,
          latitude: figure["@_lat"],
          longitude: figure["@_lon"],
          figureStatusId:
            figure["groundspeak:cache"]["@_archived"] == "True"
              ? removedStatus.id
              : figure["groundspeak:cache"]["@_available"] == "True"
              ? availableStatus.id
              : duringRenovationStatus.id,
          figureTypeId: 1,
          createdById: this.userId,
          setupDate: null,
        };
      }),
    });

    return;
  };
}
