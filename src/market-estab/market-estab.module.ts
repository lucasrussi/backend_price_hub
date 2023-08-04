import { Module } from '@nestjs/common';
import { MarketEstabService } from './market-estab.service';
import { MarketEstabController } from './market-estab.controller';

@Module({
  controllers: [MarketEstabController],
  providers: [MarketEstabService],
})
export class MarketEstabModule {}
