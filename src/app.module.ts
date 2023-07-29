import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';

let pass = '';

@Module({
  imports: [ItemModule, MongooseModule.forRoot(`mongodb+srv://price_hub_lucas_russi:${pass}@cluster0.dnvlghq.mongodb.net/?retryWrites=true&w=majority`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
