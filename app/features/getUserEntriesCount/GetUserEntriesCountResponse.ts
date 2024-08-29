export interface GetUserEntriesCountResponse {
  data: UserEntryCount[];
}

interface UserEntryCount {
  status: string;
  count: number;
}
