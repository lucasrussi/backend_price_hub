import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarketEstabService } from './market-estab.service';
import { CreateMarketEstabDto } from './dto/create-market-estab.dto';
import { UpdateMarketEstabDto } from './dto/update-market-estab.dto';

@Controller('market-estab')
export class MarketEstabController {
  constructor(private readonly marketEstabService: MarketEstabService) {}

  @Post()
  create(@Body() createMarketEstabDto: CreateMarketEstabDto) {
    return this.marketEstabService.create(createMarketEstabDto);
  }

  @Get()
  findAll() {
    return this.marketEstabService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketEstabService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarketEstabDto: UpdateMarketEstabDto) {
    return this.marketEstabService.update(+id, updateMarketEstabDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketEstabService.remove(+id);
  }
}
