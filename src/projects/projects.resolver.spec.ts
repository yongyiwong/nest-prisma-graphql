import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../users/users.module';
describe('ProjectsResolver', () => {
  let resolver: ProjectsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => UsersModule)],
      providers: [ProjectsService, ProjectsResolver, PrismaService],
      exports: [ProjectsService],
    }).compile();

    resolver = module.get<ProjectsResolver>(ProjectsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  // TODO: More test cases coming, please check uesrs.resolver.spec.ts to refer.
});
