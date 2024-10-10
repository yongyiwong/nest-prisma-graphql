import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async createProject(title: string, userId: number): Promise<Project> {
    return this.prisma.project.create({
      data: {
        title,
        user: { connect: { id: userId } }, // Link to the user
      },
    });
  }

  async findAllProjects(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  async findProjectsByUserId(userId: number): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: {
        userId,
      },
    });
  }
}
