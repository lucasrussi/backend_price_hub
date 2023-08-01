import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MarketModule } from './market/market.module';
import { MarketEstabModule } from './market-estab/market-estab.module';



@Module({
  imports: [PrismaModule, MarketModule, MarketEstabModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
