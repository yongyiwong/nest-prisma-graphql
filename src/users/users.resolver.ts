import {
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
  Args,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserType } from './gql/user.type';
import { ProjectType } from '../projects/project.type';
import { Project, User } from '@prisma/client';
import { ProjectsService } from '../projects/projects.service';
import { CreateUsersInput } from './dto/create-users.input';
import { UsersResponse } from './gql/users.response';
import { LoginResponse } from './gql/login.response';
import { LoginInput } from './dto/login.input';
@Resolver(() => UserType)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private projectsService: ProjectsService,
  ) {}

  @Query(() => LoginResponse)
  async logIn(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginResponse> {
    return this.usersService.login(loginInput);
  }

  @Mutation(() => UserType)
  async createUser(
    @Args('createUsersInput') createUsersInput: CreateUsersInput,
  ): Promise<UsersResponse> {
    return this.usersService.createUser(createUsersInput);
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

  @Query(() => LoginResponse)
  async refreshToken(@Args('token') token: string) {
    return this.usersService.refreshTokens({ token });
  }
}
