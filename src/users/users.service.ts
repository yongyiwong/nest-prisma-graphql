import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(name: string, email: string): Promise<User> {
    return this.prisma.user.create({
      data: { name, email },
    });
  }

  async findUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
