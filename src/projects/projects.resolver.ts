import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { ProjectType } from './project.type';
import { UserType } from '../users/user.type';
import { Project } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { CreateProjectsInput } from './dto/create-projects.input';

@Resolver(() => ProjectType)
export class ProjectsResolver {
  constructor(
    private readonly projectsService: ProjectsService,
    private usersService: UsersService,
  ) {}

  @Mutation(() => ProjectType)
  async createProject(
    @Args('createProjectsInput') createProjectsInput: CreateProjectsInput,
  ): Promise<Project> {
    return this.projectsService.createProject(
      createProjectsInput.title,
      createProjectsInput.userId,
    );
  }

  @Query(() => [ProjectType])
  async projects(): Promise<Project[]> {
    return this.projectsService.findAllProjects();
  }

  @Query(() => [ProjectType])
  async projectsByUserId(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Project[]> {
    return this.projectsService.findProjectsByUserId(userId);
  }

  @ResolveField(() => UserType) // Resolver for the user field
  async user(@Parent() project: Project): Promise<UserType | null> {
    return this.usersService.findUserById(project.userId); // Fetch user based on userId from the project
  }
}
