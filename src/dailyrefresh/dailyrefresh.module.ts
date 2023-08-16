import { Module } from '@nestjs/common';
import { DailyRefreshService } from './dailyrefresh.service';
import { DailyrefreshController } from './dailyrefresh.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DailyrefreshController],
  providers: [DailyRefreshService, PrismaService]
})
export class DailyrefreshModule {}
