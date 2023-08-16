import { Module } from '@nestjs/common';
import { ItemHistService } from './item-hist.service';
import { ItemHistController } from './item-hist.controller';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [ItemHistController],
  providers: [ItemHistService, PrismaService],
})
export class ItemHistModule {}
