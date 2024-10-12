import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUsersInput } from './dto/create-users.input';
import { UserType } from './user.type';
import { UtilsService } from '../shared/utils/utils.service';
import { BcryptService } from '../shared/hashing/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private bcryptService: BcryptService,
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
}
