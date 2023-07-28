import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItensModule } from './itens/itens.module';
import { ItemModule } from './item/item.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [ItensModule, ItemModule, ServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
