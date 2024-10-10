import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateProjectsInput {
  @Field(() => Int, { description: 'User Id' })
  userId: number;

  @Field(() => String, { description: 'Project title' })
  title: string;
}
