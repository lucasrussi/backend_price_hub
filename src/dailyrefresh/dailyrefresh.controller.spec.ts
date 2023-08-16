import { Test, TestingModule } from '@nestjs/testing';
import { DailyrefreshController } from './dailyrefresh.controller';
import { DailyrefreshService } from './dailyrefresh.service';

describe('DailyrefreshController', () => {
  let controller: DailyrefreshController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyrefreshController],
      providers: [DailyrefreshService],
    }).compile();

    controller = module.get<DailyrefreshController>(DailyrefreshController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
