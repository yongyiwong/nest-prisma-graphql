import { Field, PartialType, Int } from '@nestjs/graphql';
import { CreateUsersInput } from './create-users.input';

export class UpdateUsersInput extends PartialType(CreateUsersInput) {
  @Field(() => Int, { description: 'User Id' })
  id: number;
}
