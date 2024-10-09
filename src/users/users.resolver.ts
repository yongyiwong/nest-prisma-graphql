import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserType } from './user.type';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

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
}
