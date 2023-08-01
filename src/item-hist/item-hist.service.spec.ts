import { Test, TestingModule } from '@nestjs/testing';
import { ItemHistService } from './item-hist.service';

describe('ItemHistService', () => {
  let service: ItemHistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemHistService],
    }).compile();

    service = module.get<ItemHistService>(ItemHistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
