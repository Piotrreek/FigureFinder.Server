import { PrismaClient } from "@prisma/client";
import { ICommandHandler } from "../../abstractions/ICommandHandler";
import { PasswordHasher } from "../../services/PasswordHasher";
import { JwtService } from "../../services/jwtService";
import { SignInCommand } from "./SignInCommand";
import { SignInCommandSchema } from "./SignInCommandSchema";
import { SignInResponse } from "./SignInResponse";
import { InvalidCredentialsError } from "./errors/InvalidCredentialsError";

class SignInCommandHandler
  implements ICommandHandler<SignInCommand, SignInResponse>
{
  prisma: PrismaClient;
  passwordHasher: PasswordHasher;
  jwtService: JwtService;

  constructor() {
    this.prisma = new PrismaClient();
    this.passwordHasher = new PasswordHasher();
    this.jwtService = new JwtService();
  }

  public handle = async (request: SignInCommand): Promise<SignInResponse> => {
    request = await SignInCommandSchema.validate(request, {
      abortEarly: false,
    });

    const user = await this.prisma.user.findUnique({
      where: {
        email: request.email,
      },
      select: {
        role: true,
        password: true,
        id: true,
        emailConfirmed: true,
        blocked: true,
      },
    });

    if (!user) {
      throw new InvalidCredentialsError();
    }

    var passswordsAreEqual = await this.passwordHasher.verifyPassword(
      request.password,
      user.password
    );
    if (!passswordsAreEqual) {
      throw new InvalidCredentialsError();
    }

    const accessToken = this.jwtService.generateAccessToken(
      user.id,
      user.emailConfirmed,
      user.role.name,
      user.blocked
    );

    return { accessToken: accessToken };
  };
}

export default SignInCommandHandler;
