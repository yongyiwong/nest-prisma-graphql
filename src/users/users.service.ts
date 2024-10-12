import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUsersInput } from './dto/create-users.input';
import { UserType } from './gql/user.type';
import { UtilsService } from '../shared/utils/utils.service';
import { BcryptService } from '../shared/hashing/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/login.input';
import {
  Exception,
  LoginInputException,
  UnAuthorizedException,
  UserNotExitException,
  WrongPassword,
} from '../shared/exceptions';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JWTPayload } from './interfaces/jwt-payload.interface';
import { LoginResponse } from './gql/login.response';
import { TokenInput } from './dto/token.input';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async createUser(
    createUsersInput: CreateUsersInput,
  ): Promise<Omit<User, 'password'>> {
    createUsersInput.password = await this.bcryptService.hash(
      createUsersInput.password,
    );

    return this.sanitizeUser(
      await this.prisma.user.create({
        data: {
          name: createUsersInput.name,
          email: createUsersInput.email,
          username: createUsersInput.username,
          password: createUsersInput.password,
        },
      }),
    );
  }

  async login(loginInput: LoginInput): Promise<LoginResponse> {
    try {
      if (!loginInput.email && !loginInput.username) {
        throw new LoginInputException();
      }

      let user: UserType = null;

      if (loginInput.username) {
        user = await this.findUserByUserName(loginInput.username);
      } else {
        user = await this.findUserByEmail(loginInput.email);
      }

      if (!user) {
        throw new UserNotExitException();
      }

      const isValidPassword = await this.bcryptService.compare(
        loginInput.password,
        user.password,
      );

      if (!isValidPassword) {
        throw new WrongPassword();
      }

      return this.generateTokens(user);
    } catch (e) {
      throw new Exception(e);
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findUserByUserName(username: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findAllUsers(): Promise<Omit<User, 'password'>[]> {
    return this.prisma.user.findMany({
      select: UtilsService.omit(UserType.columns(), ['password']),
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  sanitizeUser(user: UserType) {
    const sanitized = user;
    delete sanitized['password'];
    return sanitized;
  }

  async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<JWTPayload>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email },
      ),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
    ]);
    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }

  async refreshTokens(tokenInput: TokenInput): Promise<LoginResponse> {
    try {
      const { sub } = await this.jwtService.verifyAsync(tokenInput.token, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const user = await this.findUserById(sub);
      return this.generateTokens(user);
    } catch (err) {
      throw new UnAuthorizedException(err);
    }
  }
}
