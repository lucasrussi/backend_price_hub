import { Test, TestingModule } from '@nestjs/testing';
import { MarketEstabService } from './market-estab.service';

describe('MarketEstabService', () => {
  let service: MarketEstabService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketEstabService],
    }).compile();

    service = module.get<MarketEstabService>(MarketEstabService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
