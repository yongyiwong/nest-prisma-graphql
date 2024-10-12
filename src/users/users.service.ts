import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUsersInput } from './dto/create-users.input';
import { UserType } from './user.type';
import { UtilsService } from 'src/shared/utils/utils.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUsersInput: CreateUsersInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: createUsersInput.name,
        email: createUsersInput.email,
        username: createUsersInput.username,
        password: createUsersInput.password,
      },
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
}
