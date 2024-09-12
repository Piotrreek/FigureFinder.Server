import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: number;
  emailConfirmed: boolean;
  role: string;
  blocked: boolean;
}

export class JwtService {
  private key: string = process.env.JWT_SECRET_KEY!;

  public generateAccessToken = (
    userId: number,
    emailConfirmed: boolean,
    role: string,
    blocked: boolean
  ): string => {
    const payload: JwtPayload = {
      userId: userId,
      emailConfirmed: emailConfirmed,
      role: role,
      blocked: blocked,
    };

    const token = jwt.sign(payload, this.key, {
      expiresIn: "6h",
    });

    return token;
  };
}
