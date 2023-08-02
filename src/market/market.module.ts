import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MarketController],
  providers: [MarketService, PrismaService]
})
export class MarketModule {}
