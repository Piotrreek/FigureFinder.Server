export interface GetFiguresResponse {
  figures: Figure[];
}

export interface Figure {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  difficulty: number;
  distance?: number;
  found: boolean;
}
