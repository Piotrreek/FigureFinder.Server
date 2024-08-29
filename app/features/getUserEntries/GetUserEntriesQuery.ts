import { IQuery } from "../../abstractions/IQuery";
import { GetUserEntriesResponse } from "./GetUserEntriesResponse";

export class GetUserEntriesQuery implements IQuery<GetUserEntriesResponse> {
  userId: number;
  pageSize: number;
  pageNumber: number;

  constructor(userId: number, pageSize: number, pageNumber: number) {
    this.userId = userId;
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
  }
}
