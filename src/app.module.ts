import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MarketModule } from './market/market.module';
import { MarketEstabModule } from './market-estab/market-estab.module';
import { CategoryModule } from './category/category.module';



@Module({
  imports: [PrismaModule, MarketModule, MarketEstabModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
