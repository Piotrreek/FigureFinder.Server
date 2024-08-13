export class EmailTakenError extends Error {
  constructor(email: string) {
    super(`An account with email address ${email} already exists`);
  }
}
