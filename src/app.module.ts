import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MarketModule } from './market/market.module';
import { MarketEstabModule } from './market-estab/market-estab.module';
import { CategoryModule } from './category/category.module';
import { ItemTypeModule } from './item-type/item-type.module';
import { ItemModule } from './item/item.module';
import { ItemHistModule } from './item-hist/item-hist.module';



@Module({
  imports: [PrismaModule, MarketModule, MarketEstabModule, CategoryModule, ItemTypeModule, ItemModule, ItemHistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
