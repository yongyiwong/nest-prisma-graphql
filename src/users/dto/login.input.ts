import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String, { description: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @Field(() => String, { description: 'username' })
  @IsString()
  @IsNotEmpty()
  username?: string;

  @Field(() => String, { description: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
