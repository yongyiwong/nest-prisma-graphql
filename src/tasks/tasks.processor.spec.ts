import { Test, TestingModule } from '@nestjs/testing';
import { TasksWorker } from './tasks.worker';

describe('TasksProcessor', () => {
  let provider: TasksWorker;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksWorker],
    }).compile();

    provider = module.get<TasksWorker>(TasksWorker);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
