import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { faker } from '@faker-js/faker';

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

    mockUserService.createUser.mockResolvedValue({
      name: fakeName,
      email: fakeEmail,
    });

    const userResult = await userResolver.createUser(fakeName, fakeEmail);
    expect(userResult.name).toEqual(fakeName);
    expect(userResult.email).toEqual(fakeEmail);
    expect(mockUserService.createUser).toHaveBeenCalledWith(
      fakeName,
      fakeEmail,
    );
  });
});
