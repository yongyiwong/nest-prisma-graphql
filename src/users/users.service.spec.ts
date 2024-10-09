import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { faker } from '@faker-js/faker';
describe('UsersService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create new user', async () => {
    const fakeName = faker.person.firstName();
    const fakeEmail = faker.internet.email();

    const fakeUser = await userService.createUser(fakeName, fakeEmail);
    expect(fakeUser).toBeDefined();
    expect(fakeUser.name).toEqual(fakeName);
    expect(fakeUser.email).toEqual(fakeEmail);
  });
});
