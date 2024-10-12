import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
@InputType()
export class CreateUsersInput {
  @Field(() => String, { description: 'Name' })
  @IsString()
  name: string;

  @Field(() => String, { description: 'username' })
  @IsString()
  username: string;

  @Field(() => String, { description: 'Password' })
  @IsString()
  password: string;

  @Field(() => String, { description: 'email' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;
}
