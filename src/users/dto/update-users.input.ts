import { Field, Int } from '@nestjs/graphql';
import { CreateUsersInput } from './create-users.input';

export class UpdateUsersInput extends CreateUsersInput {
  @Field(() => Int, { description: 'User Id' })
  id: number;
}
