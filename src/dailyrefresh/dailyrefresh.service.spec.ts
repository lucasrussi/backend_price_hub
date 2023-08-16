import { Test, TestingModule } from '@nestjs/testing';
import { DailyrefreshService } from './dailyrefresh.service';

describe('DailyrefreshService', () => {
  let service: DailyrefreshService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyrefreshService],
    }).compile();

    service = module.get<DailyrefreshService>(DailyrefreshService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
