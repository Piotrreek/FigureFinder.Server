import Jwt from "jsonwebtoken";

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

    const token = Jwt.sign(payload, this.key, {
      expiresIn: "6h",
    });

    return token;
  };
}
