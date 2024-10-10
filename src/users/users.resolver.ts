import {
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
  Args,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserType } from './user.type';
import { ProjectType } from '../projects/project.type';
import { Project, User } from '@prisma/client';
import { ProjectsService } from 'src/projects/projects.service';
@Resolver(() => UserType)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private projectsService: ProjectsService,
  ) {}

  @Mutation(() => UserType)
  async createUser(@Args('name') name: string, @Args('email') email: string) {
    return this.usersService.createUser(name, email);
  }

  @Query(() => [UserType])
  async users() {
    return this.usersService.findAllUsers();
  }

  @Mutation(() => UserType)
  async deleteUser(@Args('id') id: number) {
    return this.usersService.deleteUser(id);
  }

  @ResolveField(() => [ProjectType])
  async projects(@Parent() user: User): Promise<Project[]> {
    return this.projectsService.findProjectsByUserId(user.id);
  }
}
