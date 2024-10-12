import { Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

export class TokenInput {
  @Field(() => String, { description: 'Token' })
  @IsNotEmpty()
  @IsString()
  token: string;
}
