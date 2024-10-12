import { OmitType } from '@nestjs/graphql';
import { UserType } from '../user.type';

export class UsersResponse extends OmitType(UserType, ['password']) {}
