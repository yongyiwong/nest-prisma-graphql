import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { TasksService } from './tasks/tasks.service';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const tasksService = app.get(TasksService);
  await tasksService.scheduleIntervalJob();
  await app.listen(3000);
}
bootstrap();
