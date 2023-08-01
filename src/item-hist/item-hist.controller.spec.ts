import { Test, TestingModule } from '@nestjs/testing';
import { ItemHistController } from './item-hist.controller';
import { ItemHistService } from './item-hist.service';

describe('ItemHistController', () => {
  let controller: ItemHistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemHistController],
      providers: [ItemHistService],
    }).compile();

    controller = module.get<ItemHistController>(ItemHistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
