import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [ProjectsModule],
  providers: [UsersResolver, UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
