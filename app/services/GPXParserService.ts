import { XMLParser } from "fast-xml-parser";

export class GPXParserService {
  public parseGPX = (gpxContent: string): Figure[] => {
    const parser = new XMLParser({ ignoreAttributes: false });
    const json = parser.parse(gpxContent);

    return (json.gpx.wpt as Figure[]).filter((x) => x.cmt === undefined);
  };
}

interface Figure {
  cmt: string | undefined;
  "@_lat": string;
  "@_lon": string;
  desc: string;
  "groundspeak:cache": GroundSpeak;
}

interface GroundSpeak {
  "groundspeak:short_description": Description;
  "groundspeak:long_description": Description;
  "groundspeak:encoded_hints"?: string;
  "groundspeak:difficulty"?: number;
  "groundspeak:owner"?: string;
  "groundspeak:placed_by"?: string;
  "@_available": string;
  "@_archived": string;
}

interface Description {
  "#text"?: string;
}
