import { Module } from '@nestjs/common';
import { ItemHistService } from './item-hist.service';
import { ItemHistController } from './item-hist.controller';

@Module({
  controllers: [ItemHistController],
  providers: [ItemHistService],
})
export class ItemHistModule {}
