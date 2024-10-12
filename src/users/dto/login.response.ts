import { UsersResponse } from './users.response';

export class LoginResponse {
  user: UsersResponse;
  accessToken: string;
  refreshToken: string;
}
