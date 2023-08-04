import { Module } from '@nestjs/common';
import { MarketEstabService } from './market-estab.service';
import { MarketEstabController } from './market-estab.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MarketEstabController],
  providers: [MarketEstabService, PrismaService],
})
export class MarketEstabModule {}
