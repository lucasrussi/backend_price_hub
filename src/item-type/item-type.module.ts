import { Module } from '@nestjs/common';
import { ItemTypeService } from './item-type.service';
import { ItemTypeController } from './item-type.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ItemTypeController],
  providers: [ItemTypeService, PrismaService],
})
export class ItemTypeModule {}
