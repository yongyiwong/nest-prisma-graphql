import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { BcryptService } from '../shared/hashing/bcrypt.service';
describe('UsersService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService, BcryptService],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create new user', async () => {
    const fakeName = faker.person.firstName();
    const fakeEmail = faker.internet.email();
    const fakeUserName = faker.string.alphanumeric();
    const fakeBio = faker.person.bio();
    const fakePassword = faker.string.alphanumeric();

    const fakeUser = await userService.createUser({
      name: fakeName,
      email: fakeEmail,
      username: fakeUserName,
      password: fakePassword,
      bio: fakeBio,
    });
    expect(fakeUser).toBeDefined();
    expect(fakeUser.name).toEqual(fakeName);
    expect(fakeUser.email).toEqual(fakeEmail);
    expect(fakeUser.username).toEqual(fakeUserName);
    expect(fakeUser.bio).toEqual(fakeUser.bio);
  });
});
