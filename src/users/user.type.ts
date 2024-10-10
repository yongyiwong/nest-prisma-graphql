import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProjectType } from '../projects/project.type';

@ObjectType()
export class UserType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [ProjectType], { nullable: true }) // Add this line
  projects?: ProjectType[]; // Relationship with projects
}
