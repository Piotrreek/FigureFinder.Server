export class UsernameTakenError extends Error {
  constructor(username: string) {
    super(`An account with username ${username} already exists`);
  }
}
