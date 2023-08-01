import { Test, TestingModule } from '@nestjs/testing';
import { MarketEstabController } from './market-estab.controller';
import { MarketEstabService } from './market-estab.service';

describe('MarketEstabController', () => {
  let controller: MarketEstabController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketEstabController],
      providers: [MarketEstabService],
    }).compile();

    controller = module.get<MarketEstabController>(MarketEstabController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
