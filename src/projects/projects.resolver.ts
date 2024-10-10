import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { ProjectType } from './project.type';
import { Project } from '@prisma/client';

@Resolver(() => ProjectType)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => ProjectType)
  async createProject(
    @Args('title') title: string,
    @Args('userId') userId: number,
  ): Promise<Project> {
    return this.projectsService.createProject(title, userId);
  }

  @Query(() => [ProjectType])
  async projects(): Promise<Project[]> {
    return this.projectsService.findAllProjects();
  }

  @Query(() => [ProjectType])
  async projectsByUserId(@Args('userId') userId: number): Promise<Project[]> {
    return this.projectsService.findProjectsByUserId(userId);
  }
}
