import { Field } from '@nestjs/graphql';

export class ForgetUsersInput {
  @Field(() => String, { description: 'Email' })
  email: string;
}
