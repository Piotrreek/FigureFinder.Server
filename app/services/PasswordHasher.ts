import bcrypt from "bcrypt";

export class PasswordHasher {
  private saltRounds: number = process.env
    .AUTH_SALT_ROUNDS as unknown as number;

  public generatePasswordHash = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  };

  public verifyPassword = async (
    password: string,
    passwordHash: string
  ): Promise<boolean> => {
    return bcrypt.compare(password, passwordHash);
  };
}
