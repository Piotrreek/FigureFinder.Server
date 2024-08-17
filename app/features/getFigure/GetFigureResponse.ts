export interface GetFigureResponse {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description?: string | null;
  difficulty: number;
  author?: string | null;
  owner?: string | null;
  setupDate?: Date | null;
  status: string;
  type: string;
  createdBy?: string | null;
  entries: FigureUserResponse[];
}

export interface FigureUserResponse {
  date: Date;
  comment?: string | null;
  username: string;
  status: string;
}
