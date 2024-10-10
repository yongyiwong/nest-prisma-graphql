import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TasksWorker } from './tasks.worker';
import { ProjectsService } from '../projects/projects.service';
import { ProjectsModule } from '../projects/projects.module';
import { PrismaService } from '../prisma/prisma.service';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    BullModule.registerQueue({
      name: 'fetchProjectsQueue', // The name of the queue
    }),
    ProjectsModule,
  ],
  providers: [TasksWorker, ProjectsService, PrismaService, TasksService],
})
export class TasksModule {}
