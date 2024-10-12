import { Module, forwardRef } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [ProjectsService, ProjectsResolver, PrismaService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
