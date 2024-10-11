import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Project } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class ProjectsService {
  private pubSub = new PubSub();
  constructor(
    private readonly prisma: PrismaService,
    //private projectsQueue: Queue,
  ) {}

  async createProject(title: string, userId: number): Promise<Project> {
    const newProject = this.prisma.project.create({
      data: {
        title,
        user: { connect: { id: userId } }, // Link to the user
      },
    });

    // Publish the new project to subscribers
    this.pubSub.publish('projectCreated', {
      projectCreated: newProject,
      userId,
    });
    return newProject;
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

  async deleteProjectByUserId(userId: number) {
    return this.prisma.project.deleteMany({ where: { userId } });
  }

  // Subscription resolver
  getProjectCreated() {
    return this.pubSub.asyncIterator('projectCreated');
  }
}
