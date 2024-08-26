import { IQuery } from "../../abstractions/IQuery";
import { GetUserEntriesCountResponse } from "./GetUserEntriesCountResponse";

export class GetUserEntriesCountQuery
  implements IQuery<GetUserEntriesCountResponse>
{
  userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }
}
