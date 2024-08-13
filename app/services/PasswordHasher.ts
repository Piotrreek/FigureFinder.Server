import bcrypt from "bcrypt";

export class PasswordHasher {
  private saltRounds: number = parseInt(process.env.AUTH_SALT_ROUNDS!);

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
