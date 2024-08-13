import jwt from "jsonwebtoken";

export class JwtService {
  private key: string = process.env.JWT_SECRET_KEY!;

  public generateAccessToken = (
    userId: number,
    emailConfirmed: boolean
  ): string => {
    const payload = {
      userId: userId,
      emailConfirmed: emailConfirmed,
    };

    const token = jwt.sign(payload, this.key, {
      expiresIn: "6h",
    });

    return token;
  };
}
