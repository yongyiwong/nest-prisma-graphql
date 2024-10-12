import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { faker } from '@faker-js/faker';
import { CreateUsersInput } from './dto/create-users.input';
import { ProjectsService } from '../projects/projects.service';

const mockUserService = {
  createUser: jest.fn(),
  findAllUsers: jest.fn(),
};

describe('UsersResolver', () => {
  let userResolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        { provide: UsersService, useValue: mockUserService },
        ProjectsService,
        PrismaService,
      ],
    }).compile();

    userResolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(userResolver).toBeDefined();
  });

  it('should be create user', async () => {
    const fakeName = faker.person.firstName();
    const fakeEmail = faker.internet.email();
    const fakeUserName = faker.string.alphanumeric();
    const fakeBio = faker.person.bio();
    const fakePassword = faker.string.alphanumeric();

    const createUsersInput: CreateUsersInput = {
      name: fakeName,
      email: fakeEmail,
      username: fakeUserName,
      password: fakePassword,
      bio: fakeBio,
    };

    mockUserService.createUser.mockResolvedValue(createUsersInput);

    const userResult = await userResolver.createUser(createUsersInput);

    expect(userResult.name).toEqual(fakeName);
    expect(userResult.email).toEqual(fakeEmail);
    expect(mockUserService.createUser).toHaveBeenCalledWith(createUsersInput);
  });
});
