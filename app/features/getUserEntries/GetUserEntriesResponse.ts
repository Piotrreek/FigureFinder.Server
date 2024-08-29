export interface GetUserEntriesResponse {
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  data: UserEntry[];
}

interface UserEntry {
  date: Date;
  comment?: string | null;
  figure: Figure;
  status: FigureUserStatus;
}

interface Figure {
  id: number;
  name: string;
}

interface FigureUserStatus {
  name: string;
}
