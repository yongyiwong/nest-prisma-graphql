import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/users.service';
import { faker } from '@faker-js/faker';
import { UserType } from 'src/users/user.type';

describe('Projects GraphQL (e2e)', () => {
  let app: INestApplication;
  let userService: UsersService;
  let user: UserType;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Import the main AppModule
    }).compile();

    app = moduleFixture.createNestApplication();
    userService = app.get<UsersService>(UsersService);

    await app.init();

    user = await userService.createUser(
      faker.person.firstName(),
      faker.internet.email(),
    );
  });

  afterAll(async () => {
    await userService.deleteUser(user.id);
    await app.close();
  });

  it('should create a new project', async () => {
    const projectTitle = faker.lorem.sentence();
    const createProjectMutation = `
      mutation createProject($title: String!, $userId: Int!) {
        createProject(title: $title, userId: $userId) {
          id
          title
          userId
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createProjectMutation,
        variables: {
          title: projectTitle,
          userId: user.id,
        },
      })
      .expect(200);

    expect(response.body.data.createProject).toEqual({
      id: expect.any(Number), // You may want a more specific check here
      title: projectTitle,
      userId: user.id,
    });
  });
});
