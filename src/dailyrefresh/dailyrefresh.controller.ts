import { Controller, Get, Param } from '@nestjs/common';
import { DailyRefreshService } from './dailyrefresh.service';

@Controller('dailyrefresh')
export class DailyrefreshController {
  constructor(private readonly DailyRefreshService: DailyRefreshService) {}

  @Get(':id')
  findAll(@Param('id') id: number) {
    return this.DailyRefreshService.findAll(+id);
  }
}
